/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> } 
 */

exports.seed = async function(knex) {
  await knex('user_quizzes').del();
  await knex('user_quizzes').insert(userQuizzesData);
};


const userQuizzesData = [
    {
      user_id: 1, // ID of the user who created the quiz
      title: 'My First Quiz',
      description: 'A simple quiz to get you started on your journey of creating quizzes!',
      category: 'Science',
      difficulty: 'Easy',
      num_questions: 5,
      duration_minutes: 8,
      is_public: true,
      image_url: 'https://example.com/my-first-quiz.jpg',
      // Other quiz details
    },
    {
      user_id: 2, // ID of another user who created a quiz
      title: 'History Quiz',
      description: 'Explore the fascinating world of history with this engaging quiz!',
      category: 'Social Studies',
      difficulty: 'Intermediate',
      num_questions: 7,
      duration_minutes: 12,
      is_public: false,
      image_url: 'https://example.com/history-quiz.jpg',
      // Other quiz details
    },
    // Add more user quizzes here
  ];
  
