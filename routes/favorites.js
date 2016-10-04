'use strict';

const express = require('express');
const knex = require(`../knex`);
const router = express.Router();

router.get(`/favorites`, (req, res) => {
  const userInfo = req.session.userInfo;
  const userId = userInfo.id;
  knex(`favorites`)
    .where(`favorites.user_id`, userId)
    .innerJoin(`books`, `favorites.book_id`, `books.id`)
    .then(data => {
      res.send(data)
    })
    .catch(err => {
      res.send(err);
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
