const express = require('express');
const router = express.Router();
const eventController = require('../controllers/event.controller');
const { authenticate, authorize } = require('../middleware/auth');

// Public routes
router.get('/upcoming', eventController.getUpcomingEvents);

// Protected routes (require authentication)
router.get('/', authenticate, eventController.getAllEvents);
router.get('/:id', authenticate, eventController.getEventById);

// Admin only routes
router.post('/', authenticate, authorize('admin'), eventController.createEvent);
router.put('/:id', authenticate, authorize('admin'), eventController.updateEvent);
router.delete('/:id', authenticate, authorize('admin'), eventController.deleteEvent);

module.exports = router;
