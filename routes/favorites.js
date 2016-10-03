'use strict';

const express = require('express');
const knex = require(`../knex`);

// eslint-disable-next-line new-cap
const router = express.Router();

router.get(`/favorites`, (req, res) => {
  if (req.session) {
    res.type(`json`);
    res.status(200).send('test')
  } else {
    res.status(401).send(`Unauthorized`);
  }
});

router.get(`/favorites/check?bookId=`, (req, res) => {
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
