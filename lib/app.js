/* eslint-disable no-undef */
const express = require('express');
const mongoConnection = require('./middleware/mongo-connection');
const { bearerToken } = require('./middleware/ensureAuth');
const bodyParser = require('body-parser');
const pino = require('express-pino-logger')();

const app = express();

app.use(require('morgan')('tiny', {
  skip: () => process.env.NODE_ENV === 'test'
}));
app.use(express.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(pino);

app.use(bearerToken);
app.use('/api/v1/auth', mongoConnection, require('./routes/auth'));

app.use(require('./middleware/not-found'));
app.use(require('./middleware/error'));

// eslint-disable-next-line no-undef
module.exports = app;
