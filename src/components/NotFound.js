import React, { Component } from 'react'
import { Link } from 'react-router'

export default class NotFound extends Component {
  render() {
    return (
      <div>
        {this.props.children}
        <h3>404 :(</h3>
        <Link to="/">
          <button type="button" class="btn btn-default">Go Home</button>
        </Link>
      </div>
    )
  }
}
