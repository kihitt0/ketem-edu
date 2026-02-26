const express = require('express');
const router = express.Router();
const courseController = require('../controllers/course.controller');
const { authenticate, authorize } = require('../middleware/auth');
const { courseValidator, idValidator, paginationValidator } = require('../middleware/validators');

router.get('/', authenticate, paginationValidator, courseController.getAllCourses);
router.get('/:id', authenticate, idValidator, courseController.getCourseById);

// Admin only routes
router.post('/', authenticate, authorize('admin'), courseValidator, courseController.createCourse);
router.put('/:id', authenticate, authorize('admin'), idValidator, courseController.updateCourse);
router.delete('/:id', authenticate, authorize('admin'), idValidator, courseController.deleteCourse);

module.exports = router;
