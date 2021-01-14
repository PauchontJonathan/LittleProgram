const SessionModel = require('../Model/Session')
const { getIdFromToken } = require('../functions/functions')

const openSession = async (req, res) => {

  const userId = getIdFromToken(req.body.token)

  const newSession = new SessionModel({
    isActive: true,
    user: userId,
  })
 
  newSession.save()

  const { _id } = newSession

  res.status(200).send({ _id, success: true, message: 'Session lancée !' })

}

const verifySession =  async (req, res) => {
  const { token } = req.body
  const userId = getIdFromToken(token)
  const session = await SessionModel.findOne().where({ user: userId });

  if (!session) return res.status(400).send({ isActive: false, message: 'Vous n\'avez pas de session active' })

  const { _id, isActive } = session

  if (session) return res.status(200).send({ sessionId: _id, isActive, message: 'Vous avez 1 session active'})

}

const closeSession = async (req, res) => {
  const { sessionId } = req.body
  await SessionModel.findByIdAndDelete(sessionId)

  res.status(200).send({ success: true, message: 'Session fermée !' })
}

const getAllUserBySessions = async (req, res) => {
  const sessions = await SessionModel.find().populate('user', '-_id -password')
  console.log(sessions);
  res.status(200).send({ sessions })
}

module.exports = {
  openSession:openSession,
  closeSession:closeSession,
  verifySession:verifySession,
  getAllUserBySessions:getAllUserBySessions,
}