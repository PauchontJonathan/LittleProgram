import React, { useContext } from 'react';
import { DesktopContext, handleCalculatorWindow, activeCalculator } from 'src/reducers/desktop';

const SingleApp = () => {
  const [ state, desktopDispatch ] = useContext(DesktopContext);
  const handleCalculator = () => {
    desktopDispatch(handleCalculatorWindow());
    desktopDispatch(activeCalculator());
  };

  return (
    <div className="applications-list">
      <div className="applications-single" onClick={ handleCalculator }>
        <img src="src/assets/img/Calculator_30001.png" alt="calculatrice"/>
        <p>Calculatrice</p>
      </div>
    </div>
  )
};

export default SingleApp;