import React, { useContext, useState } from 'react';
import Draggable from 'react-draggable';
import RemoveIcon from '@material-ui/icons/Remove';
import CloseIcon from '@material-ui/icons/Close';
import Avatar from '@material-ui/core/Avatar';
import classNames from 'classnames';
import { UserContext } from 'src/reducers/user';
import {DesktopContext, handleProfilWindow, reduceProfil, handleUpdateNickname, handleUpdatePassword, closeNicknameUpdate, closePasswordUpdate } from 'src/reducers/desktop';
import './window.scss';

const ProfilWindow = () => {
  const [ userState, userDispatch ] = useContext(UserContext);
  const [ state, dispatch ] = useContext(DesktopContext);
  const { isReduceProfil, isUpdateNickname, isUpdatePassword } = state;
  const { nickname } = userState;
  const [ newNickname, setNewNickname ] = useState('');
  const [ newPassword, setNewPassword ] = useState('');

  const handleProfil = () => {
    dispatch(handleProfilWindow());
  };

  const handleReduceProfil = () => {
    dispatch(reduceProfil());
  };

  const handleFormNickname = () => {
    dispatch(handleUpdateNickname());
  };

  const handleFormPassword = () => {
    dispatch(handleUpdatePassword());
  };

  const handleNewNickname = (evt) => {
    const currentNickname = evt.target.value;
    setNewNickname(currentNickname);
  };

  const handleNewPassword = (evt) => {
    const currentPassword = evt.target.value;
    setNewPassword(currentPassword);
  };

  const closeNicknameForm = () => {
    dispatch(closeNicknameUpdate());
  };

  const closePasswordForm = () => {
    dispatch(closePasswordUpdate());
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
          { !isUpdateNickname && (
            <>
              <div className="desktop-window-container-infos">
                <p className="desktop-window-container-infos-nickname">Pseudo: {nickname}</p>
                <input className="desktop-window-container-infos-update" type="button" value="Modifier" onClick={handleFormNickname} />
              </div>
            </>
          )}
          { isUpdateNickname && (
            <form method="post" className="desktop-window-container-infos">
              <input type="text" className="desktop-window-container-infos-input" name="nickname" placeholder="pseudo" value={newNickname} onChange={handleNewNickname} />
              <input className="desktop-window-container-infos-close" type="button" value="annuler" onClick={closeNicknameForm} />
              <input type="submit" className="desktop-window-container-infos-update" value="Valider"/>
            </form>
          )}
          { !isUpdatePassword && (
            <div className="desktop-window-container-infos">
              <p className="desktop-window-container-infos-password">Mot-de-passe: *********</p>
              <input className="desktop-window-container-infos-update" type="button" value="Modifier" onClick={handleFormPassword} />
            </div>
          )}
          { isUpdatePassword && (
            <form method="post" className="desktop-window-container-infos">
              <input type="text" className="desktop-window-container-infos-input" name="password" placeholder="mot-de-passe" value={newPassword} onChange={handleNewPassword} />
              <input className="desktop-window-container-infos-close" type="button" value="annuler" onClick={closePasswordForm} />
              <input type="submit" className="desktop-window-container-infos-update" value="Valider"/>
            </form>
          )}
        </div>
      </div>
    </Draggable>
  );
};

export default ProfilWindow;