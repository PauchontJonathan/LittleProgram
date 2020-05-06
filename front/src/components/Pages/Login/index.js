import React, { useState } from 'react';
import './login.scss';


const Login = () => {

  const [openRegister, setOpenRegister] = useState(false);

  const handleWindow = () => {
    setOpenRegister(!openRegister);
  };

  return (
    <div className="login">
      <h1 className="login-title">LittleProgram</h1>
      <form className="login-form" method="post">
        { !openRegister &&
        <>
          <a className="login-form-register" onClick={handleWindow}>s'enregistrer</a>
          <h2 className="login-form-title">connexion</h2>
          <input className="login-form-input" type="text" name="nickname" placeholder="pseudo"></input>
          <input className="login-form-input" type="password" name="password" placeholder="mot-de-passe"></input>
          <input className="login-form-input-password" type="submit" value="se connecter"></input>
        </>
        }
        { openRegister &&
        <>
          <a className="login-form-register" onClick={handleWindow}>se connecter</a>
          <h2 className="login-form-title">enregistrement</h2>
          <input className="login-form-input" type="text" name="nickname" placeholder="pseudo"></input>
          <input className="login-form-input" type="password" name="password" placeholder="mot-de-passe"></input>
          <input className="login-form-input-password" type="submit" value="s'enregistrer"></input>
        </>
        }
      </form>
    </div>
  );
}

export default Login;