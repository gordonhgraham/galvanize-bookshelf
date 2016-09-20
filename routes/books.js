'use strict';

const express = require('express');
const knex = require('../knex');
const humps = require('humps');
// eslint-disable-next-line new-cap
const router = express.Router();

router.get(`/books`, (req, res, next) => {
  knex('books')
    .orderBy('title')
    .then(books => {
      res.json(humps.camelizeKeys(books));
  })
  .catch((err) => {
    next(err);
  });
});

module.exports = router;
