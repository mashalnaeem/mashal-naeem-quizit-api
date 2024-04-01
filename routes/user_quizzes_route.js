const express = require('express');
const router = express.Router();
const UserQuizController = require('../controllers/user_quizzes_controller.js');

router.get('/:userId', UserQuizController.getAllUserQuizzesById);
router.get('/:userId/:quizId', UserQuizController.getOneUserQuizById);
router.post('/:userId', UserQuizController.createUserQuiz);
router.put('/:userId/:quizId', UserQuizController.updateUserQuiz);
router.delete('/:userId/:quizId', UserQuizController.deleteUserQuiz);

module.exports = router;
