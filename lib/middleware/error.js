/* eslint-disable no-unused-vars */
// eslint-disable-next-line no-undef
module.exports = (err, req, res, next) => {
  res 
    .status(err.status || 500)
    .send({
      error: err.message || err
    });
};
