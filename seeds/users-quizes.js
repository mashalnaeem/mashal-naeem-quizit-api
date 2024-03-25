/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> } 
 */
// import seed data files, arrays of objects
const usersData = require('../seed-data/users');
const quizesData = require('../seed-data/quizes');

exports.seed = async function(knex) {
  await knex('users').del();
  await knex('quizes').del();
  await knex('users').insert(usersData);
  await knex('quizes').insert(quizesData);
};