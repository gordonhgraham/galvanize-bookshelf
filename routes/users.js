'use strict';

const express = require('express');
const humps = require('humps');
const knex = require('../knex');
const cookieSession = require(`cookie-session`)


// eslint-disable-next-line new-cap
const router = express.Router();
const bcrypt = require(`bcrypt`);

router.post(`/users`, (req, res, next) => {
  const newUser = req.body;
  const hashed_password = bcrypt.hashSync(newUser.password, 12);
  knex(`users`)
    .insert({
      first_name: newUser.firstName,
      last_name: newUser.lastName,
      email: newUser.email,
      hashed_password: hashed_password
    }, `*`)
    .then(data => {
      const user = data[0];
      delete user.hashed_password;
      req.session.userInfo = user;
      res.json(humps.camelizeKeys(user));
    })
    .catch((err) => {
      next(err);
    });
});

module.exports = router;
