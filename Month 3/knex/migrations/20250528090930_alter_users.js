exports.up = function(knex) {
  return knex.schema.createTable('users', function(table) {
    table.increments('id');
    table.string('name');
    table.integer('age').unique();
    table.timestamps(true, true);
    table.string('email').notNullable().unique();
  });
};

exports.down = function(knex) {
  return knex.schema.dropTable('users');
};