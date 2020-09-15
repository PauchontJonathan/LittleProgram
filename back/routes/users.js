const express = require('express');
const bcrypt = require('bcrypt');
const User = require('../models/User');
const jwt = require('jsonwebtoken');
const { registerValidation, loginValidation, updateNicknameValidation, updatePasswordValidation } = require('../validation');
const { getIdFromToken } = require('../functions/functions');
const { restart } = require('nodemon');

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

//route to send nickname for the user
router.post('/user', async (req,res) => {
  const currentToken = req.body.token;

  const userId = getIdFromToken(currentToken);
  const user = await User.findById(userId);
  
  const error = {
    'details': [
      {
        'message': "L'utilisateur n'a pas été trouvé !"
      }
    ]
  };
  if(!user) return res.status(400).send({errorMessage: error })
  const { nickname } = user;
  res.status(200).send({ nickname });
});

//route for update users nickname information
router.post('/user/update/nickname', async (req,res) => {
    //Validate datas
    const  err  = updateNicknameValidation(req.body);
    const errorMessage = err.error;
    if (errorMessage) return res.status(400).send({ errorMessage });

    const newNickname = req.body.nickname;
    const currentToken = req.body.token;

    const nickNameMessage = {
      'details': [
        {
          'message': 'Le pseudo existe déjà !'
        }
      ]
    };

    const isNicknameExists = await User.findOne({ nickname: newNickname });
    if(isNicknameExists) return res.status(400).send({ errorMessage: nickNameMessage });
  
    const userId = getIdFromToken(currentToken);
    await User.findByIdAndUpdate(userId, { nickname: newNickname }, { new: true }, (err) => {
      if(err) {
        const error = {
          'details': [
            {
              'message': "Echec lors de la modification !"
            }
          ]
        };
        res.status(400).send({ errorMessage: error });
      } else {
        res.status(200).send({ success: true });
      }
    });

    router.post('/user/update/password', async (req,res) => {
      const  err  = updatePasswordValidation(req.body);
      const errorMessage = err.error;
      if (errorMessage) return res.status(400).send({ errorMessage });

      const newPassword = req.body.password;
      const currentToken = req.body.token;

      const passwordMessage = {
        'details': [
          {
            'message': 'Le mot-de-passe existe déjà !'
          }
        ]
      };

      const userId = getIdFromToken(currentToken);
      const user = await User.findById(userId);

      const { password }  = user;

      const isSame = await bcrypt.compare( newPassword, password );
      if (isSame) return res.status(400).status({ errorMessage: passwordMessage });

      
    });
})

module.exports = router;