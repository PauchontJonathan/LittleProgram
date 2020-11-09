import React, { useContext } from 'react';
import classNames from 'classnames';
import Draggable from 'react-draggable';
import RemoveIcon from '@material-ui/icons/Remove';
import CloseIcon from '@material-ui/icons/Close';
import SingleApp from 'src/components/Pages/Desktop/Applications/SingleApp';
import { DesktopContext, handleApplicationsWindow, reduceApplications, activeApplications } from 'src/reducers/desktop';

import './applications.scss';

const Applications = () => {

  const [ desktopState, desktopDispatch ] = useContext(DesktopContext);
  const { isReduceApplications, isActiveApplications } = desktopState;

  const handleApplicationsWindowOnClick = () => {
    desktopDispatch(handleApplicationsWindow());
  };

  const handleApplicationsReducerOnClick = () => {
    desktopDispatch(reduceApplications());
  };

  const handleActiveDisplay = () => {
    desktopDispatch(activeApplications());
  };

  const handleDisplay = classNames('applications', { 'applications-hidden': isReduceApplications }, { 'applications-active': isActiveApplications });

  return (
    <Draggable onStart={handleActiveDisplay}>
      <div className={handleDisplay} onClick={handleActiveDisplay}>
        <div className="window-description">
          <h1 className="window-description-title">Panneau d'applications</h1>
          <div className="window-description-icons">
            <RemoveIcon onClick={handleApplicationsReducerOnClick} className="window-description-icons-icon" />
            <CloseIcon onClick={handleApplicationsWindowOnClick} className="window-description-icons-icon" />
          </div>
        </div>
        <SingleApp />
      </div>
    </Draggable>
  )
}

export default Applications;