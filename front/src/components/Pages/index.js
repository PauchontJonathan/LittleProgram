import React, { useContext } from 'react';
import { Route, Redirect } from 'react-router-dom';
import { UserContext, addTokenToState } from 'src/reducers/user';
import Forms from 'src/components/Pages/Forms';
import Desktop from 'src/components/Pages/Desktop';
import { DesktopProvider } from 'src/reducers/desktop';
import { MessengerProvider } from 'src/reducers/messenger';
import './pages.scss';

const Pages = () => {
  // eslint-disable-next-line no-unused-vars
  const [state, dispatch] = useContext(UserContext);
  const { token } = state;
  const currentToken = localStorage.getItem('token');
  if (token) {
    localStorage.setItem('token', token);
  } else if (currentToken) {
    dispatch(addTokenToState(currentToken));
  }
  return (
    <div className="pages">
      <Route exact path="/">
        {currentToken ? <Redirect to="/desktop" /> : <Forms />}
      </Route>
      <DesktopProvider>
        <MessengerProvider>
          <Route exact path="/desktop">
            {!currentToken ? <Redirect to="/" /> : <Desktop />}
          </Route>
        </MessengerProvider>
      </DesktopProvider>
    </div>
  );
};

export default Pages;