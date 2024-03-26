const knex = require("../knexfile");

// Controller function to get all quizzes of a user
const getAllQuizzesByUserId = async (req, res) => {
  try {
    const { userId } = req.params;

    // Retrieve all quizzes of the user from the database
    const quizzes = await knex('user_quizzes').where({ user_id: userId });

    // Respond with the quizzes
    res.status(200).json(quizzes);

  } catch (error) {
    console.error('Error fetching quizzes:', error);
    res.status(500).json({ error: 'Internal server error' });
  }
};

// Controller function to get one quiz of a user by quiz ID
const getOneQuizByUserId = async (req, res) => {
  try {
    const { userId, quizId } = req.params;

    // Retrieve the quiz of the user by quiz ID from the database
    const quiz = await knex('user_quizzes').where({ user_id: userId, id: quizId }).first();

    // Check if the quiz exists
    if (!quiz) {
      return res.status(404).json({ message: 'Quiz not found' });
    }

    // Respond with the quiz
    res.status(200).json(quiz);
    
  } catch (error) {
    console.error('Error fetching quiz:', error);
    res.status(500).json({ error: 'Internal server error' });
  }
};

module.exports = { getAllQuizzesByUserId, getOneQuizByUserId }