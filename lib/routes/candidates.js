const { Router } = require('express');
const Candidate = require('../models/Candidate');
const User = require('../models/User');
const { ensureAuth } = require('../middleware/ensureAuth');

// eslint-disable-next-line no-undef
module.exports = Router()
  .post('/add', (req, res, next) => {
    const {
      firstName,
      lastName,
      score,
      image
    } = req.body;

    Candidate
      .create({ firstName, lastName, score, image })
      .then(candidate => {
        res.send(candidate);
      })
      .catch(next);
  })
  
  .path('./add-to-list/:id', ensureAuth, (req, res, next) => {
      
  })
