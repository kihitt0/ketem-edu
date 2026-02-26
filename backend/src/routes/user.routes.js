const express = require('express');
const router = express.Router();
const userController = require('../controllers/user.controller');
const { authenticate, authorize } = require('../middleware/auth');
const { userUpdateValidator, idValidator, paginationValidator } = require('../middleware/validators');

// Admin only routes
router.get('/', authenticate, authorize('admin'), paginationValidator, userController.getAllUsers);
router.post('/', authenticate, authorize('admin'), userController.createUser);
router.delete('/:id', authenticate, authorize('admin'), idValidator, userController.deleteUser);

// Admin or owner routes
router.get('/:id', authenticate, idValidator, userController.getUserById);
router.put('/:id', authenticate, idValidator, userUpdateValidator, userController.updateUser);

module.exports = router;
