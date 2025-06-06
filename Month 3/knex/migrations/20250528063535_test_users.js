exports.up = function(knex) {
  return knex.schema.createTable('users2', function(table) {
    table.increments('id');
    table.string('name');
    table.integer('age').unique();
    table.timestamps(true, true);
    table.string('email').notNullable().unique();
    table.string('password').notNullable();
  });
};

exports.down = function(knex) {
  return knex.schema.dropTable('users2');
};