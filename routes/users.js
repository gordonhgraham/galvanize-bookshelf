'use strict'

<<<<<<< HEAD
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
=======
const express = require(`express`)
const knex = require(`../knex`)
const bcrypt = require(`bcrypt-as-promised`)
const { camelizeKeys, decamelizeKeys, } = require(`humps`)

// eslint-disable-next-line new-cap
const router = express.Router()

router.post(`/users`, (req, res, next) => {
  const newUser = decamelizeKeys(req.body)
>>>>>>> bnb-part4

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

// if (!newUser.email) {
//   res.status(400).send(`Email must not be blank`)
// }
//
// if (newUser.password < 8) {
//   res.status(400).send(`Password must be at least 8 characters long`)
// }
// knex(`users`)
//   .where(`email`, newUser.email)
//   .first()
//   .then(user => {
//     console.log(`this is the existing user`, user)
//     if (user) {
//       res.status(400).send(`Email already exists`)
//     }
//   })
//   .then(() => {
//
//   })
