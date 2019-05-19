/* eslint-disable babel/no-invalid-this */
const mongoose = require('mongoose');
const { passwordHash, compare } = require('../utils/hash');
const { tokenize, untokenize } = require('../utils/token');


const userSchema = new mongoose.Schema({
  firstName: {
    type: String,
    required: true
  },
  lastName: {
    type: String,
    required: true
  },
  email: {
    type: String,
    required: true
  },
  candidates: [{
    name: String,
    candidate: {
      type: mongoose.Types.ObjectId,
      ref: 'Candidate'
    },
    score: {
      type: Number,
      default: 0
    }
  }],
  passwordHash: String
}, {
  toJSON: {
    transform: function(doc, ret) {
      delete ret.passwordHash;
    }
  }
});

userSchema.virtual('password').set(function(password) {
  this._tempPassword = password;
});

userSchema.pre('save', function(next) {
  passwordHash(this._tempPassword)
    .then(hashedPassword => {
      this.passwordHash = hashedPassword;
      next();
    });
});

userSchema.methods.compare = function(password) {
  return compare(password, this.passwordHash);
};

userSchema.methods.authToken = function() {
  return tokenize(this.toJSON());
};

userSchema.statics.findByToken = function(token) {
  return Promise.resolve(untokenize(token));
};

const User = mongoose.model('User', userSchema);

// eslint-disable-next-line no-undef
module.exports = User;
