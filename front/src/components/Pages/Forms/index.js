/* eslint-disable no-unused-vars */
import React, { useState, useContext } from 'react';
import { UserContext, addTokenToState } from 'src/reducers/user';
import axios from 'axios';
import './forms.scss';


const Forms = () => {
  const [state, dispatch] = useContext(UserContext);
  const [openRegister, setOpenRegister] = useState(false);
  const [emptyValues, setEmptyValue] = useState(false);
  const [nicknameLoginValue, setNicknameLoginValue] = useState('');
  const [passwordLoginValue, setPasswordLoginValue] = useState('');
  const [nicknameRegisterValue, setNicknameRegisterValue] = useState('');
  const [passwordRegisterValue, setPasswordRegisterValue] = useState('');
  const [passwordConfirmBoolean, setPasswordConfirmBoolean] = useState(false);
  const [errorMessageBoolean, setErrorMessageBoolean] = useState(false);
  const [successRegisterMessageBoolean, setSuccessRegisterMessageBoolean] = useState(false);
  const [successRegisterMessage, setSuccessRegisterMessage] = useState('');
  const [errorMessage, setErrorMessage] = useState('');
  const [passwordVerify, setPasswordVerify] = useState('');

  const handleWindow = () => {
    setOpenRegister(!openRegister);
    setEmptyValue(false);
    setPasswordConfirmBoolean(false);
    setErrorMessageBoolean(false);
    setSuccessRegisterMessageBoolean(false);
    setNicknameRegisterValue('');
    setPasswordRegisterValue('');
    setPasswordVerify('');
  };

  // handle nickname value on Change for login
  const handleNicknameLogin = (evt) => {
    const currentNickname = evt.target.value;
    setNicknameLoginValue(currentNickname);
  };

  // handle password value on Change for login
  const handlePasswordlogin = (evt) => {
    const currentPassword = evt.target.value;
    setPasswordLoginValue(currentPassword);
  };

  // handle nickname value on Change for register
  const handleNicknameRegister = (evt) => {
    const newNickname = evt.target.value;
    setNicknameRegisterValue(newNickname);
  };

  // handle password value on Change for register
  const handlePasswordRegister = (evt) => {
    const newPassword = evt.target.value;
    setPasswordRegisterValue(newPassword);
  };

  // handle confirmed password on Change for register
  const handlePasswordVerify = (evt) => {
    const passwordConfirm = evt.target.value;
    setPasswordVerify(passwordConfirm);
  };

  const handleLoginSubmit = (evt) => {
    evt.preventDefault();
    if (nicknameLoginValue === '' || passwordLoginValue === '') {
      setEmptyValue(true);
    }
    else {
      setEmptyValue(false);
      axios.post('http://localhost:8000/api/v1/users/login', { nickname: nicknameLoginValue, password: passwordLoginValue })
        .then((res) => {
          setErrorMessageBoolean(false);
          setErrorMessage('');
          setNicknameLoginValue('');
          setPasswordLoginValue('');
          const { token } = res.data;
          const isTokenInLocal = localStorage.getItem('token');
          if (!isTokenInLocal) {
            dispatch(addTokenToState(token));
          }
        })
        .catch((err) => {
          const { message } = err.response.data.errorMessage.details[0];
          if (message !== null) {
            setErrorMessageBoolean(true);
            setErrorMessage(message);
          }
        });
    }
  };
  // Register form submit and verify
  const handleRegisterSubmit = (evt) => {
    evt.preventDefault();
    if (nicknameRegisterValue === '' || passwordRegisterValue === '' || passwordVerify === '') {
      setEmptyValue(true);
    }
    else if (passwordVerify !== passwordRegisterValue) {
      setPasswordConfirmBoolean(true);
    }
    else {
      setEmptyValue(false);
      setPasswordConfirmBoolean(false);
      axios.post('http://localhost:8000/api/v1/users/register', { nickname: nicknameRegisterValue, password: passwordRegisterValue })
        .then((res) => {
          const { message } = res.data;
          setPasswordConfirmBoolean(false);
          setErrorMessageBoolean(false);
          setErrorMessage('');
          setNicknameRegisterValue('');
          setPasswordRegisterValue('');
          setPasswordVerify('');
          setSuccessRegisterMessageBoolean(true);
          setSuccessRegisterMessage(message);
        }).catch((err) => {
          const { message } = err.response.data.errorMessage.details[0];
          if (message !== null) {
            setErrorMessageBoolean(true);
            setErrorMessage(message);
          }
        });
    }
  };

  return (
    <div className="forms">
      <h1 className="forms-title">LittleProgram</h1>
      { !openRegister
        && (
        <form className="forms-form" method="post" onSubmit={handleLoginSubmit}>
          <a className="forms-form-register" onClick={handleWindow}>s'enregistrer</a>
          <h2 className="forms-form-title">connexion</h2>
          <input className="forms-form-input" type="text" name="nickname" placeholder="pseudo" onChange={handleNicknameLogin} value={nicknameLoginValue} />
          <p className="forms-form-description">Le pseudo doit contenir au minimum 4 caractères</p>
          <input className="forms-form-input" type="password" name="password" placeholder="mot-de-passe" onChange={handlePasswordlogin} value={passwordLoginValue} />
          <p className="forms-form-description">Le mot-de-passe doit contenir au minimum 5 caractères</p>
          <input className="forms-form-input-password" type="submit" value="se connecter" />
          {emptyValues && <p className="forms-form-verification">Veuillez remplir tous les champs !</p>}
          {errorMessageBoolean && <p className="forms-form-verification">{errorMessage}</p>}
        </form>
        )}
      { openRegister
        && (
          <form className="forms-form" method="post" onSubmit={handleRegisterSubmit}>
            <a className="forms-form-register" onClick={handleWindow}>se connecter</a>
            <h2 className="forms-form-title">enregistrement</h2>
            <input className="forms-form-input" type="text" name="nickname" onChange={handleNicknameRegister} value={nicknameRegisterValue} placeholder="pseudo" />
            <p className="forms-form-description">Le pseudo doit contenir au minimum 4 caractères</p>
            <input className="forms-form-input" type="password" name="password" onChange={handlePasswordRegister} value={passwordRegisterValue} placeholder="mot-de-passe" />
            <p className="forms-form-description">Le mot-de-passe doit contenir au minimum 5 caractères</p>
            <input className="forms-form-input" type="password" name="passwordVerify" onChange={handlePasswordVerify} value={passwordVerify} placeholder="Confirmation de mot-de-passe" />
            <input className="forms-form-input-password" type="submit" value="s'enregistrer" />
            {passwordConfirmBoolean && <p className="forms-form-verification">Les mots de passes ne sont pas identiques !</p>}
            {emptyValues && <p className="forms-form-verification">Veuillez remplir tous les champs !</p>}
            {errorMessageBoolean && <p className="forms-form-verification">{errorMessage}</p>}
            {successRegisterMessageBoolean && <p className="forms-form-success">{successRegisterMessage}</p>}
          </form>
        )}
    </div>
  );
};

export default Forms;
