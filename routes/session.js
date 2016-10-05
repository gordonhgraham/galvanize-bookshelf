'use strict';

const express = require('express');
const knex = require(`../knex`);
const bodyParser = require(`body-parser`);
var bcrypt = require(`bcrypt`);

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

module.exports = router;
