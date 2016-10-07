'use strict'

const express = require(`express`)
const knex = require(`../knex`)
const cookieSession = require(`cookie-session`)
const { camelizeKeys, decamelizeKeys, } = require(`humps`)

// eslint-disable-next-line new-cap
const router = express.Router()

router.get(`/favorites`, (req, res, next) => {
  if (req.session.user) {
    const userId = req.session.user.id

    knex(`favorites`)
      .innerJoin(`books`, `books.id`, `favorites.book_id`)
      .where(`favorites.user_id`, userId)
      .orderBy(`title`, `ASC`)
      .then(data => {
        const favorites = camelizeKeys(data)

        res.send(favorites)
      })
      .catch(err => { next(err) })
  } else {
    next(err => { res.status(401).send(`Unauthorized`, err) })
  }
})

router.get(`/favorites/:id`, (req, res, next) => {
  if (req.session.user) {
    const bookId = req.query.bookId

    knex(`favorites`)
      .where(`user_id`, req.session.user.id)
      .where(`book_id`, bookId)
      .then(data => {
        if (data.length) {
          res.status(200).send(true)
        } else {
          res.status(200).send(false)
        }
      })
      .catch(err => { next(err) })
  }
})

// router.post(`/favorites`, (req, res, next) => {
//
// })
//
// router.delete(`/favorites`, (req, res, next) => {
//
// })

module.exports = router
