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
    res.type(`text/plain`)
    res.status(401).send(`Unauthorized`)
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
  } else {
    res.type(`text/plain`)
    res.status(401).send(`Unauthorized`)
  }
})

router.post(`/favorites`, (req, res, next) => {
  if (req.session.user) {
    const newFavorite = req.body
    knex(`favorites`)
      .insert({
        user_id: req.session.user.id,
        book_id: newFavorite.bookId,
      }, `*`)
      .then(data => {
        const favorite = camelizeKeys(data[0])

        res.send(favorite)
      })
      .catch(err => { next(err) })
  } else {
    res.type(`text/plain`)
    res.status(401).send(`Unauthorized`)
  }
})

// router.delete(`/favorites`, (req, res, next) => {
//   if (req.session.user) {
//
//   } else {
//     res.type(`text/plain`)
//     res.status(401).send(`Unauthorized`)
//   }
// })

module.exports = router
