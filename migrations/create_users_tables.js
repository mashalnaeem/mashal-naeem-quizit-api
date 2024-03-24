
/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */

exports.up = function(knex) {
    return knex.schema.createTable('users', function(table) {
      table.increments('id').primary();
      table.string('username').notNullable();
      table.string('email').notNullable().unique();
      table.string('password').notNullable();
  
      table.json('created_quizzes').defaultTo('[]'); // Store created quizzes as JSON array
      table.json('saved_quizzes').defaultTo('[]');   // Store saved quizzes as JSON array

      table.timestamps(true, true); // Adds `created_at` and `updated_at` columns
    });
  };

  /**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
  
  exports.down = function(knex) {
    return knex.schema.dropTableIfExists('users');
  };
  