import React, { useEffect, useState, useContext } from 'react';
import UserMenu from 'src/components/Pages/Desktop/Taskbar/UserMenu';
import { DesktopContext, handleMenu, cleanMenu, reduceProfil, reduceApplications, reduceCalculator, reduceMessenger } from 'src/reducers/desktop';
import AccountBoxIcon from '@material-ui/icons/AccountBox';
import AppsIcon from '@material-ui/icons/Apps';
import MenuIcon from '@material-ui/icons/Menu';
import classNames from 'classnames';

const Taskbar = () => {
  const [ state, dispatch ] = useContext(DesktopContext);
  const {
    isOpenMenu,
    isOpenProfilWindow,
    isReduceProfil,
    isReduceApplications,
    isOpenApplications,
    isReduceCalculator,
    isOpenCalculator,
    isOpenMessenger,
    isReduceMessenger,
  } = state;
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

  const handleCalculatorWindow = () => {
    dispatch(reduceCalculator());
  };
  
  const handleMessengerWindow = () => {
    dispatch(reduceMessenger());
  };

  const isActiveProfil = classNames('desktop-taskbar-container-icons', {'desktop-taskbar-container-icons-active': !isReduceProfil});
  const isActiveApplications = classNames('desktop-taskbar-container-icons', {'desktop-taskbar-container-icons-active': !isReduceApplications});
  const isActiveCalculator = classNames('desktop-taskbar-container-icons', {'desktop-taskbar-container-icons-active': !isReduceCalculator});
  const isActiveMessenger = classNames('desktop-taskbar-container-icons', {'desktop-taskbar-container-icons-active': !isReduceMessenger});

  return (
    <div className="desktop-taskbar">
      {isOpenMenu && <UserMenu />}
      <div className="desktop-taskbar-user">
        <AppsIcon onClick={openCloseMenu} className="desktop-taskbar-user-icon" />
      </div>
      <div className="desktop-taskbar-container">
        { isOpenProfilWindow && <AccountBoxIcon onClick={handleProfilWindow} className={isActiveProfil} />}
        { isOpenApplications && <MenuIcon onClick={handleApplicationsWindow} className={isActiveApplications} /> }
        { isOpenCalculator && <img src="src/assets/img/Calculator_30001.png" onClick={handleCalculatorWindow} className={isActiveCalculator} alt="calculator-icon" /> }
        { isOpenMessenger && <img src="src/assets/img/chat.png" onClick={handleMessengerWindow} className={isActiveMessenger} alt="messenger-icon" /> }
      </div>
      <div className="desktop-taskbar-date">
        <p className="desktop-taskbar-date-hour">{date}</p>
      </div>
    </div>
  );
};

export default Taskbar;