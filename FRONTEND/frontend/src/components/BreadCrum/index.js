import * as React from 'react';
import Typography from '@mui/material/Typography';
import Breadcrumbs from '@mui/material/Breadcrumbs';
import { Link } from 'react-router-dom';
import { createTheme, ThemeProvider, styled } from '@mui/material/styles';

function handleClick(event) {
  event.preventDefault();
  console.info('You clicked a breadcrumb.');
}
export const StyledBread = styled('div')((props) => ({
  width: '100vw',
  textAlign: 'center',
  backgroundColor: `${props.theme.colors.main}30`,
  padding: '15px 0 15px 0',
  '.MuiBreadcrumbs-ol': {
    justifyContent: 'center',
  },
}));
export default function Breadcrumb({ breadcrumb }) {
  return (
    <StyledBread role="presentation" onClick={handleClick}>
      <Breadcrumbs aria-label="breadcrumb">
        <Link underline="hover" color="inherit" to="/">
          Home
        </Link>
        {/* <Link
          underline="hover"
          color="inherit"
          href="/material-ui/getting-started/installation/"
        >
          Core
        </Link> */}
        <Typography color="text.primary">{breadcrumb}</Typography>
      </Breadcrumbs>
    </StyledBread>
  );
}
