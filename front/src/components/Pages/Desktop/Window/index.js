import React from 'react';
import Draggable from 'react-draggable';
import RemoveIcon from '@material-ui/icons/Remove';
import AddIcon from '@material-ui/icons/Add';
import CloseIcon from '@material-ui/icons/Close';
import './window.scss';

const Window = () => {
  return (
    <Draggable>
      <div className="desktop-window">
        <div className="desktop-window-description">
          <h1 className="desktop-window-description-title">Panneau de profil</h1>
          <div className="desktop-window-description-icons">
            <RemoveIcon className="desktop-window-description-icons-icon" />
            <AddIcon className="desktop-window-description-icons-icon" />
            <CloseIcon className="desktop-window-description-icons-icon" />
          </div>
        </div>
      </div>
    </Draggable>
  );
};

export default Window;