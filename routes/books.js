'use strict';

const express = require('express');
const knex = require('../knex');
const humps = require('humps');
var bodyParser = require('body-parser')
// eslint-disable-next-line new-cap
const router = express.Router();

// get all books
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

// get one book
router.get(`/books/:id`, (req, res, next) => {
  const id = req.params.id;
  knex(`books`)
    .where('id', id)
    .then(books => {
      res.json(humps.camelizeKeys(books[0]));
    })
    .catch((err) => {
      next(err);
    })
});

// add one book
router.post(`/books`, (req, res, next) => {
  const newBook = req.body
  knex('books')
    .insert(humps.decamelizeKeys(newBook), 'id')
    .then(num => {
      const id = num[0];
      knex(`books`).where('id', id).first().then((data) => {
        res.json(humps.camelizeKeys(data));
      })
    })
    .catch((err) => {
      next(err);
    });
});

// update one book
router.patch(`/books/:id`, (req, res) => {
  const id = req.params.id;
  const newBook = req.body;
  knex(`books`)
    .where(`id`, id)
    .update(humps.decamelizeKeys(newBook))
    .then(() => {
      knex(`books`).where('id', id).first().then((data) => {
        res.json(humps.camelizeKeys(data));
      });
    });
});

// delete one book
// router.delete()

module.exports = router;
