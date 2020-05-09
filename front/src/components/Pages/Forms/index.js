import React, { useState } from 'react';
import axios from 'axios';
import './forms.scss';


const Forms = () => {
  const [openRegister, setOpenRegister] = useState(false);
  const [emptyValues, setEmptyValue] = useState(false);
  const [nicknameRegisterValue, setNicknameRegisterValue] = useState('');
  const [passwordRegisterValue, setPasswordRegisterValue] = useState('');
  const [passwordConfirmBoolean, setPasswordConfirmBoolean ] = useState(false);
  const [passwordVerify, setPasswordVerify ] = useState('');

  const handleWindow = () => {
    setOpenRegister(!openRegister);
    setEmptyValue(false);
    setPasswordConfirmBoolean(false);
  };

  const handleNicknameRegister = (evt) => {
    const newNickname = evt.target.value;
    setNicknameRegisterValue(newNickname);
  };

  const handlePasswordRegister = (evt) => {
    const newPassword = evt.target.value;
    setPasswordRegisterValue(newPassword);
  };

  const handlePasswordVerify = (evt) => {
    const passwordConfirm = evt.target.value;
    setPasswordVerify(passwordConfirm);
  };

  const handleRegisterSubmit = (evt) => {
    evt.preventDefault();
    if (nicknameRegisterValue === '' || passwordRegisterValue === '' || passwordVerify === '' ) {
      setEmptyValue(true);
    } else if (passwordVerify !== passwordRegisterValue) {
      setPasswordConfirmBoolean(true);
    } else {
      setEmptyValue(false);
      setPasswordConfirmBoolean(false);
      console.log(nicknameRegisterValue);
      console.log(passwordRegisterValue);
      axios.post('http://localhost:8000/api/v1/users/register', { nickname: nicknameRegisterValue, password: passwordRegisterValue })
        .then(res => {
          console.log(res);
        }).catch(err => {
          console.log(err.response.data);
        });
    }
  };

  return (
    <div className="forms">
      <h1 className="forms-title">LittleProgram</h1>
      { !openRegister
        && (
        <form className="forms-form" method="post">
          <a className="forms-form-register" onClick={handleWindow}>s'enregistrer</a>
          <h2 className="forms-form-title">connexion</h2>
          <input className="forms-form-input" type="text" name="nickname" placeholder="pseudo" />
          <input className="forms-form-input" type="password" name="password" placeholder="mot-de-passe" />
          <input className="forms-form-input-password" type="submit" value="se connecter" />
        </form>
        )}
      { openRegister
        && (
          <form className="forms-form" method="post" onSubmit={handleRegisterSubmit}>
            <a className="forms-form-register" onClick={handleWindow}>se connecter</a>
            <h2 className="forms-form-title">enregistrement</h2>
            <input className="forms-form-input" type="text" name="nickname" onChange={handleNicknameRegister} value={nicknameRegisterValue} placeholder="pseudo" />
            <input className="forms-form-input" type="password" name="password" onChange={handlePasswordRegister} value={passwordRegisterValue} placeholder="mot-de-passe" />
            <input className="forms-form-input" type="password" name="passwordVerify" onChange={handlePasswordVerify} value={passwordVerify} placeholder="Confirmation de mot-de-passe" />
            <input className="forms-form-input-password" type="submit" value="s'enregistrer" />
            {passwordConfirmBoolean && <p className="forms-form-verification">Les mots de passes ne sont pas identiques !</p>}
            {emptyValues && <p className="forms-form-verification">Veuillez remplir tous les champs !</p>}
          </form>
        )}
    </div>
  );
};

export default Forms;
