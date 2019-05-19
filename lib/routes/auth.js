const { Router } = require('express');
const User = require('../models/User');
// const { ensureAuth } = require('../middleware/ensureAuth');

// eslint-disable-next-line no-undef
module.exports = Router()
  .post('/signup', (req, res, next) => {
    const {
      firstName,
      lastName,
      email,
      password
    } = req.body;

    User
      .create({ firstName, lastName, email, password })
      .then(user => {
        const token = user.authToken();
        res.send({ user, token });
      })
      .catch(next);
  });
