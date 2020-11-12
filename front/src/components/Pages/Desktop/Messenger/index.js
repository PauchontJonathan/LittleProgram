import React, { useContext } from 'react';
import classNames from 'classnames';
import Draggable from 'react-draggable';
import RemoveIcon from '@material-ui/icons/Remove';
import CloseIcon from '@material-ui/icons/Close';
import Avatar from '@material-ui/core/Avatar';
import { DesktopContext, closeMessengerWindow, reduceMessenger, activeMessenger } from 'src/reducers/desktop';
import { UserContext } from 'src/reducers/user';

import './messenger.scss';

const Messenger = () => {
  const [ desktopState, desktopDispatch ] = useContext(DesktopContext);
  const { isReduceMessenger, isActiveMessenger } = desktopState;
  const [ state, userDispatch ] = useContext(UserContext);
  const { avatar, nickname } = state;

  const handleActiveDisplay = () => {
    desktopDispatch(activeMessenger());
  };

  const handleReduceMessenger = () => {
    desktopDispatch(reduceMessenger());
  };

  const closeMessenger =() => {
    desktopDispatch(closeMessengerWindow());
  };

  const handleDisplay = classNames('messenger', { 'messenger-hidden': isReduceMessenger }, { 'messenger-active': isActiveMessenger });

  return (
    <Draggable onStart={handleActiveDisplay}>
      <div className={handleDisplay} onClick={handleActiveDisplay}>
        <div className="window-description">
          <h1 className="window-description-title">Little-Messenger</h1>
          <div className="window-description-icons">
            <RemoveIcon onClick={handleReduceMessenger} className="window-description-icons-icon" />
            <CloseIcon onClick={closeMessenger} className="window-description-icons-icon" />
          </div>
        </div>
        <div className="messenger-container">
          <Avatar className="messenger-container-avatar" src={`http://localhost:8000/static/${avatar}`}/>
          <p className="messenger-container-nickname">{nickname}</p>
          <button type="button" className="messenger-container-connexion">Se connecter</button>
        </div>
      </div>
    </Draggable>
  )
}

export default Messenger;