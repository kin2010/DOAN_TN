import './App.css';
import Header from './components/Header';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import Home from './components/Home';
import { createTheme, ThemeProvider, styled } from '@mui/material/styles';
import Shop from './components/Shop';
import Auth from './components/Auth/Auth';
import { createBrowserHistory } from 'history';
const customTheme = createTheme({
  colors: {
    main: '#ff536f',
    secondary: '#17a2b8',
    bg: '#eeeeee',
    bg2: '#f9f9f9',
    gray: '#7f868d',
  },
});
function App() {
  const history = createBrowserHistory();
  return (
    <>
      <ThemeProvider theme={customTheme}>
        <BrowserRouter history={history}>
          <Routes>
            <Route exact path="/" element={<Home />}></Route>
            <Route
              exact
              path="/login"
              element={<Auth auth="login"></Auth>}
            ></Route>
            <Route
              exact
              path="register"
              element={<Auth auth="register"></Auth>}
            ></Route>
            <Route exact path="/shop" element={<Shop />}></Route>
          </Routes>
        </BrowserRouter>
      </ThemeProvider>
    </>
  );
}

export default App;
