const mongoose = require('mongoose');

const ApplicationSchema = mongoose.Schema({
  name: {
    type: String,
    required: true,
  }
});

module.exports = mongoose.model('Applications', ApplicationSchema);