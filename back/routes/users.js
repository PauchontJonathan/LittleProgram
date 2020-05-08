const express = require('express');
const bcrypt = require('bcrypt');
const User = require('../models/User');

const router = express.Router();

router.post('/', (req, res) => {
  console.log(req.body);
  const newNickname = req.body.nickname;
  const newPassword = req.body.password;
  bcrypt.hash(newPassword, 10, (err, hashedPassword) => {
    console.log(hashedPassword);
  });
});

module.exports = router;