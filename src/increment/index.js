import React, { Component } from 'react'


class Increment extends Component {
    constructor(props) {
      super(props);
      this.state = {
        counter: 0,
        showError: false,
      }
    }
  
    handleIncrement = () => {
      this.setState({ counter: this.state.counter + 1, showError: false })
    }
    
    handleDecrement = () => {
        if (this.state.counter === 0) {
            this.setState({ showError: true })
            return;
        }
        this.setState({ counter: this.state.counter - 1 })
    }
  
    render () {
      return (
        <div className="App" data-test="component-app">
         <h1 data-test="display-counter">This is the counter {this.state.counter}</h1>
         <button data-test="increment-button" onClick={this.handleIncrement}>Increment button</button>
         <button data-test="decrement-button" onClick={this.handleDecrement}>Decrement button</button>
         <div data-test="error-message" className={this.state.showError ? '' : 'hidden'}>Counter can't go below 0</div>
        </div>
      );
    }
  }
  
export default Increment;
  