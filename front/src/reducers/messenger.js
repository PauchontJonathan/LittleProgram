/* eslint-disable react/prop-types */
import React, { useReducer, createContext } from 'react';

export const MessengerContext = createContext();

const messengerInitialState = {
  isLoggedUser: true,
};

const LOG_USER = 'LOG_USER';
const LOG_OUT_USER = 'LOG_OUT_USER';

export const logUser = () => ({
  type: LOG_USER,
});

export const logOutUser = () => ({
  type: LOG_OUT_USER,
});
 
const messengerReducer = (state, actions) => {
  switch (actions.type) {
    case LOG_USER:
      return { ...state, isLoggedUser: true };
    case LOG_OUT_USER:
      return { ...state, isLoggedUser: false };
    default:
      return state;
  }
};

export const MessengerProvider = (props) => {
  const [state, dispatch] = useReducer(messengerReducer, messengerInitialState)
  const { children } = props;
  return (
    <MessengerContext.Provider value={ [state, dispatch] }>
      {children}
    </MessengerContext.Provider>
  )
}