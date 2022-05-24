import React, { Component } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';

import { guessWord } from './redux/actions'

export class UnconnectedInput extends Component {
    
    constructor(props) {
        super(props);

        this.inputBox = React.createRef();
    }

    submitGuessedWord = (event) => {
        event.preventDefault();

        const guessedWord = this.inputBox.current.value;
        if (guessedWord && guessedWord.length > 0) {
            this.props.guessWord(guessedWord);
        }
        
        this.inputBox.current.value = '';
    }
    
    render() {
        const content = this.props.success
            ? null
            : (
                <form className="form-inline">
                    <input 
                        ref={this.inputBox}
                        data-test="input-box" 
                        className="mb-2 mx-sm-3"
                        id='word-guess'
                        type='text'
                        placeholder="enter guess"/>
                    <button 
                        data-test="submit-button"
                        className="btn btn-primary mb-2"
                        onClick={this.submitGuessedWord}
                        type="submit">
                        submit
                    </button>
                </form>
            )
        return (
            <div data-test="component-input" >
                { content }
            </div>
        )
    }
};

const mapStateToProps = ({ success }) => {
    return { success };
}

UnconnectedInput.propTypes = {
    success: PropTypes.bool.isRequired,
    guessWord: PropTypes.func.isRequired,
}

export default connect(mapStateToProps, { guessWord })(UnconnectedInput);