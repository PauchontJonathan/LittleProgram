const mongoose = require('mongoose')

const Session = mongoose.Schema({
  isActive: {
    type: Boolean,
    required: true,
  },
  user: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Users',
  },
  room: [
    {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'Room',
    },
  ]
})

module.exports = mongoose.model('Sessions', Session)