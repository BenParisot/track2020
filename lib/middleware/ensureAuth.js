const User = require('../models/User');

const bearerToken = (req, res, next) => {
  const headerValue = req.get('Authorization') || '';
  const token = headerValue.replace(/Bearer\s/i, '');

  req.token = token;
  next();
};

const ensureAuth = (req, res, next) => {
  return User
    .findByToken(req.token)
    .then(user => {
      if(!user) {
        const error = new Error('Sorry, we could not authenticate your account.');
        error.status = 400;
        return next(error);
      }
      req.user = user;
      next();
    });
};

// eslint-disable-next-line no-undef
module. exports = {
  bearerToken, ensureAuth
};
