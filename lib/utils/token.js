/* eslint-disable no-undef */
const jwt = require('jsonwebtoken');

const tokenize = payload => {
  return jwt.sign({ payload }, process.env.AUTH_SECRET, { expiresIn: '25h' });
};

const untokenize = token => {
  return jwt.verify(token, process.env.AUTH_SECRET).payload;
};

// eslint-disable-next-line no-undef
module.exports = { tokenize, untokenize };
