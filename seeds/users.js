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
    //   created_at: new Date(),
    //   updated_at: new Date()
    },
    {
      id: 2,
      username: 'janedoe',
      email: 'janedoe@example.com',
      password: 'securepass321',
    //   created_at: new Date(),
    //   updated_at: new Date()
    }
  ];
  
