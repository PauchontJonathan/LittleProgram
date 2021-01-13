const mongoose = require('mongoose')

const MessageSchema = mongoose.Schema({
  message: {
    type: String,
    required: true,
  },
  user: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Users',
  }
})

module.exports = mongoose.model('Messages', MessageSchema)