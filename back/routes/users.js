const express = require('express');
const bcrypt = require('bcrypt');
const User = require('../models/User');
const { registerValidation } = require('../validation');

const router = express.Router();


// Route for register one user
router.post('/register', async (req, res) => {

  //Validate datas
  const  err  = registerValidation(req.body);
  const errorMessage = err.error;
  
  if (errorMessage) return res.status(400).send({ errorMessage });

   // Stock datas from front into const
   const newNickname = req.body.nickname;
   const newPassword = req.body.password;

  //Checking if the user is already in the db
  const nicknameExist = await User.findOne({ nickname: newNickname });
  if (nicknameExist) return res.status(400).send({ error: 'le pseudo existe déjà !' });

  //Hashing password
  bcrypt.hash(newPassword, 10, (err, hash) => {
    const user = new User({
      nickname: newNickname,
      password: hash
    });
    console.log(user);
      try {
        const savedUser = user.save();
        res.status(200).send({message: 'Vous êtes bien inscrit !'});
      } catch(err) {
        res.status(400).send(err);
      }
  });
});

module.exports = router;