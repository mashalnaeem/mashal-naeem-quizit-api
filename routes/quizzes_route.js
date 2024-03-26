const express = require('express');
const router = express.Router();
const QuizController = require('../controllers/quizzes_controller.js');

router.get('/', QuizController.getAllQuizzes);
router.get('/:id', QuizController.fetchOneQuiz);

module.exports = router;
