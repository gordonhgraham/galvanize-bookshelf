'use strict';

const express = require('express');
var bcrypt = require(`bcrypt`);
var knex = require(`../knex`)

// eslint-disable-next-line new-cap
const router = express.Router();

router.get(`/session`, (req, res, next) => {
  if (req.session.userId) {
    res.send(true);
  } else {
    res.send(false)
  }
});

router.post(`/session`, (req, res, next) => {
  const user = req.body;
  const hash = bcrypt.hashSync(req.body.password, 12);
  knex(`users`).insert({
    email: req.body.email,
    hashed_password: hash
  }, `*`)
  .then(result => {
    const userId = result[0];
    delete userId.password;
    req.session.userId = userId;
    res.send(userId);
  })
})

module.exports = router;
