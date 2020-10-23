import React, { useContext } from 'react';
import classNames from 'classnames';
import Draggable from 'react-draggable';
import RemoveIcon from '@material-ui/icons/Remove';
import CloseIcon from '@material-ui/icons/Close';
import { DesktopContext, handleApplicationsWindow, reduceApplications } from 'src/reducers/desktop';

import './applications.scss';

const Applications = () => {

  const [ desktopState, desktopDispatch ] = useContext(DesktopContext);
  const { isReduceApplications } = desktopState;

  const handleApplicationsWindowOnClick = () => {
    desktopDispatch(handleApplicationsWindow());
  };

  const handleApplicationsReducerOnClick = () => {
    desktopDispatch(reduceApplications());
  };

  const hidden = classNames('applications', { 'applications-hidden': isReduceApplications })

  return (
    <Draggable>
      <div className={hidden}>
        <div className="window-description">
          <h1 className="window-description-title">Panneau d'applications</h1>
          <div className="window-description-icons">
            <RemoveIcon onClick={handleApplicationsReducerOnClick} className="window-description-icons-icon" />
            <CloseIcon onClick={handleApplicationsWindowOnClick} className="window-description-icons-icon" />
          </div>
        </div>
      </div>
    </Draggable>
  )
}

export default Applications;