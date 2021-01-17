let connected = false


const connectUser = () => {
  return connected = !connected
}

const disconnectUser = () => {
  return connected = !connected
}

module.exports = {
  connectUser:connectUser,
  disconnectUser:disconnectUser,
  connected:connected,
}