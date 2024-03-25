/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */

exports.up = function(knex) {
    return knex.schema
      .createTable('users', function(table) {
        table.increments('id').primary();
        table.string('username').notNullable();
        table.string('email').notNullable().unique();
        table.string('password').notNullable();
        table.timestamps(true, true);
      })
      .createTable('user_quizzes', function(table) {
        table.increments('id').primary();
        table.integer('user_id').unsigned().references('users.id').onDelete('CASCADE');
        table.string('title').notNullable();
        table.text('description');
        // Add other columns for user quizzes
        table.timestamps(true, true);
      })
      .createTable('playable_quizzes', function(table) {
        table.increments('id').primary();
        table.string('title').notNullable();
        table.text('description');
        // Add other columns for playable quizzes
        table.timestamps(true, true);
      });
  };
  
  /**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */

  exports.down = function(knex) {
    return knex.schema
      .dropTableIfExists('playable_quizzes')
      .dropTableIfExists('user_quizzes')
      .dropTableIfExists('users');
  };
  
