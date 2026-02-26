const sgMail = require('@sendgrid/mail');

// Initialize SendGrid with API key
if (process.env.SENDGRID_API_KEY) {
  sgMail.setApiKey(process.env.SENDGRID_API_KEY);
}

const FROM_EMAIL = process.env.SENDGRID_FROM_EMAIL || 'noreply@ketemedu.com';
const FROM_NAME = 'KETEM EDU';

/**
 * Send verification email with 6-digit code
 */
const sendVerificationEmail = async (to, name, code) => {
  // If SendGrid is not configured, return demo mode
  if (!process.env.SENDGRID_API_KEY) {
    console.log('📧 [DEMO MODE] Verification email would be sent to:', to);
    console.log('📧 [DEMO MODE] Verification code:', code);
    return { success: true, demo: true, code };
  }

  const msg = {
    to,
    from: {
      email: FROM_EMAIL,
      name: FROM_NAME
    },
    subject: 'Подтверждение email - KETEM EDU',
    html: `
      <!DOCTYPE html>
      <html>
      <head>
        <meta charset="utf-8">
        <style>
          body { font-family: Arial, sans-serif; line-height: 1.6; color: #333; }
          .container { max-width: 600px; margin: 0 auto; padding: 20px; }
          .header { background: linear-gradient(135deg, #f97316, #ea580c); color: white; padding: 30px; text-align: center; border-radius: 10px 10px 0 0; }
          .content { background: #f9fafb; padding: 30px; border: 1px solid #e5e7eb; }
          .code-box { background: white; border: 2px solid #f97316; border-radius: 10px; padding: 20px; text-align: center; margin: 20px 0; }
          .code { font-size: 36px; font-weight: bold; letter-spacing: 8px; color: #f97316; font-family: monospace; }
          .footer { text-align: center; padding: 20px; color: #6b7280; font-size: 12px; }
          .btn { display: inline-block; background: #f97316; color: white; padding: 12px 30px; text-decoration: none; border-radius: 6px; font-weight: bold; }
        </style>
      </head>
      <body>
        <div class="container">
          <div class="header">
            <h1 style="margin: 0; font-size: 28px;">KETEM EDU</h1>
            <p style="margin: 10px 0 0;">Подтверждение email</p>
          </div>
          <div class="content">
            <p>Здравствуйте, <strong>${name}</strong>!</p>
            <p>Спасибо за регистрацию в KETEM EDU. Для завершения регистрации введите код подтверждения:</p>
            <div class="code-box">
              <div class="code">${code}</div>
            </div>
            <p style="color: #6b7280; font-size: 14px;">Код действителен в течение 15 минут.</p>
            <p>Если вы не регистрировались на нашем сайте, просто проигнорируйте это письмо.</p>
          </div>
          <div class="footer">
            <p>© ${new Date().getFullYear()} KETEM EDU. Все права защищены.</p>
            <p>Это автоматическое сообщение, пожалуйста, не отвечайте на него.</p>
          </div>
        </div>
      </body>
      </html>
    `,
    text: `
      Здравствуйте, ${name}!

      Спасибо за регистрацию в KETEM EDU.
      Ваш код подтверждения: ${code}

      Код действителен в течение 15 минут.

      Если вы не регистрировались на нашем сайте, просто проигнорируйте это письмо.

      © ${new Date().getFullYear()} KETEM EDU
    `
  };

  try {
    await sgMail.send(msg);
    console.log('📧 Verification email sent to:', to);
    return { success: true };
  } catch (error) {
    console.error('📧 Error sending verification email:', error.message);
    if (error.response) {
      console.error('SendGrid response:', error.response.body);
    }
    return { success: false, error: error.message };
  }
};

/**
 * Send password reset email
 */
