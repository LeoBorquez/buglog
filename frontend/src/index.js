import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
import * as serviceWorker from './serviceWorker';
import { Route, BrowserRouter as Router, Switch } from 'react-router-dom';
import Header from './components/Header'
import Results from './pages/Results'

const routing = (
  <Router>
    <Header/>
    <Switch>
      <Route exact path='/' component={App} />
      <Route path={`/results/:pageNumber`} component={Results} />
    </Switch>
  </Router>
);

ReactDOM.render(
  routing,
  document.getElementById('root')
);

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.unregister();
