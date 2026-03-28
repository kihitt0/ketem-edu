const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const crypto = require('crypto');
const { OAuth2Client } = require('google-auth-library');
const db = require('../config/database');
const { sendVerificationEmail, sendPasswordResetEmail, sendWelcomeEmail } = require('../services/email.service');

const googleClient = new OAuth2Client(process.env.GOOGLE_CLIENT_ID);

// Generate 6-digit verification code
const generateVerificationCode = () => {
  return Math.floor(100000 + Math.random() * 900000).toString();
};

// Step 1: Send verification code to email (before registration)
const sendVerificationCode = async (req, res) => {
  try {
    const { email, name } = req.body;

    if (!email || !name) {
      return res.status(400).json({
        success: false,
        message: 'Email и имя обязательны'
      });
    }

    // Check if user already exists with verified email
    const existingUser = await db.query(
      'SELECT id, email_verified FROM users WHERE email = $1',
      [email]
    );

    if (existingUser.rows.length > 0 && existingUser.rows[0].email_verified) {
      return res.status(400).json({
        success: false,
        message: 'Пользователь с таким email уже существует'
      });
    }

    // Generate verification code
    const code = generateVerificationCode();
    const expiresAt = new Date(Date.now() + 15 * 60 * 1000); // 15 minutes

    // Store code in database (create temp user or update existing unverified)
    if (existingUser.rows.length > 0) {
      // Update existing unverified user
      await db.query(
        `UPDATE users SET
           email_verification_token = $1,
           email_verification_expires = $2,
           name = $3
         WHERE email = $4`,
        [code, expiresAt, name, email]
      );
    } else {
      // Create temporary user (will be completed after verification)
      await db.query(
        `INSERT INTO users (email, name, email_verification_token, email_verification_expires, email_verified, role)
         VALUES ($1, $2, $3, $4, false, 'student')
         ON CONFLICT (email) DO UPDATE SET
           email_verification_token = $3,
           email_verification_expires = $4,
           name = $2`,
        [email, name, code, expiresAt]
      );
    }

    // Send verification email
    const emailResult = await sendVerificationEmail(email, name, code);

    res.json({
      success: true,
      message: 'Код подтверждения отправлен на email',
      // For demo mode (when SendGrid not configured)
      demo: emailResult.demo ? { code } : undefined
    });
  } catch (error) {
    console.error('Send verification code error:', error);
    res.status(500).json({
      success: false,
      message: 'Ошибка отправки кода подтверждения'
    });
  }
};

// Step 2: Verify code and complete registration
const verifyEmail = async (req, res) => {
  const client = await db.getClient();

  try {
    await client.query('BEGIN');

    const { email, code, password } = req.body;

    if (!email || !code || !password) {
      return res.status(400).json({
        success: false,
        message: 'Email, код и пароль обязательны'
      });
    }

    if (password.length < 6) {
      return res.status(400).json({
        success: false,
        message: 'Пароль должен содержать минимум 6 символов'
      });
    }

    // Find user with valid verification code
    const result = await client.query(
      `SELECT id, email, name, email_verified, email_verification_token, email_verification_expires
       FROM users WHERE email = $1`,
      [email]
    );

    if (result.rows.length === 0) {
      return res.status(400).json({
        success: false,
        message: 'Пользователь не найден. Пройдите регистрацию заново.'
      });
    }

    const user = result.rows[0];

    // Check if already verified
    if (user.email_verified && user.password) {
      return res.status(400).json({
        success: false,
        message: 'Email уже подтвержден. Войдите в аккаунт.'
      });
    }

    // Verify code
    if (user.email_verification_token !== code) {
      return res.status(400).json({
        success: false,
        message: 'Неверный код подтверждения'
      });
    }

    // Check expiration
    if (new Date() > new Date(user.email_verification_expires)) {
      return res.status(400).json({
        success: false,
        message: 'Код подтверждения истек. Запросите новый код.'
      });
    }

    // Hash password and complete registration with pending status
    const hashedPassword = await bcrypt.hash(password, 10);

    await client.query(
      `UPDATE users SET
         password = $1,
         email_verified = true,
         email_verification_token = NULL,
         email_verification_expires = NULL,
         status = 'pending',
         updated_at = NOW()
       WHERE id = $2`,
      [hashedPassword, user.id]
    );

    await client.query('COMMIT');

    // Send welcome email (async, don't wait)
    sendWelcomeEmail(email, user.name).catch(console.error);

    res.status(201).json({
      success: true,
      message: 'Регистрация завершена! Ваш аккаунт ожидает активации администратором.',
      pending: true,
      data: {
        user: {
          id: user.id,
          email: user.email,
          name: user.name,
          role: 'student',
          status: 'pending'
        }
        // No token — user cannot log in until approved
      }
    });
  } catch (error) {
    await client.query('ROLLBACK');
    console.error('Verify email error:', error);
    res.status(500).json({
      success: false,
      message: 'Ошибка подтверждения email'
    });
  } finally {
    client.release();
  }
};

