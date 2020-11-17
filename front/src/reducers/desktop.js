/* eslint-disable react/prop-types */
import React, { useReducer, createContext } from 'react';

export const DesktopContext = createContext();

const desktopInitialState = {
  isActiveMessenger: false,
  isActiveCalculator: false,
  isActiveApplications: false,
  isActiveProfil: false,
  isOpenMessenger: true,
  isOpenCalculator: false,
  isReduceMessenger: false,
  isReduceCalculator: false,
  isOpenApplications: false,
  isReduceApplications: false,
  isOpenProfilWindow: false,
  isOpenMenu: false,
  isReduceProfil: false,
  isUpdateNickname: false,
  isUpdatePassword: false,
};

const HANDLE_MENU = 'HANDLE_MENU';
const CLOSE_MENU = 'CLOSE_MENU';
const HANDLE_MESSENGER_WINDOW = 'HANDLE_MESSENGER_WINDOW';
const CLOSE_MESSENGER_WINDOW = 'CLOSE_MESSENGER_WINDOW';
const HANDLE_CALCULATOR_WINDOW = 'HANDLE_CALCULATOR_WINDOW';
const CLOSE_CALCULATOR_WINDOW = 'CLOSE_CALCULATOR_WINDOW';
const REDUCE_CALCULATOR = 'REDUCE_CALCULATOR';
const REDUCE_MESSENGER = 'REDUCE_MESSENGER';
const HANDLE_PROFIL_WINDOW = 'HANDLE_WINDOW';
const REDUCE_PROFIL = 'REDUCE_PROFIL';
const HANDLE_APPLICATIONS_WINDOW = 'HANDLE_APPLICATIONS_WINDOW';
const REDUCE_APPLICATIONS = 'REDUCE_APPLICATIONS';
const APPLICATIONS_REDUCER = 'APPLICATIONS_REDUCER';
const CLOSE_PROFIL_REDUCER = 'CLOSE_PROFIL_REDUCER';
const HANDLE_UPDATE_NICKNAME = 'HANDLE_UPDATE_NICKNAME';
const CLOSE_NICKNAME_UPDATE = 'CLOSE_NICKNAME_FORM';
const HANDLE_UPDATE_PASSWORD = 'HANDLE_UPDATE_PASSWORD';
const CLOSE_PASSWORD_UPDATE = 'CLOSE_PASSWORD_FORM';
const ACTIVE_MESSENGER = 'ACTIVE_MESSENGER';
const ACTIVE_CALCULATOR = 'ACTIVE_CALCULATOR';
const ACTIVE_APPLICATIONS = 'ACTIVE_APPLICATIONS';
const ACTIVE_PROFIL = 'ACTIVE_PROFIL';

export const handleMenu = () => ({
  type: HANDLE_MENU,
});

export const cleanMenu = () => ({
  type: CLOSE_MENU,
});

export const handleMessengerWindow = () => ({
  type: HANDLE_MESSENGER_WINDOW,
});

export const closeMessengerWindow = () => ({
  type: CLOSE_MESSENGER_WINDOW,
});

export const reduceMessenger = () => ({
  type: REDUCE_MESSENGER,
});

export const closeCalculatorWindow = () => ({
  type: CLOSE_CALCULATOR_WINDOW,
});

export const handleCalculatorWindow = () => ({
  type: HANDLE_CALCULATOR_WINDOW,
});

export const reduceCalculator = () => ({
  type: REDUCE_CALCULATOR,
});

export const handleProfilWindow = () => ({
  type: HANDLE_PROFIL_WINDOW,
});

export const handleApplicationsWindow = () => ({
  type: HANDLE_APPLICATIONS_WINDOW,
});

export const reduceProfil = () => ({
  type: REDUCE_PROFIL,
});

export const reduceApplications = () => ({
  type: REDUCE_APPLICATIONS,
});

export const closeProfilReducer = () => ({
  type: CLOSE_PROFIL_REDUCER,
});

export const closeApplicationsReducer = () => ({
  type: APPLICATIONS_REDUCER,
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

export const activeCalculator = () => ({
  type: ACTIVE_CALCULATOR,
});

export const activeApplications = () => ({
  type: ACTIVE_APPLICATIONS,
});

export const activeProfil = () => ({
  type: ACTIVE_PROFIL,
});

export const activeMessenger = () => ({
  type: ACTIVE_MESSENGER,
});

const desktopReducer = (state, actions) => {
  switch (actions.type) {
    case HANDLE_MENU:
      return { ...state, isOpenMenu: !state.isOpenMenu };
    case CLOSE_MENU:
      return { ...state, isOpenMenu: false };
    case HANDLE_MESSENGER_WINDOW:
      return { ...state, isOpenMessenger: true };
    case CLOSE_MESSENGER_WINDOW:
      return { ...state, isOpenMessenger: false };
    case CLOSE_CALCULATOR_WINDOW:
      return { ...state, isOpenCalculator: false };
    case HANDLE_CALCULATOR_WINDOW:
      return { ...state, isOpenCalculator: true};
    case HANDLE_PROFIL_WINDOW:
      return { ...state, isOpenProfilWindow: !state.isOpenProfilWindow };
    case HANDLE_APPLICATIONS_WINDOW:
      return { ...state, isOpenApplications: !state.isOpenApplications };
    case REDUCE_MESSENGER:
      return { ...state, isReduceMessenger: !state.isReduceMessenger };
    case REDUCE_CALCULATOR:
      return { ...state, isReduceCalculator: !state.isReduceCalculator };
    case REDUCE_PROFIL:
      return {...state, isReduceProfil: !state.isReduceProfil};
    case REDUCE_APPLICATIONS:
      return { ...state, isReduceApplications: !state.isReduceApplications };
    case CLOSE_PROFIL_REDUCER:
      return {...state, isReduceProfil: false};
    case APPLICATIONS_REDUCER:
      return { ...state, isReduceApplications: false};
    case HANDLE_UPDATE_NICKNAME:
      return {...state, isUpdateNickname: !state.isUpdateNickname};
    case HANDLE_UPDATE_PASSWORD:
      return {...state, isUpdatePassword: !state.isUpdatePassword};
    case CLOSE_NICKNAME_UPDATE:
      return {...state, isUpdateNickname: false };
    case CLOSE_PASSWORD_UPDATE:
      return {...state, isUpdatePassword: false };
    case ACTIVE_MESSENGER:  
      return { ...state, isActiveMessenger: true, isActiveCalculator: false, isActiveApplications: false, isActiveProfil: false };
    case ACTIVE_CALCULATOR:
      return { ...state, isActiveCalculator: true, isActiveProfil: false, isActiveApplications: false, isActiveMessenger: false };
    case ACTIVE_APPLICATIONS:
      return { ...state, isActiveApplications: true, isActiveProfil: false, isActiveCalculator: false, isActiveMessenger: false };
    case ACTIVE_PROFIL:
      return { ...state, isActiveProfil: true, isActiveApplications: false, isActiveCalculator: false, isActiveMessenger: false };
    default:
      return state;
  };
};

export const DesktopProvider = (props) => {
  const [state, dispatch] = useReducer(desktopReducer, desktopInitialState)
  const { children } = props;
  return (
    <DesktopContext.Provider value={ [state, dispatch] }>
      {children}
    </DesktopContext.Provider>
  )
}