'use strict'

/* eslint-disable max-len */
exports.up = function(knex) {
  return knex.schema.createTable(`favorites`, table => {
    table.increments()
    table.int(`book_id`).references(`books.id`).notNullable().onDelete(`CASCADE`).index()
    table.int(`user_id`).references(`users.id`).notNullable().onDelete(`CASCADE`).index()
    table.timestamps(true, true)
  })
}

exports.down = function(knex) {
  return knex.schema.dropTable(`favorites`)
}
