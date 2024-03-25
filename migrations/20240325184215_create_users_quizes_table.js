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
        table.string('category');
        table.string('difficulty');
        table.integer('num_questions').unsigned();
        table.integer('duration_minutes').unsigned();
        table.boolean('is_public').defaultTo(true);
        table.string('image_url');
        table.timestamps(true, true);
      })
      .createTable('playable_quizzes', function(table) {
        table.increments('id').primary();
        table.string('title').notNullable();
        table.text('description');
        table.string('category');
        table.string('difficulty');
        table.integer('num_questions').unsigned();
        table.integer('duration_minutes').unsigned();
        table.boolean('is_public').defaultTo(true);
        table.string('image_url');
        table.timestamps(true, true);
      })
      .createTable('questions', function(table) {
        table.increments('id').primary();
        table.integer('quiz_id').unsigned().references('playable_quizzes.id').onDelete('CASCADE');
        table.string('question').notNullable();
        table.timestamps(true, true);
      })
      .createTable('answers', function(table) {
        table.increments('id').primary();
        table.integer('question_id').unsigned().references('questions.id').onDelete('CASCADE');
        table.string('answer').notNullable();
        table.boolean('is_correct').defaultTo(false);
        table.timestamps(true, true);
      });
  };
  
    /**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */

  exports.down = function(knex) {
    return knex.schema
      .dropTableIfExists('answers')
      .dropTableIfExists('questions')
      .dropTableIfExists('playable_quizzes')
      .dropTableIfExists('user_quizzes')
      .dropTableIfExists('users');
  };
  


  