// Legacy register (for backwards compatibility - will send verification code)
const register = async (req, res) => {
  const client = await db.getClient();

  try {
    await client.query('BEGIN');

    const { email, password, name, phone, country, date_of_birth } = req.body;

    // Check if user exists
    const existingUser = await client.query(
      'SELECT id, email_verified FROM users WHERE email = $1',
      [email]
    );

    if (existingUser.rows.length > 0 && existingUser.rows[0].email_verified) {
      return res.status(400).json({
        success: false,
        message: 'Пользователь с таким email уже существует'
      });
    }

    // Hash password
    const hashedPassword = await bcrypt.hash(password, 10);

    // Create user with status=pending (needs admin approval)
    let result;
    if (existingUser.rows.length > 0) {
      // Update unverified user
      result = await client.query(
        `UPDATE users SET
           password = $1, name = $2, phone = $3, country = $4, date_of_birth = $5,
           email_verified = true, email_verification_token = NULL, status = 'pending'
         WHERE email = $6
         RETURNING id, email, name, role, created_at`,
        [hashedPassword, name, phone, country, date_of_birth, email]
      );
    } else {
      result = await client.query(
        `INSERT INTO users (email, password, name, phone, country, date_of_birth, role, email_verified, status)
         VALUES ($1, $2, $3, $4, $5, $6, 'student', true, 'pending')
         RETURNING id, email, name, role, created_at`,
        [email, hashedPassword, name, phone, country, date_of_birth]
      );
    }

    const user = result.rows[0];

    // Generate JWT token
    const token = jwt.sign(
      { userId: user.id, role: user.role },
      process.env.JWT_SECRET,
      { expiresIn: process.env.JWT_EXPIRE }
    );

    await client.query('COMMIT');

    res.status(201).json({
      success: true,
      message: 'Регистрация успешна',
      data: {
        user: {
          id: user.id,
          email: user.email,
          name: user.name,
          role: user.role
        },
        token
      }
    });
  } catch (error) {
    await client.query('ROLLBACK');
    console.error('Register error:', error);
    res.status(500).json({
      success: false,
      message: 'Ошибка регистрации'
    });
  } finally {
    client.release();
  }
};

const login = async (req, res) => {
  try {
    const { email, password } = req.body;

    // Find user
    const result = await db.query(
      'SELECT id, email, password, name, role, is_active, status FROM users WHERE email = $1',
      [email]
    );

    if (result.rows.length === 0) {
      return res.status(401).json({
        success: false,
        message: 'Неверный email или пароль'
      });
    }

    const user = result.rows[0];

    if (!user.is_active) {
      return res.status(403).json({
        success: false,
        message: 'Аккаунт деактивирован'
      });
    }

    if (user.status === 'pending') {
      return res.status(403).json({
        success: false,
        message: 'Ваш аккаунт ожидает активации администратором. Мы свяжемся с вами после проверки.',
        pending: true
      });
    }

    // Check if user has a password (OAuth-only users don't)
    if (!user.password) {
      return res.status(401).json({
        success: false,
        message: 'Этот аккаунт использует вход через Google. Пожалуйста, войдите через Google.'
      });
    }

    // Verify password
    const isPasswordValid = await bcrypt.compare(password, user.password);

    if (!isPasswordValid) {
      return res.status(401).json({
        success: false,
        message: 'Неверный email или пароль'
      });
    }

    // Generate JWT token
    const token = jwt.sign(
      { userId: user.id, role: user.role },
      process.env.JWT_SECRET,
      { expiresIn: process.env.JWT_EXPIRE }
    );

    res.json({
      success: true,
      message: 'Вход выполнен успешно',
      data: {
        user: {
          id: user.id,
          email: user.email,
          name: user.name,
          role: user.role
        },
        token
      }
    });
  } catch (error) {
    console.error('Login error:', error);
    res.status(500).json({
      success: false,
      message: 'Ошибка входа'
    });
  }
};

