import React, { Component } from 'react'
import { connect } from 'react-redux';
import PropTypes from 'prop-types';

import GuessedWords from './GuessedWords';
import Congrats from './Congrats';
import Input from './Input';
import { getSecretWord } from './redux/actions'

export class UnconnectedApp extends Component {
  constructor(props) {
    super(props);
    this.state = {
      counter: 0,
    }
  }

  componentDidMount() {
    // get the secret word
    this.props.getSecretWord()
  }

  handleIncrement = () => {
    this.setState({ counter: this.state.counter + 1 })
  }

  render () {
    return (
        <div className="container" data-test="component-app" >
          <h1>Jotto</h1>
          <div>The secret word is party</div>
          <Input/>
          <Congrats success={this.props.success}/>
          <GuessedWords guessedWords={this.props.guessedWords} />
        </div>
    );
  }
}

const mapStateToProps = (state) => {
  return state;
}

UnconnectedApp.propTypes = {
  success: PropTypes.bool.isRequired,
  guessedWords: PropTypes.arrayOf(
      PropTypes.shape({
          guessedWord: PropTypes.string.isRequired,
          letterMatchCount: PropTypes.number.isRequired,
      }).isRequired,
  ),
  getSecretWord: PropTypes.func.isRequired,
};

export default connect(mapStateToProps, { getSecretWord })(UnconnectedApp);
