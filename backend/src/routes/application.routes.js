const express = require('express');
const router = express.Router();
const applicationController = require('../controllers/application.controller');
const { authenticate, authorize } = require('../middleware/auth');
const { applicationValidator, idValidator, paginationValidator } = require('../middleware/validators');

// Public/Student routes
router.post('/', authenticate, applicationValidator, applicationController.createApplication);
router.get('/my', authenticate, applicationController.getMyApplications);

// Admin routes
router.get('/', authenticate, authorize('admin'), paginationValidator, applicationController.getAllApplications);
router.get('/:id', authenticate, idValidator, applicationController.getApplicationById);
router.put('/:id/status', authenticate, authorize('admin'), idValidator, applicationController.updateApplicationStatus);
router.delete('/:id', authenticate, authorize('admin'), idValidator, applicationController.deleteApplication);

module.exports = router;
