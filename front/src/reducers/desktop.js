/* eslint-disable react/prop-types */
import React, { useReducer, createContext } from 'react';

export const DesktopContext = createContext();

const desktopInitialState = {
  isOpenProfilWindow: false,
  isOpenMenu: false,
  isReduceProfil: false,
  isUpdateNickname: false,
  isUpdatePassword: false,
};

const HANDLE_MENU = 'HANDLE_MENU';
const CLOSE_MENU = 'CLOSE_MENU';
const HANDLE_PROFIL_WINDOW = 'HANDLE_WINDOW';
const REDUCE_PROFIL = 'REDUCE_PROFIL';
const CLOSE_PROFIL_REDUCER = 'CLOSE_PROFIL_REDUCER';
const HANDLE_UPDATE_NICKNAME = 'HANDLE_UPDATE_NICKNAME';
const CLOSE_NICKNAME_UPDATE = 'CLOSE_NICKNAME_FORM';
const HANDLE_UPDATE_PASSWORD = 'HANDLE_UPDATE_PASSWORD';
const CLOSE_PASSWORD_UPDATE = 'CLOSE_PASSWORD_FORM';

export const handleMenu = () => ({
  type: HANDLE_MENU,
});

export const cleanMenu = () => ({
  type: CLOSE_MENU,
});

export const handleProfilWindow = () => ({
  type: HANDLE_PROFIL_WINDOW,
});

export const reduceProfil = () => ({
  type: REDUCE_PROFIL,
});

export const closeProfilReducer = () => ({
  type: CLOSE_PROFIL_REDUCER,
});

export const handleUpdateNickname = () => ({
  type: HANDLE_UPDATE_NICKNAME,
});

export const closeNicknameUpdate = () => ({
  type: CLOSE_NICKNAME_UPDATE,
});

export const handleUpdatePassword = () => ({
  type: HANDLE_UPDATE_PASSWORD,
});

export const closePasswordUpdate = () => ({
  type: CLOSE_PASSWORD_UPDATE,
});

const desktopReducer = (state, actions) => {
  switch (actions.type) {
    case HANDLE_MENU:
      return { ...state, isOpenMenu: !state.isOpenMenu };
    case CLOSE_MENU:
      return { ...state, isOpenMenu: false };
    case HANDLE_PROFIL_WINDOW:
      return { ...state, isOpenProfilWindow: !state.isOpenProfilWindow };
    case REDUCE_PROFIL:
      return {...state, isReduceProfil: !state.isReduceProfil};
    case CLOSE_PROFIL_REDUCER:
      return {...state, isReduceProfil: false};
    case HANDLE_UPDATE_NICKNAME:
      return {...state, isUpdateNickname: !state.isUpdateNickname};
    case HANDLE_UPDATE_PASSWORD:
      return {...state, isUpdatePassword: !state.isUpdatePassword};
    case CLOSE_NICKNAME_UPDATE:
      return {...state, isUpdateNickname: false };
    case CLOSE_PASSWORD_UPDATE:
      return {...state, isUpdatePassword: false };
    default:
      return state;
  };
};

export const DesktopProvider = (props) => {
  const [state, dispatch] = useReducer(desktopReducer, desktopInitialState )
  const { children } = props;
  return (
    <DesktopContext.Provider value={ [state, dispatch] }>
      {children}
    </DesktopContext.Provider>
  )
}