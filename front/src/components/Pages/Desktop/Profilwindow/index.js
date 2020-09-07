import React, { useContext } from 'react';
import Draggable from 'react-draggable';
import RemoveIcon from '@material-ui/icons/Remove';
import CloseIcon from '@material-ui/icons/Close';
import Avatar from '@material-ui/core/Avatar';
import classNames from 'classnames';
import { UserContext } from 'src/reducers/user';
import {DesktopContext, handleProfilWindow, reduceProfil } from 'src/reducers/desktop';
import './window.scss';

const ProfilWindow = () => {
  const [ userState, userDispatch ] = useContext(UserContext);
  const [ state, dispatch ] = useContext(DesktopContext);
  const { isReduceProfil } = state;
  const { nickname } = userState;
  console.log(nickname);

  const handleProfil = () => {
    dispatch(handleProfilWindow());
  };

  const handleReduceProfil = () => {
    dispatch(reduceProfil());
  };

  const hidden = classNames('desktop-window', { 'desktop-window-hidden': isReduceProfil });

  return (
    <Draggable>
      <div className={hidden}>
        <div className="desktop-window-description">
          <h1 className="desktop-window-description-title">Panneau de profil</h1>
          <div className="desktop-window-description-icons">
            <RemoveIcon onClick ={handleReduceProfil} className="desktop-window-description-icons-icon" />
            <CloseIcon onClick={handleProfil} className="desktop-window-description-icons-icon" />
          </div>
        </div>
        <div className="desktop-window-container">
          <Avatar className="desktop-window-container-avatar"/>
          <h1 className="desktop-window-container-title">Mes informations</h1>
          <div className="desktop-window-container-infos">
            <p className="desktop-window-container-infos-nickname">pseudo: {nickname}</p>
            <input className="desktop-window-container-infos-update" type="button" value="Modifier"/>
          </div>
          <div className="desktop-window-container-infos">
            <p className="desktop-window-container-infos-password">mot-de-passe: *********</p>
            <input className="desktop-window-container-infos-update" type="button" value="Modifier"/>
          </div>
        </div>
      </div>
    </Draggable>
  );
};

export default ProfilWindow;