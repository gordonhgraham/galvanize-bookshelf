'use strict';

const express = require('express');
const knex = require(`../knex`);
const bodyParser = require(`body-parser`);
var bcrypt = require(`bcrypt`);
// eslint-disable-next-line new-cap
const router = express.Router();

// get session info
router.get(`/session`, (req, res, next) => {
  res.type(`json`);
  if (req.session.userInfo) {
    res.send(req.session.userInfo);
  } else {
    res.status(200).end('false');
  }
});

//post session info
router.post(`/session`, (req, res, next) => {
  res.type(`json`);
  const user = req.body;
  const password = bcrypt.hashSync(req.body.password, 12);
  knex(`users`)
    .insert({
      first_name: user.firstName,
      last_name: user.lastName,
      email: user.email,
      hashed_password: password
    }, `*`)
    .then(data => {
      req.session.userInfo = data[0];
      delete data.hashed_password;
      res.send(data[0]);
    });
});

// delete session info
// router.delete(`/session`, (req, res, next) => {
//
// });

module.exports = router;
