import React from 'react';
import PropTypes from 'prop-types';
import Avatar from '@material-ui/core/Avatar';

const UserListMessenger = ({ id, nickname }) => {
  return (
    <div className="messenger-logged-users-container" key={id}>
      <Avatar className="messenger-logged-users-container-avatar" />
      <div className="messenger-logged-users-container-connected"/>
      <p className="messenger-logged-users-container-nickname">{nickname}</p>
    </div>
  )
}

export default UserListMessenger;

UserListMessenger.propTypes = {
  id: PropTypes.number.isRequired,
  nickname: PropTypes.string.isRequired,
}