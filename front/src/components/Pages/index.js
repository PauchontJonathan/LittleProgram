import React, { useContext } from 'react';
import { Route, Redirect } from 'react-router-dom';
import { UserContext } from 'src/reducers/user';
import Forms from 'src/components/Pages/Forms';
import Desktop from 'src/components/Pages/Desktop';
import './pages.scss';

const Pages = () => {
  // eslint-disable-next-line no-unused-vars
  const [state, dispatch] = useContext(UserContext);
  const currentToken = localStorage.getItem('token');
  const { token } = state;
  if (token) {
    localStorage.setItem('token', token);
  }
  return (
    <div className="pages">
      <Route exact path="/">
        {currentToken ? <Redirect to="/desktop" /> : <Forms />}
      </Route>
      <Route exact path="/desktop">
        {!currentToken ? <Redirect to="/" /> : <Desktop />}
      </Route>
    </div>
  );
};

export default Pages;