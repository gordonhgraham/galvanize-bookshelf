'use strict'

const express = require(`express`)
const knex = require(`../knex`)
const { camelizeKeys, decamelizeKeys, } = require(`humps`)


// eslint-disable-next-line new-cap
const router = express.Router()

router.get(`/books`, (req, res) => {
  knex(`books`)
    .orderBy(`title`)
    .then(data => {
      const books = camelizeKeys(data)

      res.send(books)
    })
    .catch(err => { return err })
})

router.get(`/books/:id`, (req, res) => {
  const bookId = req.params.id

  knex(`books`)
    .where(`id`, bookId)
    .then(data => {
      const book = camelizeKeys(data[0])

      res.send(book)
    })
    .catch(err => { return err })
})
module.exports = router
