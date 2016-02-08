import React from 'react'
import ReactDOM from 'react-dom'
import { Router, Route, Link } from 'react-router'
import createBrowserHistory from 'history/lib/createBrowserHistory';
import routes from './routes';
import $ from 'jquery';

window.$ = $;

// ReactDOM.render(<Main />, document.getElementById('react'));

let history = createBrowserHistory();

ReactDOM.render((
  <Router history={history}>
    {routes}
  </Router>
), document.getElementById('react'))
