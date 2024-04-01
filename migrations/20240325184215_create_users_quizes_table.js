/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */

exports.up = function (knex) {
    return knex.schema
        .createTable('users', function (table) {
            table.increments('id').primary();
            table.string('username').notNullable();
            table.string('email').notNullable().unique();
            table.string('password').notNullable();
            table.integer('current_score').defaultTo(0); 
            table.integer('total_score').defaultTo(0);
            table.integer('quizzes_played').defaultTo(0);
            table.timestamps(true, true);
        })
        .createTable('user_quizzes', function (table) {
            table.increments('id').primary();
            table.integer('user_id').unsigned().references('id').inTable('users').onUpdate('CASCADE').onDelete('CASCADE');
            table.string('title').notNullable();
            table.text('description');
            table.string('category');
            table.string('difficulty');
            table.integer('num_questions').unsigned();
            table.integer('duration_minutes').unsigned();
            table.boolean('is_public').defaultTo(true);
            table.json('questions');
            table.timestamps(true, true);
        })
        .createTable('quizzes', function (table) {
            table.increments('id').primary();
            table.string('title').notNullable();
            table.text('description');
            table.string('category');
            table.string('difficulty');
            table.integer('num_questions').unsigned();
            table.integer('duration_minutes').unsigned();
            table.boolean('is_public').defaultTo(true);
            table.json('questions');
            table.timestamps(true, true);
        });
};

/**
* @param { import("knex").Knex } knex
* @returns { Promise<void> }
*/

exports.down = function (knex) {
    return knex.schema
        .dropTableIfExists('user_quizzes')
        .dropTableIfExists('quizzes')
        .dropTableIfExists('users');
};





