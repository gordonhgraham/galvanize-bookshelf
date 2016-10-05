'use strict'

const express = require(`express`)
const knex = require(`../knex`)
const { camelizeKeys, decamelizeKeys, } = require(`humps`)


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

      delete deletedBook.id
      res.send(deletedBook)
    })
    .catch(err => {
      next(err)
    })
})

module.exports = router
