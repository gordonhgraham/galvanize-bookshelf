'use strict'

/* eslint-disable camelcase, max-len, quotes, comma-dangle, no-unused-vars */

exports.seed = function(knex, Promise) {
  return knex('users').del()
    .then(() => {
      return Promise.all([
        knex('users').insert({
          id: 1,
          first_name: 'Joanne',
          last_name: 'Rowling',
          email: 'jkrowling@gmail.com',
          hashed_password: '$2a$12$C9AYYmcLVGYlGoO4vSZTPud9ArJwbGRsJ6TUsNULzR48z8fOnTXbS', // youreawizard
          created_at: new Date('2016-06-29 14:26:16 UTC'),
          updated_at: new Date('2016-06-29 14:26:16 UTC')
        }),
      ])
    })
}
