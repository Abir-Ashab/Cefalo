const e = require("express");

// This migration initializes the travel app database
exports.up = async function (knex) {
  // Create the users table
  await knex.schema.createTable('users', (table) => {
    table.increments('id').primary();
    table.string('username').notNullable().unique();
    table.string('email').notNullable().unique();
    table.string('password').notNullable();
    table.timestamps(true, true);
  });

  // Create the trips table
  await knex.schema.createTable('trips', (table) => {
    table.increments('id').primary();
    table.integer('user_id').unsigned().notNullable();
    table.string('destination').notNullable();
    table.date('start_date').notNullable();
    table.date('end_date').notNullable();
    table.text('notes');
    table.timestamps(true, true);

    // Foreign key constraint
    table.foreign('user_id').references('id').inTable('users').onDelete('CASCADE');
  });
};

exports.down = async function (knex) {
  // Drop the trips table first to avoid foreign key constraint issues
  await knex.schema.dropTableIfExists('trips');
  
  // Then drop the users table
  await knex.schema.dropTableIfExists('users');
};