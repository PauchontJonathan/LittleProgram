/* eslint-disable no-underscore-dangle */
import React, { useEffect, useContext } from 'react';
import axios from 'axios';
import { MessengerContext, getUserList, setUserListLoad, handleIsSocketConnectedUser } from 'src/reducers/messenger';
import Avatar from '@material-ui/core/Avatar';

const UserListMessenger = ({ socketRef }) => {

  const [ messengerState, messengerDispatch ] = useContext(MessengerContext);

  const { userList, isUserListLoad, isSocketConnectedUser } = messengerState;

  useEffect(() => {
    axios.get('http://localhost:8000/api/v1/sessions/all')
      .then((res) => {
        const { sessions } = res.data;
        messengerDispatch(getUserList(sessions))
        messengerDispatch(setUserListLoad())
      })
  }, [isSocketConnectedUser])

  useEffect(() => {
    socketRef.current.on('loadIsConnectedUser', (currentSocketConnectedUser) => {
      messengerDispatch(handleIsSocketConnectedUser(currentSocketConnectedUser))
    })
  }, [])

  return (
    <>
      { isUserListLoad && userList.map((list) => (
        <div className="messenger-logged-users-container" key={list._id}>
          <Avatar className="messenger-logged-users-container-avatar" src={`http://localhost:8000/static/${list.user.avatar}`} />
          <div className="messenger-logged-users-container-connected"/>
          <p className="messenger-logged-users-container-nickname">{list.user.nickname}</p>
        </div>
      )) }
    </>
  )
}

export default UserListMessenger;