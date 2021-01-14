const express = require('express')
const SessionController = require('../Controller/SessionController')

const router = express.Router()

router.post('/connect',SessionController.openSession)
router.post('/disconnect', SessionController.closeSession)
router.post('/verify', SessionController.verifySession)
router.get('/all', SessionController.getAllUserBySessions)

module.exports = router