const getMe = async (req, res) => {
  try {
    const result = await db.query(
      `SELECT id, email, name, role, phone, country, date_of_birth, 
              avatar_url, is_active, created_at 
       FROM users WHERE id = $1`,
      [req.user.id]
    );

    if (result.rows.length === 0) {
      return res.status(404).json({
        success: false,
        message: 'Пользователь не найден'
      });
    }

    res.json({
      success: true,
      data: result.rows[0]
    });
  } catch (error) {
    console.error('Get me error:', error);
    res.status(500).json({
      success: false,
      message: 'Ошибка получения данных пользователя'
    });
  }
};

const forgotPassword = async (req, res) => {
  try {
    const { email } = req.body;

    // Find user by email
    const result = await db.query(
      'SELECT id, email, name FROM users WHERE email = $1',
      [email]
    );

    // Always return success to prevent email enumeration
    if (result.rows.length === 0) {
      return res.json({
        success: true,
        message: 'Если аккаунт существует, ссылка для сброса пароля будет отправлена на email',
        // For demo purposes, indicate no user found
        demo: { userFound: false }
      });
    }

    const user = result.rows[0];

    // Generate secure reset token
    const resetToken = crypto.randomBytes(32).toString('hex');
    const hashedToken = crypto.createHash('sha256').update(resetToken).digest('hex');

    // Token expires in 1 hour
    const expiresAt = new Date(Date.now() + 60 * 60 * 1000);

    // Delete any existing tokens for this user
    await db.query('DELETE FROM password_reset_tokens WHERE user_id = $1', [user.id]);

    // Store hashed token in database
    await db.query(
      'INSERT INTO password_reset_tokens (user_id, token, expires_at) VALUES ($1, $2, $3)',
      [user.id, hashedToken, expiresAt]
    );

    // Generate reset URL
    const resetUrl = `${process.env.FRONTEND_URL || 'http://localhost:5173'}/reset-password/${resetToken}`;

    // Send password reset email
    const emailResult = await sendPasswordResetEmail(user.email, user.name, resetUrl);

    res.json({
      success: true,
      message: 'Если аккаунт существует, ссылка для сброса пароля будет отправлена на email',
      // For demo purposes only (when SendGrid not configured)
      demo: emailResult.demo ? {
        userFound: true,
        resetToken: resetToken,
        resetUrl: resetUrl,
        expiresAt: expiresAt,
        note: 'В реальном приложении эта ссылка будет отправлена на email'
      } : undefined
    });
  } catch (error) {
    console.error('Forgot password error:', error);
    res.status(500).json({
      success: false,
      message: 'Ошибка при запросе сброса пароля'
    });
  }
};