const sendPasswordResetEmail = async (to, name, resetUrl) => {
  if (!process.env.SENDGRID_API_KEY) {
    console.log('📧 [DEMO MODE] Password reset email would be sent to:', to);
    console.log('📧 [DEMO MODE] Reset URL:', resetUrl);
    return { success: true, demo: true, resetUrl };
  }

  const msg = {
    to,
    from: {
      email: FROM_EMAIL,
      name: FROM_NAME
    },
    subject: 'Сброс пароля - KETEM EDU',
    html: `
      <!DOCTYPE html>
      <html>
      <head>
        <meta charset="utf-8">
        <style>
          body { font-family: Arial, sans-serif; line-height: 1.6; color: #333; }
          .container { max-width: 600px; margin: 0 auto; padding: 20px; }
          .header { background: linear-gradient(135deg, #f97316, #ea580c); color: white; padding: 30px; text-align: center; border-radius: 10px 10px 0 0; }
          .content { background: #f9fafb; padding: 30px; border: 1px solid #e5e7eb; }
          .btn { display: inline-block; background: #f97316; color: white; padding: 14px 35px; text-decoration: none; border-radius: 6px; font-weight: bold; margin: 20px 0; }
          .footer { text-align: center; padding: 20px; color: #6b7280; font-size: 12px; }
        </style>
      </head>
      <body>
        <div class="container">
          <div class="header">
            <h1 style="margin: 0; font-size: 28px;">KETEM EDU</h1>
            <p style="margin: 10px 0 0;">Сброс пароля</p>
          </div>
          <div class="content">
            <p>Здравствуйте, <strong>${name}</strong>!</p>
            <p>Мы получили запрос на сброс пароля для вашего аккаунта. Нажмите на кнопку ниже, чтобы создать новый пароль:</p>
            <div style="text-align: center;">
              <a href="${resetUrl}" class="btn">Сбросить пароль</a>
            </div>
            <p style="color: #6b7280; font-size: 14px;">Ссылка действительна в течение 1 часа.</p>
            <p>Если вы не запрашивали сброс пароля, просто проигнорируйте это письмо.</p>
          </div>
          <div class="footer">
            <p>© ${new Date().getFullYear()} KETEM EDU. Все права защищены.</p>
          </div>
        </div>
      </body>
      </html>
    `,
    text: `
      Здравствуйте, ${name}!

      Мы получили запрос на сброс пароля для вашего аккаунта.
      Перейдите по ссылке для создания нового пароля: ${resetUrl}

      Ссылка действительна в течение 1 часа.

      Если вы не запрашивали сброс пароля, просто проигнорируйте это письмо.

      © ${new Date().getFullYear()} KETEM EDU
    `
  };

  try {
    await sgMail.send(msg);
    console.log('📧 Password reset email sent to:', to);
    return { success: true };
  } catch (error) {
    console.error('📧 Error sending password reset email:', error.message);
    return { success: false, error: error.message };
  }
};

/**
 * Send welcome email after successful verification
 */
const sendWelcomeEmail = async (to, name) => {
  if (!process.env.SENDGRID_API_KEY) {
    console.log('📧 [DEMO MODE] Welcome email would be sent to:', to);
    return { success: true, demo: true };
  }

  const msg = {
    to,
    from: {
      email: FROM_EMAIL,
      name: FROM_NAME
    },
    subject: 'Добро пожаловать в KETEM EDU!',
    html: `
      <!DOCTYPE html>
      <html>
      <head>
        <meta charset="utf-8">
        <style>
          body { font-family: Arial, sans-serif; line-height: 1.6; color: #333; }
          .container { max-width: 600px; margin: 0 auto; padding: 20px; }
          .header { background: linear-gradient(135deg, #f97316, #ea580c); color: white; padding: 30px; text-align: center; border-radius: 10px 10px 0 0; }
          .content { background: #f9fafb; padding: 30px; border: 1px solid #e5e7eb; }
          .btn { display: inline-block; background: #f97316; color: white; padding: 14px 35px; text-decoration: none; border-radius: 6px; font-weight: bold; }
          .footer { text-align: center; padding: 20px; color: #6b7280; font-size: 12px; }
        </style>
      </head>
      <body>
        <div class="container">
          <div class="header">
            <h1 style="margin: 0; font-size: 28px;">Добро пожаловать!</h1>
          </div>
          <div class="content">
            <p>Здравствуйте, <strong>${name}</strong>!</p>
            <p>Поздравляем! Ваш аккаунт в KETEM EDU успешно создан.</p>
            <p>Теперь вы можете:</p>
            <ul>
              <li>Просматривать доступные курсы</li>
              <li>Подавать заявки на обучение за рубежом</li>
              <li>Записываться на консультации</li>
              <li>Общаться с администраторами</li>
            </ul>
            <div style="text-align: center; margin-top: 30px;">
              <a href="${process.env.FRONTEND_URL || 'http://localhost:5173'}/dashboard" class="btn">Перейти в личный кабинет</a>
            </div>
          </div>
          <div class="footer">
            <p>© ${new Date().getFullYear()} KETEM EDU. Все права защищены.</p>
          </div>
        </div>
      </body>
      </html>
    `
  };

  try {
    await sgMail.send(msg);
    console.log('📧 Welcome email sent to:', to);
    return { success: true };
  } catch (error) {
    console.error('📧 Error sending welcome email:', error.message);
    return { success: false, error: error.message };
  }
};

module.exports = {
  sendVerificationEmail,
  sendPasswordResetEmail,
  sendWelcomeEmail
};
