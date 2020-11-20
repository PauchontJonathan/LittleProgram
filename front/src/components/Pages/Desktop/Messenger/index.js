import React, { useContext, useState } from 'react';
import classNames from 'classnames';
import Draggable from 'react-draggable';
import RemoveIcon from '@material-ui/icons/Remove';
import CloseIcon from '@material-ui/icons/Close';
import Avatar from '@material-ui/core/Avatar';
import { DesktopContext, closeMessengerWindow, reduceMessenger, activeMessenger } from 'src/reducers/desktop';
import { MessengerContext, logUser, logOutUser } from 'src/reducers/messenger';
import { UserContext } from 'src/reducers/user';
import Menu from '@material-ui/core/Menu';
import MenuItem from '@material-ui/core/MenuItem';
import users from 'src/datas/users';

import './messenger.scss';

const Messenger = () => {

  const [anchorEl, setAnchorEl] = useState(null);


  const [ desktopState, desktopDispatch ] = useContext(DesktopContext);
  const [ messengerState, messengerDispatch ] = useContext(MessengerContext);
  const [ state, userDispatch ] = useContext(UserContext);

  const { isReduceMessenger, isActiveMessenger } = desktopState;
  const { avatar, nickname } = state;
  const { isLoggedUser } = messengerState;

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
    setAnchorEl(null);
    messengerDispatch(logOutUser());
  };

  const closeMessenger =() => {
    desktopDispatch(closeMessengerWindow());
    messengerDispatch(logOutUser());
  };

  const connectUser = () => {
    messengerDispatch(logUser())
  };

  const handleDisplay = classNames('messenger', { 'messenger-hidden': isReduceMessenger }, { 'messenger-active': isActiveMessenger });
  const handleDisplayOnLogin = classNames('messenger-logged', { 'messenger-logged-hidden': isReduceMessenger }, { 'messenger-logged-active': isActiveMessenger })

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
        <div className="messenger-container">
          { !isLoggedUser && (
            <>
              <Avatar className="messenger-container-avatar" src={`http://localhost:8000/static/${avatar}`} />
              <p className="messenger-container-nickname">{nickname}</p>
              <button type="button" className="messenger-container-connexion" onClick={connectUser}>Se connecter</button>
            </>
          )}
          { isLoggedUser && (
            <>
              <div className="messenger-logged-container">
                <div className="messenger-logged-users">
                  { users.map((user) => (
                    <div className="messenger-logged-users-container" key={user.id}>
                      <Avatar className="messenger-logged-users-container-avatar" />
                      <div className="messenger-logged-users-container-connected"/>
                      <p className="messenger-logged-users-container-nickname">{user.nickname}</p>
                    </div>
                  )) }
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
              <div className="messenger-logged-messagesBox">
                <div className="messenger-logged-messagesBox-messages">
                  <div className="messenger-logged-messagesBox-message">
                    <Avatar />
                    <p className="messenger-logged-messagesBox-content">Je suis un message</p>
                  </div>
                </div>
                <input className="messenger-logged-messagesBox-input" type="text" placeholder="Envoyez un message" />
              </div>
            </>
          )}
        </div>
      </div>
    </Draggable>
  )
}

export default Messenger;