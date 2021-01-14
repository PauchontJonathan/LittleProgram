/* eslint-disable no-underscore-dangle */
import React, { useEffect, useContext } from 'react';
import axios from 'axios';
import { MessengerContext, getUserList, setUserListLoad } from 'src/reducers/messenger';
import Avatar from '@material-ui/core/Avatar';

const UserListMessenger = () => {

  const [ messengerState, messengerDispatch ] = useContext(MessengerContext);

  const { userList, isUserListLoad } = messengerState;

  useEffect(() => {
    axios.get('http://localhost:8000/api/v1/sessions/all')
      .then((res) => {
        const { sessions } = res.data;
        messengerDispatch(getUserList(sessions))
        messengerDispatch(setUserListLoad())
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