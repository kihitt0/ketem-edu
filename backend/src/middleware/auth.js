const jwt = require('jsonwebtoken');
const db = require('../config/database');

const authenticate = async (req, res, next) => {
  try {
    const token = req.headers.authorization?.split(' ')[1];

    if (!token) {
      return res.status(401).json({
        success: false,
        message: 'Токен авторизации не предоставлен'
      });
    }

    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    
    const result = await db.query(
      'SELECT id, email, name, role, is_active FROM users WHERE id = $1',
      [decoded.userId]
    );

    if (result.rows.length === 0) {
      return res.status(401).json({
        success: false,
        message: 'Пользователь не найден'
      });
    }

    const user = result.rows[0];

    if (!user.is_active) {
      return res.status(403).json({
        success: false,
        message: 'Аккаунт деактивирован'
      });
    }

    req.user = user;
    next();
  } catch (error) {
    if (error.name === 'JsonWebTokenError') {
      return res.status(401).json({
        success: false,
        message: 'Недействительный токен'
      });
    }
    
    if (error.name === 'TokenExpiredError') {
      return res.status(401).json({
        success: false,
        message: 'Токен истёк'
      });
    }

    return res.status(500).json({
      success: false,
      message: 'Ошибка авторизации'
    });
  }
};

const authorize = (...roles) => {
  return (req, res, next) => {
    if (!req.user) {
      return res.status(401).json({
        success: false,
        message: 'Требуется авторизация'
      });
    }

    if (!roles.includes(req.user.role)) {
      return res.status(403).json({
        success: false,
        message: 'Недостаточно прав доступа'
      });
    }

    next();
  };
};

const checkOwnership = (resourceType) => {
  return async (req, res, next) => {
    try {
      const resourceId = req.params.id;
      const userId = req.user.id;

      // Admins have access to everything
      if (req.user.role === 'admin') {
        return next();
      }

      let query;
      let params;

      switch (resourceType) {
        case 'user':
          query = 'SELECT id FROM users WHERE id = $1 AND id = $2';
          params = [resourceId, userId];
          break;
        case 'enrollment':
          query = 'SELECT id FROM enrollments WHERE id = $1 AND user_id = $2';
          params = [resourceId, userId];
          break;
        case 'progress':
          query = 'SELECT id FROM lesson_progress WHERE id = $1 AND user_id = $2';
          params = [resourceId, userId];
          break;
        case 'application':
          query = 'SELECT id FROM applications WHERE id = $1 AND user_id = $2';
          params = [resourceId, userId];
          break;
        default:
          return res.status(400).json({
            success: false,
            message: 'Неизвестный тип ресурса'
          });
      }

      const result = await db.query(query, params);

      if (result.rows.length === 0) {
        return res.status(403).json({
          success: false,
          message: 'Доступ запрещен'
        });
      }

      next();
    } catch (error) {
      console.error('Ownership check error:', error);
      return res.status(500).json({
        success: false,
        message: 'Ошибка проверки доступа'
      });
    }
  };
};

module.exports = {
  authenticate,
  authorize,
  checkOwnership
};
