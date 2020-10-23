import React, { useEffect, useState, useContext } from 'react';
import UserMenu from 'src/components/Pages/Desktop/Taskbar/UserMenu';
import { DesktopContext, handleMenu, cleanMenu, reduceProfil, reduceApplications } from 'src/reducers/desktop';
import AccountBoxIcon from '@material-ui/icons/AccountBox';
import AppsIcon from '@material-ui/icons/Apps';
import MenuIcon from '@material-ui/icons/Menu';
import classNames from 'classnames';

const Taskbar = () => {
  const [ state, dispatch ] = useContext(DesktopContext);
  const { isOpenMenu, isOpenProfilWindow, isReduceProfil, isReduceApplications, isOpenApplications } = state;
  const hour = new Date().getHours();
  const minutes = new Date().getMinutes();
  const currentDate = `${hour}:${minutes}`;
  const [ count, setCount ] = useState(0);
  const [date, setDate ] = useState(currentDate);

  useEffect(() => {
    return () => {
      dispatch(cleanMenu());
      setDate(null);
      setCount(null);
    }
  }, [])

  useEffect(() => {
    setTimeout(() => {
      setCount(count + 1);
      setDate(currentDate);
    }, 1000);
  },[count])

  const openCloseMenu = () => {
    dispatch(handleMenu());
  };

  const handleProfilWindow = () => {
    dispatch(reduceProfil());
  };

  const handleApplicationsWindow = () => {
    dispatch(reduceApplications());
  };

  const isActiveProfil = classNames('desktop-taskbar-container-icons', {'desktop-taskbar-container-icons-active': !isReduceProfil});
  const isActiveApplications = classNames('desktop-taskbar-container-icons', {'desktop-taskbar-container-icons-active': !isReduceApplications});

  return (
    <div className="desktop-taskbar">
      {isOpenMenu && <UserMenu />}
      <div className="desktop-taskbar-user">
        <AppsIcon onClick={openCloseMenu} className="desktop-taskbar-user-icon" />
      </div>
      <div className="desktop-taskbar-container">
        { isOpenProfilWindow && <AccountBoxIcon onClick={handleProfilWindow} className={isActiveProfil} />}
        { isOpenApplications && <MenuIcon onClick={handleApplicationsWindow} className={isActiveApplications} /> }
      </div>
      <div className="desktop-taskbar-date">
        <p className="desktop-taskbar-date-hour">{date}</p>
      </div>
    </div>
  );
};

export default Taskbar;