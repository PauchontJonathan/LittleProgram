/* eslint-disable react/prop-types */
import React, { useReducer, createContext } from 'react';

export const UserContext = createContext();

const userInitialState = {
  nickname: null,
  token: null,
};

const GET_TOKEN = 'GET_TOKEN';

// eslint-disable-next-line import/prefer-default-export
export const addTokenToState = (currentToken) => ({
  type: GET_TOKEN,
  currentToken,
});

const userReducer = (state, action) => {
  switch (action.type) {
    case GET_TOKEN: 
      return {...state, token: action.currentToken};
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
