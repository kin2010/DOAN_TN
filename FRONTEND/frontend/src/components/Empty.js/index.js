import { Typography } from '@mui/material';
import React from 'react';
import { Row } from 'react-bootstrap';
import { createTheme, ThemeProvider, styled } from '@mui/material/styles';
import CircularProgress from '@mui/material/CircularProgress';
export const IconSearch = styled('img')((props) => ({
  display: 'block',
  width: '100px',
  height: '100px',
  marginRight: '10px',
}));
const Empty = () => {
  return (
    <div
      style={{ backgroundColor: '#fff' }}
      className="pt-5 w-100 text-center  d-flex justify-content-center"
    >
      <IconSearch alt="nofile" src="../images/search.png" />
      <Typography
        className="text-success"
        variant="h6"
        style={{ lineHeight: '88px' }}
      >
        Mặt hàng này đang trống !!
      </Typography>
    </div>
  );
};

export default Empty;
