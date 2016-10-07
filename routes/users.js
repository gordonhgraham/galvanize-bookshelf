'use strict'

const express = require(`express`)
const knex = require(`../knex`)
const bcrypt = require(`bcrypt-as-promised`)
const { camelizeKeys, decamelizeKeys, } = require(`humps`)

/* eslint-disable new-cap, camelcase */
const router = express.Router()

router.post(`/users`, (req, res, next) => {
  const newUser = decamelizeKeys(req.body)

  bcrypt.hash(newUser.password, 12)
    .then(hash => {
      knex(`users`)
        .insert({
          first_name: newUser.first_name,
          last_name: newUser.last_name,
          email: newUser.email,
          hashed_password: hash,
        }, `*`)
        .then(user => {
          const addedUser = camelizeKeys(user[0])

          delete addedUser.hashedPassword
          res.send(addedUser)
        })
        .catch(err => {
          next(err)
        })
    })
})

module.exports = router
