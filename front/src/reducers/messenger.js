/* eslint-disable react/prop-types */
import React, { useReducer, createContext } from 'react';

export const MessengerContext = createContext();

const messengerInitialState = {
  isUserListLoad: false,
  userList: [],
  isLoggedUser: false,
  isLoggedUserMessage: '',
  isSessionActive: false,
  currentSessionId: null,
  messages: [],
  singleMessageValueInput: '',
  isMessageSend: false,
  isSocketConnectedUser: false,
};

const LOG_USER = 'LOG_USER';
const LOG_OUT_USER = 'LOG_OUT_USER';
const GET_ALL_MESSAGES = 'GET_ALL_MESSAGES';
const SET_MESSAGE_INPUT_VALUE = 'SET_MESSAGE_INPUT_VALUE';
const MESSAGE_SENT = 'MESSAGE_SENT';
const CLEAR_MESSAGE_INPUT = 'CLEAR_MESSAGE_INPUT';
const SET_ISLOGGED_MESSAGE = 'SET_ISLOGGED_MESSAGE';
const VERIFY_SESSION = 'VERIFY_SESSION';
const SET_SESSION_ID = 'SET_SESSION_ID';
const CLEAN_SESSION_ID = 'CLEAN_SESSION_ID';
const GET_USER_LIST = 'GET_USER_LIST';
const SET_USER_LIST_LOAD = 'SET_USER_LIST_LOAD';
const SET_SOCKET_MESSAGE_TO_MESSAGES = 'SET_SOCKET_MESSAGE_TO_MESSAGES';
const HANDLE_IS_SOCKET_CONNECTED_USER = 'HANDLE_IS_SOCKET_CONNECTED_USER';
const CLEAR_USERS_LIST = 'CLEAR_USERS_LIST';

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
});

export const setIsLoggedMessage = (currentMessage) => ({
  type: SET_ISLOGGED_MESSAGE,
  currentMessage,
});

export const verifySession = () => ({
  type: VERIFY_SESSION,
});

export const setSessionId = (currentSessionIdValue) => ({
  type: SET_SESSION_ID,
  currentSessionIdValue,
});

export const cleanSessionId = () => ({
  type: CLEAN_SESSION_ID,
});

export const getUserList = (currentUserList) => ({
  type: GET_USER_LIST,
  currentUserList,
});

export const clearUserList = () => ({
  type: CLEAR_USERS_LIST,
})

export const setUserListLoad = () => ({
  type: SET_USER_LIST_LOAD,
});

export const setSocketMessageToMessages = (socketMessage) => ({
  type: SET_SOCKET_MESSAGE_TO_MESSAGES,
  socketMessage,
})

export const handleIsSocketConnectedUser = (currentSocketConnectedUser) => ({
  type: HANDLE_IS_SOCKET_CONNECTED_USER,
  currentSocketConnectedUser,
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
    case SET_ISLOGGED_MESSAGE:
      return { ...state, isLoggedUserMessage: actions.currentMessage }
    case VERIFY_SESSION:
      return { ...state, isSessionActive: !state.isSessionActive }
    case SET_SESSION_ID:
      return { ...state, currentSessionId: actions.currentSessionIdValue }
    case CLEAN_SESSION_ID:
      return { ...state, currentSessionId: null }
    case GET_USER_LIST:
      return { ...state, userList: actions.currentUserList }
    case CLEAR_USERS_LIST:
      return { ...state, userList: [] }
    case SET_USER_LIST_LOAD:
      return { ...state, isUserListLoad: true }
    case SET_SOCKET_MESSAGE_TO_MESSAGES:
      return { ...state, messages: [...state.messages, actions.socketMessage] }
    case HANDLE_IS_SOCKET_CONNECTED_USER:
      return { ...state, isSocketConnectedUser: actions.currentSocketConnectedUser === state.isSocketConnectedUser ? !actions.currentSocketConnectedUser : actions.currentSocketConnectedUser}
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