const knex = require('knex')(require('../knexfile'));

// Assuming you have a function to retrieve all quizzes
const getAllQuizzes = async(_req, res) => {
    try {
        const quizzes = await knex('quizzes').select(
            'id',
            'title',
            'category',
            // Exclude 'questions' field
        );
        res.status(200).json(quizzes);

    } catch (error) {
        console.error('Error fetching quizzes:', error);
        res.status(400).json({ error: 'Failed to fetch quizzes' });
    }
}

const fetchOneQuiz = async(req, res) => {
    const quizId  = req.params.id; 
    try {
        const quiz = await knex('quizzes').where({ id: quizId });
        if (!quiz) {
            return res.status(404).json({ error: 'Quiz not found' });
        }
        res.status(200).json(quiz);

    } catch (error) {
        console.error('Error fetching quiz:', error);
        res.status(400).json({ error: 'Failed to fetch quiz' });
    }
}

const getQuestions = async(req, res) => {
    const quizId = req.params.id;

    try {
        // Retrieve the quiz details, including its questions, from the database
        const quiz = await knex('quizzes')
            .where({ id: quizId })
            .first();

        if (!quiz) {
            return res.status(404).json({ error: 'Quiz not found' });
        }

        // Extract questions from the quiz object
        const questions = quiz.questions;

        // Send the quiz questions in the response body
        res.status(200).json(questions);
    } catch (error) {
        console.error('Error fetching quiz:', error);
        res.status(500).json({ error: 'Internal server error' });
    }
};



module.exports = { getAllQuizzes, fetchOneQuiz, getQuestions } 