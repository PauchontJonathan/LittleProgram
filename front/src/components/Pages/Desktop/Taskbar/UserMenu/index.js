import React, { useContext } from 'react';
import AccountCircleIcon from '@material-ui/icons/AccountCircle';
import PowerSettingsNewIcon from '@material-ui/icons/PowerSettingsNew';
import { DesktopContext, handleWindow } from 'src/reducers/desktop';
import { UserContext, logout } from 'src/reducers/user';

import './usermenu.scss';

const UserMenu = () => {
  const [state, dispatch ] = useContext(UserContext);
  const [windowState, windowDispatch ] = useContext(DesktopContext);

  const handleLogout = () => {
    dispatch(logout());
  };

  const handleWindowOnClick = () => {
    windowDispatch(handleWindow());
  };

  return (
    <div className="desktop-taskbar-usermenu">
      <AccountCircleIcon onClick={handleWindowOnClick} className="desktop-taskbar-usermenu-icons"/>
      <PowerSettingsNewIcon onClick={handleLogout} className="desktop-taskbar-usermenu-icons"/>
    </div>
  );
};

export default UserMenu;