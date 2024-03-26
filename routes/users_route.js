const express = require('express');
const router = express.Router();
const UserController = require('../controllers/users_controller.js');

// Public routes
router.post('/register', UserController.createUser);
router.post('/login', UserController.login);

// // Protected routes (require authentication)
// router.use(authMiddleware.authenticate);

router.get('/:id', UserController.getUserById);
router.put('/:id', UserController.updateUser);
router.delete('/:id', UserController.deleteUser);

module.exports = router;
