import React, { useContext, useState, useEffect } from 'react';
import axios from 'axios';
import classNames from 'classnames';
import Draggable from 'react-draggable';
import RemoveIcon from '@material-ui/icons/Remove';
import CloseIcon from '@material-ui/icons/Close';
import Avatar from '@material-ui/core/Avatar';
import { DesktopContext, closeMessengerWindow, reduceMessenger, activeMessenger } from 'src/reducers/desktop';
import { MessengerContext, logUser, logOutUser, setIsLoggedMessage, verifySession, setSessionId, cleanSessionId } from 'src/reducers/messenger';
import { UserContext } from 'src/reducers/user';
import Menu from '@material-ui/core/Menu';
import MenuItem from '@material-ui/core/MenuItem';
import UserListMessenger from './UserListMessenger';
import SingleRoom from './SingleRoom';

import './messenger.scss';

const Messenger = () => {

  const [anchorEl, setAnchorEl] = useState(null);


  const [ desktopState, desktopDispatch ] = useContext(DesktopContext);
  const [ messengerState, messengerDispatch ] = useContext(MessengerContext);
  const [ state, userDispatch ] = useContext(UserContext);

  const { isReduceMessenger, isActiveMessenger } = desktopState;
  const { avatar, nickname, token } = state;
  const { isLoggedUser, isLoggedUserMessage, isSessionActive, currentSessionId } = messengerState;

  useEffect(() => {
    axios.post('http://localhost:8000/api/v1/sessions/verify', { token })
      .then((res) => {
        const { message, sessionId } = res.data;
        messengerDispatch(setSessionId(sessionId));
        messengerDispatch(setIsLoggedMessage(message));
      })
      .catch((err) => {
        const { message } = err.response.data;
        messengerDispatch(setIsLoggedMessage(message));
      })
  }, [isSessionActive])

  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  const handleActiveDisplay = () => {
    desktopDispatch(activeMessenger());
  };

  const handleReduceMessenger = () => {
    desktopDispatch(reduceMessenger());
  };

  const disconnectUser = () => {
    axios.post('http://localhost:8000/api/v1/sessions/disconnect', { sessionId: currentSessionId })
      .then(() => {
        messengerDispatch(verifySession());
        setAnchorEl(null);
        messengerDispatch(cleanSessionId());
        messengerDispatch(logOutUser());
      })
  };

  const closeMessenger =() => {
    desktopDispatch(closeMessengerWindow());
    messengerDispatch(logOutUser());
  };

  const connectUser = () => {
    if (!currentSessionId) {
      axios.post('http://localhost:8000/api/v1/sessions/connect', { token })
        .then((res) => {
          const { _id } = res.data;
          messengerDispatch(setSessionId(_id));
          messengerDispatch(verifySession());
          messengerDispatch(logUser())
        })
    } else if (currentSessionId) {
      messengerDispatch(verifySession());
      messengerDispatch(logUser())
    }
  };

  const handleDisplay = classNames('messenger', { 'messenger-hidden': isReduceMessenger }, { 'messenger-active': isActiveMessenger });
  const handleDisplayOnLogin = classNames('messenger-logged', { 'messenger-logged-hidden': isReduceMessenger }, { 'messenger-logged-active': isActiveMessenger });
  const handleDisplayFlexDirection = classNames('messenger-container', { 'messenger-container-logged': isLoggedUser });

  return (
    <Draggable onStart={handleActiveDisplay}>
      <div className={isLoggedUser ? handleDisplayOnLogin : handleDisplay} onClick={handleActiveDisplay}>
        <div className="window-description">
          <h1 className="window-description-title">Little-Messenger</h1>
          <div className="window-description-icons">
            <RemoveIcon onClick={handleReduceMessenger} className="window-description-icons-icon" />
            <CloseIcon onClick={closeMessenger} className="window-description-icons-icon" />
          </div>
        </div>
        <div className={handleDisplayFlexDirection}>
          { !isLoggedUser && (
            <>
              <Avatar className="messenger-container-avatar" src={`http://localhost:8000/static/${avatar}`} />
              <p className="messenger-container-nickname">{nickname}</p>
              <button type="button" className="messenger-container-connexion" onClick={connectUser}>{isLoggedUserMessage === 'Vous avez 1 session active' ? 'Rejoindre la session' : 'Se connecter'}</button>
              <p className="messenger-container-session">{isLoggedUserMessage}</p>
            </>
          )}
          { isLoggedUser && (
            <>
              <div className="messenger-logged-container">
                <div className="messenger-logged-users">
                  <UserListMessenger />
                </div>
                <div className="messenger-logged-user">
                  <div className="messenger-logged-user-container">
                    <Avatar className="messenger-logged-user-avatar" src={`http://localhost:8000/static/${avatar}`} onClick={handleClick}/>
                    <Menu
                      id="simple-menu"
                      anchorEl={anchorEl}
                      keepMounted
                      open={Boolean(anchorEl)}
                      onClose={handleClose}
                    >
                      <MenuItem onClick={disconnectUser}>Logout</MenuItem>
                    </Menu>
                    <div className="messenger-logged-user-container-connected" />
                  </div>
                  <p className="messenger-logged-user-nickname">Lunastra</p>
                </div>
              </div>
              <div className="messenger-logged-links">
                <a className="messenger-logged-links-single">Général</a>
              </div>
              <SingleRoom />
            </>
          )}
        </div>
      </div>
    </Draggable>
  )
}

export default Messenger;