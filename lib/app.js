/* eslint-disable no-undef */
const express = require('express');
const mongoConnection = require('./middleware/mongo-connection');
const bodyParser = require('body-parser');
const pino = require('express-pino-logger')();

const app = express();

app.use(require('morgan')('tiny', {
  skip: () => process.env.NODE_ENV === 'test'
}));
app.use(express.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(pino);

app.get('/api/greeting', mongoConnection, (req, res) => {
  const name = req.query.name || 'World';
  res.setHeader('Content-Type', 'application/json');
  res.send(JSON.stringify({ greeting: `Hello ${name}!` }));
});

app.use(require('./middleware/not-found'));
app.use(require('./middleware/error'));

// eslint-disable-next-line no-undef
module.exports = app;
