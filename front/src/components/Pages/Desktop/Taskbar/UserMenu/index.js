import React, { useContext } from 'react';
import AccountCircleIcon from '@material-ui/icons/AccountCircle';
import PowerSettingsNewIcon from '@material-ui/icons/PowerSettingsNew';
import { UserContext, logout } from 'src/reducers/user';

import './usermenu.scss';

const UserMenu = () => {
  const [state, dispatch ] = useContext(UserContext);

  const handleLogout = () => {
    dispatch(logout());
  }; 
  return (
    <div className="desktop-taskbar-usermenu">
      <AccountCircleIcon className="desktop-taskbar-usermenu-icons"/>
      <PowerSettingsNewIcon onClick={handleLogout} className="desktop-taskbar-usermenu-icons"/>
    </div>
  );
};

export default UserMenu;