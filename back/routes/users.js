const express = require('express');
const multer  = require('multer');
const upload = multer({ dest: 'public/avatar/' });
const UserController = require('../Controller/UserController');

const router = express.Router();

// Route for register one user
router.post('/register', UserController.getRegister)

//Route for login one user
router.post('/login', UserController.getLogin)

//route to send user information to front
router.post('/user', UserController.getUserInfos)

//route for update the password
router.put('/user/update/password', UserController.updatePassword)

//route for update users nickname information
router.put('/user/update/nickname', UserController.updateNickname)

//route for update users avatar
router.post('/user/upload/avatar', upload.single('avatar'), UserController.getAvatar);

module.exports = router;