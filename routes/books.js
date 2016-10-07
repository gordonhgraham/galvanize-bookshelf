'use strict'

const express = require(`express`)
const knex = require(`../knex`)
const { camelizeKeys, decamelizeKeys, } = require(`humps`)

<<<<<<< HEAD
const express = require('express');
const knex = require('../knex');
const humps = require('humps');
var bodyParser = require('body-parser')
=======

>>>>>>> bnb-part4
// eslint-disable-next-line new-cap
const router = express.Router()

router.get(`/books`, (req, res, next) => {
  knex(`books`)
    .orderBy(`title`)
    .then(data => {
      const books = camelizeKeys(data)

      res.send(books)
    })
    .catch(err => { next(err) })
})

router.get(`/books/:id`, (req, res, next) => {
  const bookId = req.params.id

  knex(`books`)
    .where(`id`, bookId)
    .then(data => {
      const book = camelizeKeys(data[0])

      res.send(book)
    })
    .catch(err => { next(err) })
})

router.post(`/books`, (req, res, next) => {
  const submittedBook = decamelizeKeys(req.body)

  knex(`books`)
    .insert({
      title: submittedBook.title,
      author: submittedBook.author,
      genre: submittedBook.genre,
      description: submittedBook.description,
      cover_url: submittedBook.cover_url,
    }, `*`)
    .then(data => {
      const newBook = camelizeKeys(data[0])

      res.send(newBook)
    })
    .catch(err => {
      next(err)
    })
})

router.patch(`/books/:id`, (req, res, next) => {
  const bookId = req.params.id
  const submittedUpdate = decamelizeKeys(req.body)

  knex(`books`)
    .where(`id`, bookId)
    .first()
    .update(submittedUpdate, `*`)
    .then(data => {
      const updatedBook = camelizeKeys(data[0])

      res.send(updatedBook)
    })
    .catch(err => {
      next(err)
    })
})

router.delete(`/books/:id`, (req, res, next) => {
  const bookId = req.params.id

  knex(`books`)
    .where(`id`, bookId)
    .first()
    .del()
    .returning(`*`)
    .then(book => {
      const deletedBook = camelizeKeys(book[0])

<<<<<<< HEAD
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
router.delete(`/books/:id`, (req, res) => {
  const id = req.params.id;
  knex(`books`)
    .where(`id`, id)
    .del()
    .returning('*').first()
    .then((data) => {
      delete data.id;
      res.json(humps.camelizeKeys(data));
    });
});
=======
      delete deletedBook.id
      res.send(deletedBook)
    })
    .catch(err => {
      next(err)
    })
})
>>>>>>> bnb-part4

module.exports = router
