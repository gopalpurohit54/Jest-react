import logo from './logo.svg';
import './App.css';
import React, { Component } from 'react'
import Increment from './increment';
import Jotto from './jotto'
class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
    }
  }

  render () {
    return (
      // <Increment/>
      <Jotto />
    );
  }
}

export default App;
