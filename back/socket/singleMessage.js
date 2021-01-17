const singleMessage = {
  message: '',
  user: {
    nickname: '',
    avatar: '',
  }
}


const sendMessage = (currentMessage) => {
  singleMessage.message = currentMessage.message
  singleMessage.user.nickname = currentMessage.nickname
  singleMessage.user.avatar = currentMessage.avatar
}


module.exports = {
  sendMessage:sendMessage,
  singleMessage:singleMessage
}