import React, { Component } from 'react'
import { Provider } from 'react-redux'

import store from './redux/store';
import App from './App';

class Jotto extends Component {
  constructor(props) {
    super(props);
    this.state = {
      counter: 0,
    }
  }

  handleIncrement = () => {
    this.setState({ counter: this.state.counter + 1 })
  }

  render () {
    return (
      <Provider store={store} >
        <App />
      </Provider>
    );
  }
}

export default Jotto;
