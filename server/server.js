/* eslint-disable no-undef */
require('dotenv').config();
require('../lib/utils/connect')();
const app = require('../lib/app');

const PORT = process.env.PORT || 4242;

app.listen(PORT, () => {
  console.log(`listening on ${PORT}`);
}) ;
