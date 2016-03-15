import './css'

import React, {Component} from 'react'
import ReactDOM from 'react-dom'
import {Router, Route, IndexRedirect, browserHistory} from 'react-router'

import Home from './components/Home'
import NotFound from './components/NotFound'

class App extends Component {
  render() {
    return (
      <div class='container-fluid'>
        {/* this will be <Home> or <NotFound> */}
        {this.props.children}
      </div>
    )
  }
}

ReactDOM.render(
  <Router history={browserHistory}>
    <Route path='/' component={App}>
      <IndexRedirect to='home'/>
      <Route path='*' component={Home}/>
    </Route>
    <Route status={404} path='*' component={NotFound} />
  </Router>,
  document.getElementById('app')
)
