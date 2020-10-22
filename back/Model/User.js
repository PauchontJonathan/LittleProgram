const mongoose = require('mongoose');

const UserSchema = mongoose.Schema({
  nickname: {
    type: String,
    required: true,
    minlength: 4,
    maxlength: 30,
  },
  password : {
    type: String,
    required: true,
    minlength: 5,
    maxlength: 999,
  },
  avatar : {
    contentType: String,
  }
});

module.exports = mongoose.model('Users', UserSchema);