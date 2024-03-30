/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> } 
 */

exports.seed = async function(knex) {
  await knex('users').del();
  await knex('users').insert(usersData);
};


const usersData = [
  {
    id: 1,
    username: 'johndoe',
    email: 'johndoe@example.com',
    password: 'password123',
    current_score: 0, 
    total_score: 100,
    quizzes_played: 2, 
    created_at: new Date(),
    updated_at: new Date()
  },
  {
    id: 2,
    username: 'janedoe',
    email: 'janedoe@example.com',
    password: 'securepass321',
    current_score: 100, 
    total_score: 300,
    quizzes_played: 4, 
    created_at: new Date(),
    updated_at: new Date()
  }
];

  
