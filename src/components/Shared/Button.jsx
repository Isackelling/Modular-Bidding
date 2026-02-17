/**
 * Reusable Button Component
 * Provides consistent button styling throughout the application
 */

import React from 'react';
import { buttonStyles, combineStyles } from './styles.js';

const Button = ({
  children,
  onClick,
  variant = 'primary',
  disabled = false,
  style = {},
  type = 'button',
  ...props
}) => {
  const variantStyle = buttonStyles[variant] || buttonStyles.primary;
  const finalStyle = combineStyles(
    buttonStyles.base,
    variantStyle,
    disabled ? buttonStyles.disabled : {},
    style
  );

  return (
    <button
      type={type}
      onClick={onClick}
      disabled={disabled}
      style={finalStyle}
      {...props}
    >
      {children}
    </button>
  );
};

export default Button;
