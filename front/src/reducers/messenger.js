/* eslint-disable react/prop-types */
import React, { useReducer, createContext } from 'react';

export const MessengerContext = createContext();

const messengerInitialState = {
  isLoggedUser: true,
  messages: [],
  singleMessageValueInput: '',
  isMessageSend: false,
};

const LOG_USER = 'LOG_USER';
const LOG_OUT_USER = 'LOG_OUT_USER';
const GET_ALL_MESSAGES = 'GET_ALL_MESSAGES';
const SET_MESSAGE_INPUT_VALUE = 'SET_MESSAGE_INPUT_VALUE';
const MESSAGE_SENT = 'MESSAGE_SENT';
const CLEAR_MESSAGE_INPUT = 'CLEAR_MESSAGE_INPUT';

export const logUser = () => ({
  type: LOG_USER,
});

export const logOutUser = () => ({
  type: LOG_OUT_USER,
});

export const getAllMessages = (allMessages) => ({
  type: GET_ALL_MESSAGES,
  allMessages,
});

export const setSingleMessage = (currentSingleMessage) => ({
  type: SET_MESSAGE_INPUT_VALUE,
  currentSingleMessage,
});

export const setIsMessageSend = () => ({
  type: MESSAGE_SENT,
});

export const clearMessageInput = () => ({
  type: CLEAR_MESSAGE_INPUT,
})
 
const messengerReducer = (state, actions) => {
  switch (actions.type) {
    case LOG_USER:
      return { ...state, isLoggedUser: true };
    case LOG_OUT_USER:
      return { ...state, isLoggedUser: false };
    case GET_ALL_MESSAGES:
      return { ...state, messages: actions.allMessages }
    case SET_MESSAGE_INPUT_VALUE:
      return { ...state, singleMessageValueInput: actions.currentSingleMessage }
    case MESSAGE_SENT:
      return { ...state, isMessageSend: !state.isMessageSend }
    case CLEAR_MESSAGE_INPUT:
      return { ...state, singleMessageValueInput: '' }
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