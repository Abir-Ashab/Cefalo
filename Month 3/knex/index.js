const knex = require('knex')(require('./knexfile').development);

knex('users2')
  .select('*')
  .then(data => {
    console.log('Users:', data);
    knex.destroy();
  })