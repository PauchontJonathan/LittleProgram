const express = require('express')
const roomModel = require('../Model/Room')
const sessionModel = require('../Model/Session')


const router = express.Router()

router.post('/create', async (req, res) => {
  console.log(req.body.token)
  const { token, hostSessionId, guestSessionId, guest, host } = req.body

  if (!token) return res.status(400).send({ error: true, message: 'Le token est attendu !' })

  const newRoom = new roomModel({
    host: host,
    guest: guest,
    session: [hostSessionId, guestSessionId]
  })

  const isRoomExistInSession = await sessionModel.findOne({ room: [newRoom._id] }).exec()

  if (isRoomExistInSession) res.status(400).send({ success: false, error: 'This session already has this room' })

  const isRoomExisted = await roomModel.findById(newRoom._id)

  if (isRoomExisted) return res.status(400).send({ success: false, error: 'Room Already exist !' })


  newRoom.save()

  await sessionModel.findByIdAndUpdate(hostSessionId, { room: [newRoom._id] }, { new: true })
  await sessionModel.findByIdAndUpdate(guestSessionId, { room: [newRoom._id] }, { new: true })


  console.log(sessionModel)

})

module.exports = router