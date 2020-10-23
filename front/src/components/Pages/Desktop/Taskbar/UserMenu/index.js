import React, { useContext } from 'react';
import axios from 'axios';
import AccountCircleIcon from '@material-ui/icons/AccountCircle';
import PowerSettingsNewIcon from '@material-ui/icons/PowerSettingsNew';
import { DesktopContext, handleProfilWindow, closeProfilReducer } from 'src/reducers/desktop';
import { UserContext, logout, setUserInfos } from 'src/reducers/user';

import './usermenu.scss';

const UserMenu = () => {
  const [state, dispatch ] = useContext(UserContext);
  const [windowState, windowDispatch ] = useContext(DesktopContext);
  const { isReduceProfil } = windowState;

  const handleLogout = () => {
    dispatch(logout());
  };

  const handleProfilWindowOnClick = () => {
    const { token } = state;
    axios.post('http://localhost:8000/api/v1/users/user', { token })
      .then((res) => {
        const { nickname, avatar } = res.data;
        dispatch(setUserInfos(nickname, avatar));
      });
    windowDispatch(handleProfilWindow());
    if (isReduceProfil === true) {
      windowDispatch(closeProfilReducer());
    }
  };

  return (
    <div className="desktop-taskbar-usermenu">
      <AccountCircleIcon onClick={handleProfilWindowOnClick} className="desktop-taskbar-usermenu-icons"/>
      <PowerSettingsNewIcon onClick={handleLogout} className="desktop-taskbar-usermenu-icons"/>
    </div>
  );
};

export default UserMenu;