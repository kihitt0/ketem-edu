const express = require('express');
const router = express.Router();
const lessonController = require('../controllers/lesson.controller');
const { authenticate, authorize } = require('../middleware/auth');
const { lessonValidator, idValidator } = require('../middleware/validators');

// Admin only routes
router.post('/', authenticate, authorize('admin'), lessonValidator, lessonController.createLesson);
router.put('/:id', authenticate, authorize('admin'), idValidator, lessonController.updateLesson);
router.delete('/:id', authenticate, authorize('admin'), idValidator, lessonController.deleteLesson);

module.exports = router;
