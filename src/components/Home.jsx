import React, { Component } from 'react';

export class Home extends Component {
  constructor() {
    super();
    this.state = {
      name: 'world'
    }
  }

  render() {
    return (
      <div>
        hello, {this.state.name}!
      </div>
    );
  }
}
