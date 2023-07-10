import propTypes from 'prop-types';
import css from './Button.module.css';
import React from 'react';

const Button = ({ onClick, children }) => (
  <button
    className={`${css.Button} ${css.CenterButton}`}
    onClick={onClick}
    type="button"
  >
    {children}
  </button>
);

Button.propTypes = {
  onClick: propTypes.func.isRequired,
  children: propTypes.node.isRequired,
};

export default Button;
