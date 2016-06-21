import './styles';

import React, { Component } from 'react';
import { render } from 'react-dom';
import { Router, Route, IndexRoute, browserHistory } from 'react-router';

import { Home } from './components/Home';
import { NotFound } from './components/NotFound';

class App extends Component {
  render() {
    return (
      <div class="container-fluid">
        {this.props.children}
      </div>
    );
  }
}

render(
  <Router history={browserHistory}>
    <Route path="/" component={App}>
      <IndexRoute component={Home}/>
      <Route path="home" component={Home}/>
      <Route path="*" component={NotFound}/>
    </Route>
  </Router>,
  document.getElementById('app')
);
