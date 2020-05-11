const express = require('express');
const bcrypt = require('bcrypt');
const User = require('../models/User');
const jwt = require('jsonwebtoken');
const { registerValidation, loginValidation } = require('../validation');

const router = express.Router();


// Route for register one user
router.post('/register', async (req, res) => {

  //Validate datas
  const  err  = registerValidation(req.body);
  
  const errorMessage = err.error;
  console.log(errorMessage);
  
  if (errorMessage) return res.status(400).send({ errorMessage });

   // Stock datas from front into const
   const newNickname = req.body.nickname;
   const newPassword = req.body.password;

  //Checking if the user is already in the db
  const nickNameMessage = {
    'details': [
      {
        'message': 'Le pseudo existe déjà !'
      }
    ]
  };
  const nicknameExist = await User.findOne({ nickname: newNickname });
  if (nicknameExist) return res.status(400).send({ errorMessage: nickNameMessage });

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

//Route for login one user
router.post('/login', async (req, res) => {

  //Validate datas
  const  err  = registerValidation(req.body);
  const errorMessage = err.error;
  
  if (errorMessage) return res.status(400).send({ errorMessage });

  //Stock datas from front into const
  const currentNickname = req.body.nickname;

  //comparing user datas with datas in bdd
  const nickNameMessage = {
    'details': [
      {
        'message': 'Le mot de passe ou le pseudo est incorrect !'
      }
    ]
  };
  const user = await User.findOne({ nickname: currentNickname });
  if(!user) return res.status(400).send({errorMessage: nickNameMessage});


  const currentPassword = req.body.password;

  const passwordMessage = {
    'details': [
      {
        'message': 'Le mot de passe ou le pseudo est incorrect !'
      }
    ]
  };
  
  const passwordExist = await bcrypt.compare(currentPassword, user.password);
  if(!passwordExist) return res.status(400).send({errorMessage: passwordMessage});

  //Create and assign a token
  const token = jwt.sign({_id: user._id}, process.env.SECRET_TOKEN);
  res.header('authorization', token).status(200).send({token: token});
});

module.exports = router;