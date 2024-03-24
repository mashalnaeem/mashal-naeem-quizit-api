/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */


exports.up = function(knex) {
    return knex.schema.createTable('user_playable_quizzes', function(table) {
      table.increments('id').primary();
      table.integer('user_id').unsigned().references('users.id').onDelete('CASCADE');
      table.integer('playable_quiz_id').unsigned().references('playable_quizzes.id').onDelete('CASCADE');

      table.timestamps(true, true);
    });
  };
  
  exports.down = function(knex) {
    return knex.schema.dropTableIfExists('user_playable_quizzes');
  };
  
  /**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
