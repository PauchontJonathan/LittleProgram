const User = require('../model/User');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const fs = require('fs');
const { loginValidation, registerValidation, updateNicknameValidation, updatePasswordValidation, updateAvatarValidation } = require('../validation');
const { getIdFromToken } = require('../functions/functions');


  const getLogin = async (req, res) => {
    //Validate datas
    const  err  = loginValidation(req.body);
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

  };
  
  const getRegister = async (req, res) => {
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
  };

  const getNickname = async (req, res) => {
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
    };
  
  const updatePassword = async (req, res) => {
    const  err  = updatePasswordValidation(req.body);
    const errorMessage = err.error;
    if (errorMessage) return res.status(400).send({ errorMessage });

    const newPassword = req.body.password;
    const currentToken = req.body.token;
    console.log(currentToken);
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

      await bcrypt.hash(newPassword, 10, async (err, hash) => {
      try {
          await User.findByIdAndUpdate(userId, { password: hash }, (err) => {
          if (err) {
            const error = {
              'details': [
                {
                  'message': "Echec lors de la modification !"
                }
              ]
            };
            res.status(400).send({ errorMessage: error });
          } else {
            res.status(200).send({ success: true, message: 'Mot-de-passe modifié' });
          }
        });
      } catch {
        res.status(400).send(err);
      }
    });
  }

  const updateNickname = async (req, res) => {
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
        res.status(200).send({ success: true, message: 'Pseudo modifié' });
      }
    });
  }

  const getAvatar = async (req, res) => {
    const { token } = req.body;
    console.log(token);
    const { file } = req;
    console.log(file);
    if (!file) return res.status(400).send('Le fichier est non existant');
    const fileType = file.mimetype.split("/")[1];
    const newFileName = file.filename + "." + fileType;
    fs.rename(
      `./public/avatar/${file.filename}`,
      `./public/avatar/${newFileName}`,
       async (err) => {
        if (err) throw err;
    
        const userId = getIdFromToken(token);
    
        await User.findByIdAndUpdate(userId, { avatar: newFileName }, { new: true }, async (err) => {
          if (err) {
            const error = {
              'details': [
                {
                  'message': 'Echec lors de la modification !'
                }
              ]
            };
            res.status(400).send({ errorMessage: error });
          } else {
            const user = await User.findById(userId);
            const { avatar } = user;
            res.status(200).send({ avatar });
          }
        });
      }
    );

  };


module.exports = {
  getLogin:getLogin,
  getRegister:getRegister,
  getNickname:getNickname,
  updatePassword:updatePassword,
  updateNickname:updateNickname,
  getAvatar:getAvatar,
};