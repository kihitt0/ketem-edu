const { body, param, query, validationResult } = require('express-validator');

const validate = (req, res, next) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(400).json({
      success: false,
      message: 'Ошибка валидации',
      errors: errors.array()
    });
  }
  next();
};

const registerValidator = [
  body('email').isEmail().normalizeEmail().withMessage('Некорректный email'),
  body('password').isLength({ min: 6 }).withMessage('Пароль должен быть минимум 6 символов'),
  body('name').trim().notEmpty().withMessage('Имя обязательно'),
  validate
];

const loginValidator = [
  body('email').isEmail().normalizeEmail().withMessage('Некорректный email'),
  body('password').notEmpty().withMessage('Пароль обязателен'),
  validate
];

const userUpdateValidator = [
  body('email').optional().isEmail().normalizeEmail().withMessage('Некорректный email'),
  body('name').optional().trim().notEmpty().withMessage('Имя не может быть пустым'),
  body('phone').optional().isMobilePhone().withMessage('Некорректный номер телефона'),
  body('date_of_birth').optional().isDate().withMessage('Некоррект��ая дата'),
  validate
];

const courseValidator = [
  body('title').trim().notEmpty().withMessage('Название курса обязательно'),
  body('description').optional().trim(),
  body('category').optional().trim(),
  body('level').optional().isIn(['beginner', 'intermediate', 'advanced']).withMessage('Некорректный уровень'),
  body('duration_hours').optional().isInt({ min: 1 }).withMessage('Длительность должна быть положительным числом'),
  body('price').optional().isFloat({ min: 0 }).withMessage('Цена не может быть отрицательной'),
  validate
];

const lessonValidator = [
  body('course_id').isInt().withMessage('ID курса обязателен'),
  body('title').trim().notEmpty().withMessage('Название урока обязательно'),
  body('content').optional().trim(),
  body('order_index').isInt({ min: 1 }).withMessage('Порядковый номер должен быть положительным числом'),
  body('duration_minutes').optional().isInt({ min: 1 }).withMessage('Длительность должна быть положительным числом'),
  validate
];

const applicationValidator = [
  body('full_name').trim().notEmpty().withMessage('Полное имя обязательно'),
  body('email').isEmail().normalizeEmail().withMessage('Некорректный email'),
  body('phone').optional().trim(),
  body('country_preference').optional().trim(),
  body('program_type').optional().trim(),
  body('education_level').optional().trim(),
  body('message').optional().trim(),
  validate
];

const idValidator = [
  param('id').isInt().withMessage('ID должен быть числом'),
  validate
];

const paginationValidator = [
  query('page').optional().isInt({ min: 1 }).withMessage('Страница должна быть положительным числом'),
  query('limit').optional().isInt({ min: 1, max: 100 }).withMessage('Лимит должен быть от 1 до 100'),
  validate
];

module.exports = {
  registerValidator,
  loginValidator,
  userUpdateValidator,
  courseValidator,
  lessonValidator,
  applicationValidator,
  idValidator,
  paginationValidator,
  validate
};
