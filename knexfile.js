// Import dotenv to process environment variables from `.env` file.
require("dotenv").config();

/**
 * @type { Object.<string, import("knex").Knex.Config> }
 */

module.exports = {
    development: {
        client: "mysql2",
        connection: {
            host: process.env.DB_HOST,
            database: process.env.DB_NAME,
            user: process.env.DB_USER,
            password: process.env.DB_PASSWORD,
            charset: "utf8",
        },

        migrations: {
            directory: './migrations', // Directory containing migration files
        },

        seeds: {
            directory: './seeds', // Directory containing seed files
        },
    },
};