const express = require('express');
const UserController = require('../Controller/UserController');

const router = express.Router();

// Route for register one user
router.post('/register', UserController.getRegister)

//Route for login one user
router.post('/login', UserController.getLogin)

//route to send nickname for the user
router.post('/user', UserController.getNickname)
//route for update the password
router.put('/user/update/password', UserController.updatePassword)

//route for update users nickname information
router.put('/user/update/nickname', UserController.updateNickname)

module.exports = router;