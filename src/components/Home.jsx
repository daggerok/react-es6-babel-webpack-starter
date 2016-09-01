import React, { Component } from 'react';
import $ from 'jquery';

export class Home extends Component {
  constructor() {
    super();
    this.state = {
      name: 'world',
      users: []
    };
    this.fetchUsers = this.fetchUsers.bind(this);
  }

  fetchUsers() {
    $.get('./api/data.json')
      .then(result => {
        this.setState(Object.assign({}, this.state, {
          users: result
        }))
      });
  }

  componentDidMount() {
    this.fetchUsers()
  }

  render() {
    return (
      <div onClick={this.fetchUsers}>
        hello, {this.state.name}!
        <ul>
          {this.state.users.map((user, index) => <li key={index}>{user.name}</li>)}
        </ul>
      </div>
    );
  }
}
