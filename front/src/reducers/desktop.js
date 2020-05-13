/* eslint-disable react/prop-types */
import React, { useReducer, createContext } from 'react';

export const DesktopContext = createContext();

const desktopInitialState = {
  isOpenWindow: false,
  isOpenMenu: false,
};

const HANDLE_MENU = 'HANDLE_MENU';
const CLOSE_MENU = 'CLOSE_MENU';
const HANDLE_WINDOW = 'HANDLE_WINDOW';

export const handleMenu = () => ({
  type: HANDLE_MENU,
});

export const cleanMenu = () => ({
  type: CLOSE_MENU,
});

export const handleWindow = () => ({
  type: HANDLE_WINDOW,
});

const desktopReducer = (state, actions) => {
  switch (actions.type) {
    case HANDLE_MENU:
      return { ...state, isOpenMenu: !state.isOpenMenu };
    case CLOSE_MENU:
      return { ...state, isOpenMenu: false };
    case HANDLE_WINDOW:
      return { ...state, isOpenWindow: !state.isOpenWindow };
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