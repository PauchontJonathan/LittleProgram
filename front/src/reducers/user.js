/* eslint-disable react/prop-types */
import React, { useReducer, createContext } from 'react';

export const UserContext = createContext();

const userInitialState = {
  nickname: null,
  token: null,
  file: null,
  avatar: '',
};

const LOGOUT = 'LOGOUT';
const GET_TOKEN = 'GET_TOKEN';
const SET_USER_INFOS= 'SET_USER_INFOS';
const SET_FILE = 'SET_FILE';
const SET_AVATAR = 'SET_AVATAR';

// eslint-disable-next-line import/prefer-default-export
export const addTokenToState = (currentToken) => ({
  type: GET_TOKEN,
  currentToken,
});

export const logout = () => ({
  type: LOGOUT,
});

export const setUserInfos = (currentNickname, currentAvatar) => ({
  type: SET_USER_INFOS,
  currentNickname,
  currentAvatar,
});

export const setFile = (currentFile) => ({
  type: SET_FILE,
  currentFile,
});

export const setAvatar = (currentAvatar) => ({
  type: SET_AVATAR,
  currentAvatar,
});

const userReducer = (state, action) => {
  switch (action.type) {
    case GET_TOKEN: {
      localStorage.setItem('token', action.currentToken);
      const newToken = localStorage.getItem('token');
      return {...state, token: newToken};
    }
    case LOGOUT: {
      localStorage.clear();
      const tokenState = localStorage.getItem('token');
      return { ...state, token: tokenState, nickname: null };
    }
    case SET_USER_INFOS:
      return { ...state, nickname: action.currentNickname, avatar: action.currentAvatar };
    case SET_FILE:
      return { ...state, file: action.currentFile };
    case SET_AVATAR:
      return { ...state, avatar: action.currentAvatar };
    default:
      return state;
  }
};

export const UserProvider = (props) => {
  const [state, dispatch] = useReducer(userReducer, userInitialState )
  const { children } = props;
  return (
    <UserContext.Provider value={ [state, dispatch] }>
      {children}
    </UserContext.Provider>
  )
}
