/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */

exports.up = function(knex) {
    return knex.schema.createTable('user_quizzes', function(table) {
      table.increments('id').primary();
      table.integer('user_id').unsigned().notNullable();
      table.foreign('user_id').references('users.id').onDelete('CASCADE').onUpdate('CASCADE');
      table.string('title').notNullable();
      table.text('description');
      table.timestamps(true, true);
    });
  };
  
  /**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */

  exports.down = function(knex) {
    return knex.schema.dropTableIfExists('user_quizzes');
  };
  