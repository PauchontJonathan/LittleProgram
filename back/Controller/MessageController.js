const MessageModel = require('../Model/Message')
const { getIdFromToken } = require('../functions/functions')

const setMessage = async (req, res) => {
  const token = req.body.token
  const message = req.body.message

  const emptyMessage = {
    'details': [
      {
        'message': 'Le message ne peut pas être vide !'
      },
    ]
  }

  if (!message) return res.status(400).send({errorMessage: emptyMessage})

  const userId = getIdFromToken(token)

  const newMessage = new MessageModel({
    message: message,
    user: userId
  });

  newMessage.save()

  res.status(200).send({ success: true, message: 'Message envoyé !' })
}

const getAllMessages = async (req, res) => {
  
  const allMessages  = await MessageModel.find().populate('user', '-password -_id')

  res.status(200).send({ success:true, allMessages })

}



module.exports = {
  setMessage:setMessage,
  getAllMessages:getAllMessages
}