'use strict';

const express = require('express');
const knex = require(`../knex`);

// eslint-disable-next-line new-cap
const router = express.Router();

router.get(`/favorites`, (req, res) => {
  const userInfo = req.session.userInfo;
  const userId = userInfo.id;
  knex(`favorites`)
    .where(`user_id`, userId)
    .join(`books`, `favorites.book_id`, `books.id`)
    .returning(`books.id`)
    .then(data => {
      res.send(data)
    })
    .catch(err => {
      return err;
    })
});

// router.get(`/favorites` (req, res) => {
//
// });
//
// router.post(`/favorites` (req, res) => {
//
// });
//
// router.delete(`/favorites` (req, res) => {
//
// });

module.exports = router;
