import React from 'react';
import { AlertStyled } from '../Auth/Login';
const AlertStyle = ({ severity, children }) => {
  return (
    <AlertStyled variant="filled" severity={severity}>
      {children}
    </AlertStyled>
  );
};

export default AlertStyle;
