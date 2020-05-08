const mongoose = require('mongoose');

const UserSchema = mongoose.Schema({
  nickname: {
    type: String,
    required: true,
  },
  password : {
    type: String,
    required: true,
    minlength: 5,
    maxlength: 999,
  }
});

module.exports = mongoose.model('Users', UserSchema);