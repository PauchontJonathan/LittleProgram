import React, { useContext, useState, useEffect } from 'react';
import axios from 'axios';
import Draggable from 'react-draggable';
import RemoveIcon from '@material-ui/icons/Remove';
import CloseIcon from '@material-ui/icons/Close';
import Avatar from '@material-ui/core/Avatar';
import classNames from 'classnames';
import { UserContext, setNickname } from 'src/reducers/user';
import {DesktopContext, handleProfilWindow, reduceProfil, handleUpdateNickname, handleUpdatePassword, closeNicknameUpdate, closePasswordUpdate } from 'src/reducers/desktop';
import './window.scss';

const ProfilWindow = () => {

  const [ userState, userDispatch ] = useContext(UserContext);
  const [ state, dispatch ] = useContext(DesktopContext);
  const { isReduceProfil, isUpdateNickname, isUpdatePassword } = state;
  const { nickname, token } = userState;
  const [ newNickname, setNewNickname ] = useState('');
  const [ isErrorMessageNickname, setIsErrorMessageNickname] = useState(false);
  const [ nicknameError, setNicknameError ] = useState('');
  const [ isSuccessNickname, setIsSuccessNickname ] = useState(false);
  const [ successMessageNickname, setSuccessMessageNickname ] = useState('');
  const [ newPassword, setNewPassword ] = useState('');
  const [ isErrorMessagePassword, setIsErrorMessagePassword] = useState(false);
  const [ passwordError, setPasswordError ] = useState('');
  const [ isSuccessPassword, setIsSuccessPassword ] = useState(false);
  const [ successMessagePassword, setSuccessMessagePassword ] = useState('');
  const [ isReloadComponent, setIsReloadComponent ] = useState(false);

  useEffect(() => {
    axios.post('http://localhost:8000/api/v1/users/user', { token })
      .then((res) => {
        const currentNickname = res.data.nickname;
        userDispatch(setNickname(currentNickname));
      });
  }, [isReloadComponent]);

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
    setNewNickname('');
    setNicknameError('');
    setIsErrorMessageNickname(false);
    setSuccessMessageNickname('');
    setIsSuccessNickname(false);
  };

  const closePasswordForm = () => {
    dispatch(closePasswordUpdate());
    setNewPassword('');
    setPasswordError('');
    setIsErrorMessagePassword(false);
    setSuccessMessagePassword('');
    setIsSuccessPassword(false);
  };

  const handleNicknameSubmit = (evt) => {
    evt.preventDefault();
    axios.post('http://localhost:8000/api/v1/users/user/update/nickname', { token, nickname: newNickname })
      .then((res) => {
        const { message } = res.data;
        if (message !== null) {
          setNicknameError('');
          setIsErrorMessageNickname(false);
          setSuccessMessageNickname(message);
          setIsSuccessNickname(true);
          setIsReloadComponent(!isReloadComponent);
        }
      })
      .catch((err) => {
        const { message } = err.response.data.errorMessage.details[0];
        if (message !== null) {
          setNicknameError(message);
          setIsErrorMessageNickname(true);
        }
      });
  };

  const handlePasswordSubmit = (evt) => {
    evt.preventDefault();
    axios.post('http://localhost:8000/api/v1/users/user/update/password', { token, password: newPassword })
      .then((res) => {
        const { message } = res.data;
        if (message !== null) {
          setPasswordError('');
          setIsErrorMessagePassword(false);
          setSuccessMessagePassword(message);
          setIsSuccessPassword(true);
          setIsReloadComponent(!isReloadComponent);
        }
      })
      .catch((err) => {
        const { message } = err.response.data.errorMessage.details[0];
        if (message !== null) {
          setPasswordError(message);
          setIsErrorMessagePassword(true);
        }
      });
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
            <form method="post" className="desktop-window-container-infos" onSubmit={ handleNicknameSubmit }>
              <input type="text" className="desktop-window-container-infos-input" name="nickname" placeholder="pseudo" value={newNickname} onChange={handleNewNickname} />
              <input className="desktop-window-container-infos-close" type="button" value="retour" onClick={closeNicknameForm} />
              <input type="submit" className="desktop-window-container-infos-update" value="Valider"/>
              { isErrorMessageNickname && <p className="desktop-window-container-infos-error">{nicknameError}</p> }
              { isSuccessNickname && <p className="desktop-window-container-infos-success">{successMessageNickname}</p> }
            </form>
          )}
          { !isUpdatePassword && (
            <div className="desktop-window-container-infos">
              <p className="desktop-window-container-infos-password">Mot-de-passe: *********</p>
              <input className="desktop-window-container-infos-update" type="button" value="Modifier" onClick={handleFormPassword} />
            </div>
          )}
          { isUpdatePassword && (
            <form method="post" className="desktop-window-container-infos" onSubmit={ handlePasswordSubmit }>
              <input type="password" className="desktop-window-container-infos-input" name="password" placeholder="mot-de-passe" value={newPassword} onChange={handleNewPassword} />
              <input className="desktop-window-container-infos-close" type="button" value="retour" onClick={closePasswordForm} />
              <input type="submit" className="desktop-window-container-infos-update" value="Valider"/>
              { isErrorMessagePassword && <p className="desktop-window-container-infos-error">{passwordError}</p> }
              { isSuccessPassword && <p className="desktop-window-container-infos-success">{successMessagePassword}</p> }
            </form>
          )}
        </div>
      </div>
    </Draggable>
  );
};

export default ProfilWindow;