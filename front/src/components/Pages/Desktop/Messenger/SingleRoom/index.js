/* eslint-disable no-underscore-dangle */
import React, { useEffect, useContext } from 'react';
import Avatar from '@material-ui/core/Avatar';
import { MessengerContext, getAllMessages, setSingleMessage, setIsMessageSend, clearMessageInput, setSocketMessageToMessages } from 'src/reducers/messenger'
import { UserContext } from 'src/reducers/user'
import axios from 'axios'

const SingleRoom = ({ socketRef }) => {
  

  const [ userState, userDispatch ] = useContext(UserContext);
  const [ messengerState, messengerDispatch ] = useContext(MessengerContext)
  const { messages, singleMessageValueInput, isMessageSend} = messengerState;
  const { token, avatar, nickname } = userState;

  useEffect(() => {
    const messagesClassElement = document.querySelector('.messenger-logged-messagesBox-messages');
    axios.get('http://localhost:8000/api/v1/messages/all')
      .then((res) => {
        const { allMessages } = res.data;
        messengerDispatch(getAllMessages(allMessages));
      })
      .finally(() => {
        messagesClassElement.scrollTo(0, messagesClassElement.scrollHeight)
      });
  }, [])


  useEffect(() => {
    socketRef.current.on('getMessage', (currentMessage) => {
      messengerDispatch(setSocketMessageToMessages(currentMessage));
      const messagesClassElement = document.querySelector('.messenger-logged-messagesBox-messages');
      messagesClassElement.scrollTo(0, messagesClassElement.scrollHeight)
    })
  }, [])

  const handleMessageInputOnChange = (e) => {
    const { value } = e.target;
    messengerDispatch(setSingleMessage(value))
  };

  const handleSendMessageSubmit = (e) => {
    e.preventDefault();
    if (singleMessageValueInput === '') return;
    const singleMessage = {
      message: singleMessageValueInput,
      nickname,
      avatar,
    };
    socketRef.current.emit('sendMessage', singleMessage);
    messengerDispatch(setIsMessageSend());
    axios.post('http://localhost:8000/api/v1/messages/message', {token, message: singleMessageValueInput.trim()})
      .then(() => {
        messengerDispatch(setIsMessageSend());
        messengerDispatch(clearMessageInput());
      });
  };

  return (
    <div className="messenger-logged-messagesBox">
      <div className="messenger-logged-messagesBox-messages">
        { messages !== [] && messages.map((message) => (
          <div key={message._id} className="messenger-logged-messagesBox-message">
            <Avatar src={`http://localhost:8000/static/${message.user.avatar}`} />
            <div className="messenger-logged-messagesBox-Usercontent">
              <p className="messenger-logged-messagesBox-nickname">{message.user.nickname}</p>
              <p className="messenger-logged-messagesBox-content">{message.message}</p>
            </div>
          </div>
        ))}
      </div>
      <form method="post" onSubmit={handleSendMessageSubmit}>
        <input onChange={handleMessageInputOnChange} value={singleMessageValueInput} className="messenger-logged-messagesBox-input" type="text" placeholder="Envoyez un message" />
      </form>
    </div>
  )
}

export default SingleRoom;
