/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> } 
 */

exports.seed = async function(knex) {
  await knex('playable_quizzes').del();
  await knex('playable_quizzes').insert(playableQuizzesData);
};

const playableQuizzesData = [
    {
      title: 'General Knowledge Quiz',
      description: 'Test your knowledge on a wide range of topics with this exciting quiz!',
      category: 'General Knowledge',
      difficulty: 'Intermediate',
      num_questions: 10,
      duration_minutes: 15,
      is_public: true,
      image_url: 'https://example.com/general-knowledge-quiz.jpg',
      // Other quiz details
    },
    {
      title: 'Mathematics Quiz',
      description: 'Challenge yourself with a variety of math problems and puzzles in this fun quiz!',
      category: 'Mathematics',
      difficulty: 'Easy',
      num_questions: 8,
      duration_minutes: 10,
      is_public: true,
      image_url: 'https://example.com/math-quiz.jpg',
      // Other quiz details
    },
    // Add more playable quizzes here
  ];
  
