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

  knex(`users`)
    .where(`email`, login.email)
    .then(user => {
      console.log(user.length);
      if (user.length) {
        const userInfo = user[0]
        bcrypt.compare(login.password, userInfo.hashed_password)
          .then(data => {
            console.log(`this is the data`, data);
            if (data) {
              req.session.user = userInfo
              delete userInfo.hashed_password
              res.send(camelizeKeys(userInfo))
            } else {
              res.type(`text/plain`)
              res.status(400)
              res.send(`Bad email or password`)
            }
          })
      } else {
        console.log(`the email was no good`);
        res.type(`text/plain`)
        res.status(400)
        res.send(`Bad email or password`)
      }
    })
})

router.delete(`/session`, (req, res, next) => {
  req.session = null
  res.send(true)
})

module.exports = router
