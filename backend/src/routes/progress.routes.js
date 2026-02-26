const express = require('express');
const router = express.Router();
const progressController = require('../controllers/progress.controller');
const { authenticate, authorize } = require('../middleware/auth');
const { paginationValidator } = require('../middleware/validators');

// Student routes
router.post('/enroll', authenticate, progressController.enrollCourse);
router.get('/my-courses', authenticate, progressController.getMyEnrollments);
router.post('/complete-lesson', authenticate, progressController.markLessonComplete);
router.get('/course/:courseId', authenticate, progressController.getCourseProgress);

// Admin routes
router.get('/all', authenticate, authorize('admin'), paginationValidator, progressController.getAllProgress);

module.exports = router;
