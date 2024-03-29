const knex = require('knex')(require('../knexfile'));

// Controller function to get all quizzes of a user
const getAllUserQuizzesById = async (req, res) => {
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
const getOneUserQuizById = async (req, res) => {
  try {
    const { userId, quizId } = req.params;

    // Retrieve the quiz of the user by quiz ID from the database
    const quiz = await knex('user_quizzes').where({ user_id: userId, id: quizId }).first();

    // Check if the quiz exists
    if (!quiz) {
      return res.status(404).json({ message: 'Quiz not found' });
    }

    console.log("Quiz object retrieved:", quiz);
    // Respond with the quiz
    res.status(200).json(quiz);
   
  } catch (error) {
    console.error('Error fetching quiz:', error);
    res.status(500).json({ error: 'Internal server error' });
  }
};

const createUserQuiz = async (req, res) => {
  try {
    const { title, description, category, difficulty, num_questions, duration_minutes, is_public, questions, userId } = req.body;

    // Insert the quiz data into the database
    const newUserQuiz = await knex('user_quizzes').insert({
      user_id: userId,
      title,
      description,
      category,
      difficulty: JSON.stringify(difficulty),
      num_questions,
      duration_minutes,
      is_public,
      questions: JSON.stringify(questions), // Store questions as JSON string
    }).returning('id');

    const quizId = newUserQuiz[0];

    res.status(201).json({ message: 'Quiz created successfully', quizId });
  } catch (error) {
    console.error('Error creating user quiz:', error);
    res.status(500).json({ error: 'Internal server error' });
  }
};


// Controller function to update a user quiz
const updateUserQuiz = async (req, res) => {
  try {
    const { userId, quizId } = req.params;
    const { title, description, category, difficulty, num_questions, duration_minutes, is_public, image_url, questions } = req.body;

    // Check if the quiz exists
    const existingQuiz = await knex('user_quizzes').where({ user_id: userId, id: quizId }).first();
    if (!existingQuiz) {
      return res.status(404).json({ message: 'Quiz not found' });
    }

    // Update the quiz in the database
    await knex('user_quizzes').where({ user_id: userId, id: quizId }).update({
      title,
      description,
      category,
      difficulty,
      num_questions,
      duration_minutes,
      is_public,
      image_url,
      questions
    });

    // Fetch the updated quiz
    const updatedQuiz = await knex('user_quizzes').where({ user_id: userId, id: quizId }).first();

    // Respond with the updated quiz
    res.status(200).json(updatedQuiz);
  } catch (error) {
    console.error('Error updating quiz:', error);
    res.status(500).json({ error: 'Internal server error' });
  }
};

// Controller function to delete a user quiz
const deleteUserQuiz = async (req, res) => {
  try {
    const { userId, quizId } = req.params;

    // Check if the quiz exists
    const existingQuiz = await knex('user_quizzes').where({ user_id: userId, id: quizId }).first();
    if (!existingQuiz) {
      return res.status(404).json({ message: 'Quiz not found' });
    }

    // Delete the quiz from the database
    await knex('user_quizzes').where({ user_id: userId, id: quizId }).del();

    // Respond with success message
    res.status(200).json({ message: 'Quiz deleted successfully' });
  } catch (error) {
    console.error('Error deleting quiz:', error);
    res.status(500).json({ error: 'Internal server error' });
  }
};

module.exports = { getAllUserQuizzesById, getOneUserQuizById, updateUserQuiz, deleteUserQuiz, createUserQuiz };
