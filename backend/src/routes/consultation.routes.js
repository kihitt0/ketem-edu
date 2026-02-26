const express = require('express');
const router = express.Router();
const consultationController = require('../controllers/consultation.controller');
const { authenticate, authorize } = require('../middleware/auth');

// Protected routes (require authentication)
router.post('/', authenticate, consultationController.createConsultation);
router.get('/my', authenticate, consultationController.getMyConsultations);

// Admin only routes
router.get('/', authenticate, authorize('admin'), consultationController.getAllConsultations);
router.put('/:id/status', authenticate, authorize('admin'), consultationController.updateConsultationStatus);
router.delete('/:id', authenticate, authorize('admin'), consultationController.deleteConsultation);

module.exports = router;
