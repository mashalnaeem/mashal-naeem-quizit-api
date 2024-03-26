const knex = require('knex')(require('../knexfile'));

// Assuming you have a function to retrieve all quizzes
const getAllQuizzes = async(_req, res) => {
    try {
        const quizzes = await knex('quizzes').select(
            'id',
            'title',
            'description',
            'category',
            'difficulty',
            'num_questions',
            'duration_minutes',
            'is_public',
            'image_url',
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


module.exports = { getAllQuizzes, fetchOneQuiz } 