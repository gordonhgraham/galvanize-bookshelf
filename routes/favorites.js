'use strict';

const express = require('express');
const knex = require(`../knex`);

// eslint-disable-next-line new-cap
const router = express.Router();
const cookieSession = require('cookie-session')

router.get(`/favorites`, (req, res) => {
  console.log(req.session.userInfo);
  if (req.session.userInfo) {
    const favorites = knex(`favorites`)
      .where(`user_id`, req.session.userInfo.id)
      .then(data => {
        res.send(data);
  } else {
    res.status(401).send(`Unauthorized`);
  }
});

router.get(`/favorites/:id`, (req, res) => {
  if (req.session.userInfo) {

  } else {
    res.status(401).send(`Unauthorized`);
  }
});

router.post(`/favorites`, (req, res) => {
  if (req.session.userInfo) {

  } else {
    res.status(401).send(`Unauthorized`);
  }
});

router.delete(`/favorites`, (req, res) => {
  if (req.session.userInfo) {

  } else {
    res.status(401).send(`Unauthorized`);
  }
});

module.exports = router;