const resetPassword = async (req, res) => {
  try {
    const { token, password } = req.body;

    if (!token || !password) {
      return res.status(400).json({
        success: false,
        message: 'Токен и новый пароль обязательны'
      });
    }

    if (password.length < 6) {
      return res.status(400).json({
        success: false,
        message: 'Пароль должен содержать минимум 6 символов'
      });
    }

    // Hash the provided token to compare with stored hash
    const hashedToken = crypto.createHash('sha256').update(token).digest('hex');

    // Find valid token
    const tokenResult = await db.query(
      `SELECT user_id FROM password_reset_tokens
       WHERE token = $1 AND expires_at > NOW() AND used = false`,
      [hashedToken]
    );

    if (tokenResult.rows.length === 0) {
      return res.status(400).json({
        success: false,
        message: 'Недействительный или истекший токен сброса пароля'
      });
    }

    const userId = tokenResult.rows[0].user_id;

    // Hash new password
    const hashedPassword = await bcrypt.hash(password, 10);

    // Update user password
    await db.query(
      'UPDATE users SET password = $1, updated_at = NOW() WHERE id = $2',
      [hashedPassword, userId]
    );

    // Mark token as used
    await db.query(
      'UPDATE password_reset_tokens SET used = true WHERE token = $1',
      [hashedToken]
    );

    res.json({
      success: true,
      message: 'Пароль успешно изменен. Теперь вы можете войти с новым паролем.'
    });
  } catch (error) {
    console.error('Reset password error:', error);
    res.status(500).json({
      success: false,
      message: 'Ошибка при сбросе пароля'
    });
  }
};

const googleAuth = async (req, res) => {
  try {
    const { credential } = req.body;

    if (!credential) {
      return res.status(400).json({
        success: false,
        message: 'Google credential обязателен'
      });
    }

    // Verify Google token
    const ticket = await googleClient.verifyIdToken({
      idToken: credential,
      audience: process.env.GOOGLE_CLIENT_ID
    });

    const payload = ticket.getPayload();
    const { sub: googleId, email, name, picture } = payload;

    // Check if user exists with this Google ID
    let userResult = await db.query(
      'SELECT id, email, name, role, status FROM users WHERE google_id = $1',
      [googleId]
    );

    let user;
    let isNewUser = false;

    if (userResult.rows.length > 0) {
      // Existing Google user
      user = userResult.rows[0];
      if (user.status === 'pending') {
        return res.status(403).json({
          success: false,
          message: 'Ваш аккаунт ожидает активации администратором.',
          pending: true
        });
      }
    } else {
      // Check if user exists with this email (link accounts)
      userResult = await db.query(
        'SELECT id, email, name, role, status FROM users WHERE email = $1',
        [email]
      );

      if (userResult.rows.length > 0) {
        // Link Google account to existing user
        user = userResult.rows[0];
        await db.query(
          'UPDATE users SET google_id = $1, avatar_url = COALESCE(avatar_url, $2) WHERE id = $3',
          [googleId, picture, user.id]
        );
      } else {
        // Create new user with pending status (needs admin approval)
        isNewUser = true;
        const newUserResult = await db.query(
          `INSERT INTO users (email, password, name, google_id, avatar_url, role, email_verified, status)
           VALUES ($1, NULL, $2, $3, $4, 'student', true, 'pending')
           RETURNING id, email, name, role, status`,
          [email, name, googleId, picture]
        );
        user = newUserResult.rows[0];

        // Send welcome email (async)
        sendWelcomeEmail(email, name).catch(console.error);
      }
    }

    if (user.status === 'pending') {
      return res.status(403).json({
        success: false,
        message: isNewUser
          ? 'Аккаунт создан! Ожидайте активации администратором.'
          : 'Ваш аккаунт ожидает активации администратором.',
        pending: true
      });
    }

    // Generate JWT token
    const token = jwt.sign(
      { userId: user.id, role: user.role },
      process.env.JWT_SECRET,
      { expiresIn: process.env.JWT_EXPIRE || '7d' }
    );

    res.json({
      success: true,
      message: isNewUser ? 'Аккаунт создан через Google' : 'Вход через Google выполнен',
      data: {
        user: {
          id: user.id,
          email: user.email,
          name: user.name,
          role: user.role
        },
        token,
        isNewUser
      }
    });
  } catch (error) {
    console.error('Google auth error:', error);
    res.status(500).json({
      success: false,
      message: 'Ошибка авторизации через Google'
    });
  }
};

module.exports = {
  register,
  login,
  getMe,
  forgotPassword,
  resetPassword,
  googleAuth,
  sendVerificationCode,
  verifyEmail
};
