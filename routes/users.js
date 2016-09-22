'use strict';

const express = require('express');
const humps = require('humps');
const knex = require('../knex');


// eslint-disable-next-line new-cap
const router = express.Router();
const bcrypt = require(`bcrypt-as-promised`);

router.post(`/users`, (req, res, next) => {
  bcrypt.hash(req.body.password, 12)
    .then((hashed_password) => {
      return knex(`users`)
        .insert({
          first_name: req.body.firstName,
          last_name: req.body.lastName,
          email: req.body.email,
          hashed_password: hashed_password
        }, `*`);
    })
    .then(data => {
      const newUser = data[0];
      delete newUser.hashed_password;
      res.json(humps.camelizeKeys(newUser));
    })
    .catch((err) => {
      next(err);
    });
});

module.exports = router;
