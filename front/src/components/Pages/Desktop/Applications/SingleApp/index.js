import React, { useContext } from 'react';
import axios from 'axios';
import { DesktopContext, handleCalculatorWindow, activeCalculator, handleMessengerWindow, activeMessenger } from 'src/reducers/desktop';
import { UserContext, setUserInfos } from 'src/reducers/user';

const SingleApp = () => {
  const [ userState, userDispatch ] = useContext(UserContext);
  const { token } = userState;
  const [ state , desktopDispatch ] = useContext(DesktopContext);
  const handleCalculator = () => {
    desktopDispatch(handleCalculatorWindow());
    desktopDispatch(activeCalculator());
  };

  const handleMessenger = () => {
    axios.post('http://localhost:8000/api/v1/users/user', { token })
      .then((res) => {
        const currentNickname = res.data.nickname;
        const currentAvatar = res.data.avatar;
        userDispatch(setUserInfos(currentNickname, currentAvatar));
      });
    desktopDispatch(handleMessengerWindow());
    desktopDispatch(activeMessenger());
  };

  return (
    <div className="applications-list">
      <div className="applications-single" onClick={ handleCalculator }>
        <img src="src/assets/img/Calculator_30001.png" alt="calculatrice"/>
        <p>Calculatrice</p>
      </div>
      <div className="applications-single" onClick={ handleMessenger }>
        <img src="src/assets/img/chat.png" alt="chat"/>
        <p>little-messenger</p>
      </div>
    </div>
  )
};

export default SingleApp;
