/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> } 
 */

exports.seed = async function (knex) {
  await knex('user_quizzes').del();
  await knex('user_quizzes').insert(userQuizzesData);
};


const userQuizzesData = [
  {
    id: 1,
    user_id: 1, // ID of the user who created the quiz
    title: 'My First Quiz',
    description: 'A simple quiz to get you started on your journey of creating quizzes!',
    category: 'General Knowledge', 
    difficulty: JSON.stringify([ 'Easy', 'Intermediate' , 'Hard' ]),
    num_questions: 1,
    duration_minutes: 1,
    is_public: true,
    image_url: 'https://example.com/my-first-quiz.jpg',
    questions: JSON.stringify([
      {
        category: 'General Knowledge',
        difficulty: 'Easy',
        question: 'What is the official language of Brazil?',
        correct_answer: 'Portuguese',
        incorrect_answers: ['Spanish', 'English', 'French']
      },
    ]),
  },
  {
    id: 2,
    user_id: 2, // ID of another user who created a quiz
    title: 'History Quiz',
    description: 'Explore the fascinating world of history with this engaging quiz!',
    category: 'Social Studies',
    difficulty: JSON.stringify([ 'Easy', 'Intermediate' , 'Hard' ]),
    num_questions: 7,
    duration_minutes: 12,
    is_public: false,
    image_url: 'https://example.com/history-quiz.jpg',
    questions: JSON.stringify([
      {
        category: 'General Knowledge',
        difficulty: 'Easy',
        question: 'What is the official language of Brazil?',
        correct_answer: 'Portuguese',
        incorrect_answers: ['Spanish', 'English', 'French']
      },
    ]),
  },
];

