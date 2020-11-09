import React, { useState, useContext } from 'react';
import classNames from 'classnames';
import Dragable from 'react-draggable';
import RemoveIcon from '@material-ui/icons/Remove';
import CloseIcon from '@material-ui/icons/Close';
import calculatorDatas from 'src/datas/calculatorDatas';
import { DesktopContext, closeCalculatorWindow, reduceCalculator, activeCalculator } from 'src/reducers/desktop';

import './calculator.scss';

const Calculator = () => {

  const [ state, desktopDispatch ] = useContext(DesktopContext);
  const { isReduceCalculator, isActiveCalculator } = state;

  const [ currentOperand, setCurrentOperand ] = useState('');
  const [ previousOperand, setPreviousOperand ] = useState('');
  const [ currentSymbol, setCurrentSymbol ] = useState('');
  let isEqual = false;

  const handleNumberValue = (e) => {
    const currentTarget = e.target;
    const dataNumber = currentTarget.getAttribute('data-number');
    setCurrentOperand(currentOperand + dataNumber);
  };

  const handleOperation = () => {

    let calculated;
    const prev = parseFloat(previousOperand);
    const current = parseFloat(currentOperand);
    if (isNaN(prev) || isNaN(current)) return;


    switch (currentSymbol) {
      case '+':
        calculated = prev + current;
        setPreviousOperand(calculated);
        setCurrentOperand('');
        break;
      case '-':
        calculated = prev - current;
        setPreviousOperand(calculated);
        setCurrentOperand('');
        break;
      case 'X':
        calculated = prev * current;
        setPreviousOperand(calculated);
        setCurrentOperand('');
        break;
      case '/':
        calculated = prev / current;
        setPreviousOperand(calculated);
        setCurrentOperand('');
        break;
      default:
        return;
    }

    if (isEqual === true) {
      setCurrentOperand(calculated);
      setPreviousOperand('');
      setCurrentSymbol('');
      isEqual = false;
    }

  };

  const handleEqual = () => {
    isEqual = true;
    handleOperation();
  };

  const handleSymbolValue = (e) => {
    const currentTarget = e.target;
    const dataSymbol = currentTarget.getAttribute('data-symbol');
    if (currentOperand === '') return;
    if (dataSymbol === '.') return setCurrentOperand(currentOperand + dataSymbol);
    setCurrentSymbol(dataSymbol);
    setPreviousOperand(currentOperand);
    setCurrentOperand('');
    if (previousOperand !== '') {
      handleOperation();
    }
  };

  const handleClear = () => {
    setCurrentOperand('');
    setPreviousOperand('');
    setCurrentSymbol('');
  };

  const closeCalculator = () => {
    desktopDispatch(closeCalculatorWindow());
  };

  const handleReduceCalculator = () => {
    desktopDispatch(reduceCalculator());
  };

  const handleActiveDisplay = () => {
    desktopDispatch(activeCalculator());
  };

  const handleDisplay = classNames('calculator', { 'calculator-hidden': isReduceCalculator }, { 'calculator-active': isActiveCalculator });

  return (
    <Dragable onStart={handleActiveDisplay}>
      <div className={handleDisplay} onClick={handleActiveDisplay}>
        <div className="window-description">
          <h1 className="window-description-title">Calculatrice</h1>
          <div className="window-description-icons">
            <RemoveIcon onClick={handleReduceCalculator} className="window-description-icons-icon" />
            <CloseIcon onClick={closeCalculator} className="window-description-icons-icon" />
          </div>
        </div>
        <div className="calculator-previous">{previousOperand + currentSymbol}</div>
        <div className="calculator-current">{currentOperand}</div>
        <div className="calculator-box">
          <div className="calculator-numbers">
            { calculatorDatas.map((calculatorData) => (
              <div className="calculator-number" key={calculatorData.key} data-number={calculatorData.data} onClick={handleNumberValue}>{calculatorData.number}</div>
            )) }
          </div>
          <div className="calculator-symbols">
            <div className="calculator-symbol" onClick={handleClear}>CA</div>
            <div className="calculator-symbol" data-symbol="+" onClick={handleSymbolValue}>+</div>
            <div className="calculator-symbol" data-symbol="-" onClick={handleSymbolValue}>-</div>
            <div className="calculator-symbol" data-symbol="/" onClick={handleSymbolValue}>/</div>
            <div className="calculator-symbol" data-symbol="X" onClick={handleSymbolValue}>x</div>
            <div className="calculator-symbol" onClick={handleEqual}>=</div>
            <div className="calculator-symbol" data-symbol="." onClick={handleSymbolValue}>.</div>
          </div>
        </div>
      </div>
    </Dragable>
  )
}

export default Calculator;