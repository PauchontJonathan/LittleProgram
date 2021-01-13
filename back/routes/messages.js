const express = require('express')
const MessageController = require('../Controller/MessageController')

const router = express.Router()

router.post('/message', MessageController.setMessage)
router.get('/all', MessageController.getAllMessages)

module.exports = router