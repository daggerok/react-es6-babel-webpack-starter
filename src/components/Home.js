import React, {Component} from 'react'

export default class Home extends Component {
  constructor() {
    super()
    this.state = {
      name: 'world'
    }
  }
  
  render() {
    return (
      <div>
        hello, {this.state.name}!
      </div>
    )
  }
}
