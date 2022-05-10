import './App.css';
import Header from './components/Header';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
function App() {
  return (
    <>
      <Router>
        <Switch>
          <Route exact path="/" component={Header}></Route>
        </Switch>
      </Router>
    </>
  );
}

export default App;
