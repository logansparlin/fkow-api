import React from 'react';
import {Route} from 'react-router';
import Main from './components/main';
import Recipes from './components/recipes';
import About from './components/about';

export default (
  <Route component={Main}>
    <Route path="/" component={Recipes} />
    <Route path="/about" component={About} />
  </Route>
);
