/* eslint-disable react/prop-types */
import React, { useReducer, createContext } from 'react';
import axios from 'axios';

export const UserContext = createContext();

const userInitialState = {
  nickname: null,
  token: null,
};

const LOGOUT = 'LOGOUT';
const GET_TOKEN = 'GET_TOKEN';
const GET_NICKNAME= 'GET_NICKNAME';

// eslint-disable-next-line import/prefer-default-export
export const addTokenToState = (currentToken) => ({
  type: GET_TOKEN,
  currentToken,
});

export const logout = () => ({
  type: LOGOUT,
});

export const getNickname = (currentNickname) => ({
  type: GET_NICKNAME,
  currentNickname,
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
    case GET_NICKNAME: 
      return { ...state, nickname: action.currentNickname }
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
