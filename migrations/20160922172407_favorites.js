'use strict';

exports.up = function(knex, Promise) {
    return knex.schema.createTable(`favorites`, table => {
      table.increments();
      table.integer(`book_id`).references(`books.id`).notNullable().onDelete(`cascade`).index();
      table.integer(`user_id`).references(`users.id`).notNullable().onDelete(`cascade`).index();
      table.timestamps(true, true);
    })
};

exports.down = function(knex, Promise) {
  knex.schema.dropTable(`favorites`);
};
