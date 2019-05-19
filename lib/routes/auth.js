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
  })

  .post('/signin', (req, res, next) => {
    const {
      email,
      password
    } = req.body;

    User
      .findOne({ email })
      .then(user => {
        if(!user) {
          const error = new Error('Sorry, username or password not found');
          error.status = 404;
          return next(error);
        }
        return Promise.all([
          Promise.resolve(user),
          user.compare(password)
        ])
          .then(([user, results]) => {
            if(!results) {
              const error = new Error('Sorry, username or password not found');
              error.status = 404;
              return next(error);              
            } else {
              res.send({ token: user.authToken(), user });
            }
          });
      });
  });
