const mongoose = require('mongoose');

const candidateSchema = new mongoose.Schema({
  firstName: {
    type: String,
    required: true
  },
  lastName: {
    type: String,
    required: true
  },
  image: String
});

const Candidate = new mongoose.model('Candidate', candidateSchema);

module.exports = Candidate;
