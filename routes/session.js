'use strict';

const express = require('express');
const knex = require(`../knex`);
const bodyParser = require(`body-parser`);
var bcrypt = require(`bcrypt`);
// eslint-disable-next-line new-cap
const router = express.Router();

router.get(`/session`, (req, res, next) => {
  res.type(`json`);
  if (req.session.userInfo) {
    res.send(`true`);
  } else {
    res.status(200).end('false');
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
          const userInfo = {
            id: user[0].id,
            id: user[0].id,
            email: user[0].email,
            firstName: user[0].first_name,
            lastName: user[0].last_name,
          }
          delete user[0].hashed_password;
            req.session.userInfo = user[0];
            res.json(userInfo);
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
