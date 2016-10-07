'use strict'

<<<<<<< HEAD
const express = require('express');
const knex = require(`../knex`);
const bodyParser = require(`body-parser`);
const bcrypt = require(`bcrypt`);
const cookieSession = require(`cookie-session`);

const router = express.Router();

router.get(`/session`, (req, res, next) => {
  if (req.session.userId) {
    res.send(true);
  } else {
    res.send(false)
  }
});

router.post(`/session`, (req, res, next) => {
  res.type(`json`);
  const login = req.body;
  knex(`users`)
    .where(`email`, login.email)
    .then(user => {
      if (user.length) {
        const credentials = bcrypt.compareSync(login.password, user[0].hashed_password);
        if (credentials) {
          delete user[0].hashed_password;
          req.session.userInfo = user[0];
          res.json(user[0]);
        } else {
          res.type(`text/plain`)
          res.status(400)
          res.send(`Bad email or password`)
        }
      } else {
        res.type(`text/plain`)
        res.status(400)
        res.send(`Bad email or password`)
      }
    })
});

// delete session info
router.delete(`/session`, (req, res, next) => {
  req.session = null;
  res.send(true);
});
=======
/* eslint-disable no-sync */

const express = require(`express`)
const knex = require(`../knex`)
const cookieSession = require(`cookie-session`)
const bcrypt = require(`bcrypt`)
const { camelizeKeys, decamelizeKeys, } = require(`humps`)

// eslint-disable-next-line new-cap
const router = express.Router()

router.get(`/session`, (req, res) => {
  if (req.session.user) {
    res.send(true)
  } else {
    res.send(false)
  }
})

router.post(`/session`, (req, res) => {
  const login = req.body

  knex(`users`)
    .where(`email`, login.email)
    .then(user => {
      if (user.length) {
        const userInfo = user[0]

        if (bcrypt.compareSync(login.password, userInfo.hashed_password)) {
          req.session.user = userInfo
          delete userInfo.hashed_password
          res.send(camelizeKeys(userInfo))
        } else {
          res.type(`text/plain`)
          res.status(400)
          res.send(`Bad email or password`)
        }
      } else {
        res.type(`text/plain`)
        res.status(400)
        res.send(`Bad email or password`)
      }
    })
})

router.delete(`/session`, (req, res) => {
  req.session = null
  res.send(true)
})
>>>>>>> bnb-part4

module.exports = router
