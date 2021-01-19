const mongoose = require('mongoose')

const RoomSchema = mongoose.Schema({
  guest: {
    type: String,
    required: true,
  },
  host: {
    type: String,
    required: true,
  },
  message: [
    {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'Messages',
    },
  ],
  session: [
    {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'Sessions',
    },
  ]
})

module.exports = mongoose.model('Room', RoomSchema)