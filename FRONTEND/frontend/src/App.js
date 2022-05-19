import './App.css';
import Header from './components/Header';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import Home from './components/Home';
import { createTheme, ThemeProvider, styled } from '@mui/material/styles';
import Shop from './components/Shop';
import Auth from './components/Auth/Auth';
const customTheme = createTheme({
  colors: {
    main: '#ff536f',
    bg: '#eeeeee',
    bg2: '#f9f9f9',
  },
});
function App() {
  return (
    <>
      <ThemeProvider theme={customTheme}>
        <Router>
          <Switch>
            <Route exact path="/" component={Home}></Route>
          </Switch>
          <Route
            exact
            path="/login"
            component={(props) => <Auth {...props} auth="login"></Auth>}
          ></Route>
          <Switch>
            <Route exact path="/shop" component={Shop}></Route>
          </Switch>
        </Router>
      </ThemeProvider>
    </>
  );
}

export default App;
