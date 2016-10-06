'use strict'

const express = require(`express`)
const knex = require(`../knex`)
const cookieSession = require(`cookie-session`)
const bcrypt = require(`bcrypt-as-promised`)
const {
  camelizeKeys,
  decamelizeKeys,
} = require(`humps`)

// eslint-disable-next-line new-cap
const router = express.Router()

router.get(`/session`, (req, res) => {
  if (req.session.user) {
    res.send(true)
  } else {
    res.send(false)
  }
})

router.post(`/session`, (req, res, next) => {
  const login = req.body

  // check username and hashed password with db
  knex(`users`)
    .where(`email`, login.email)
    .first()
    .then(user => {
      const credentials = bcrypt.compare(login.password, user.hashed_password)

      if (user && credentials) {
        req.session.user = user
        delete user.hashed_password
        res.send(camelizeKeys(user))
      } else {
        res.send(`Bad email or password`)
      }
    })
})

router.delete(`/sessioin`, (req, res, next) => {
  req.session.user = null
  res.send(true)
})

module.exports = router
