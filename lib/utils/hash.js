const bcrypt = require('bcryptjs');

function passwordHash(password) {
  return bcrypt.hash(password, 10);
}

function compare(password, hashedPassword) {
  return bcrypt.compare(password, hashedPassword);
}

// eslint-disable-next-line no-undef
module.exports = { passwordHash, compare };
