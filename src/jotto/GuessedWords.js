import React from 'react'
import PropTypes from 'prop-types'
/**
 * Functional react component for guessed word table
 * @function
 * @param {object} props 
 * @returns {JSX.Element} - Renders component or null if "success" props is false
 */
const GuessedWords = props => {
    let contents;

    const guessedWordsRows = props.guessedWords.map((word, index) => (
        <tr data-test="guessed-word" key={index} >
            <td>{word.guessedWord}</td>
            <td>{word.letterMatchCount}</td>
        </tr>
    ))

    if (props.guessedWords.length === 0) {
        contents = (
            <span data-test="guess-instructions" >
                Try to guess the secret word!
            </span>
        )
    } else {
        contents = (
            <div data-test="guessed-words" className="container-md" >
                <h3>Guessed Words</h3>
                <table className="table table-light table-striped table-sm" >
                    <thead>
                        <tr>
                            <th>Guess</th>
                            <th>Matching Letters</th>
                        </tr>
                    </thead>
                    <tbody>
                        { guessedWordsRows }
                    </tbody>
                </table>
            </div>
        )
    }
    return (
        <div data-test="component-guessed-words">
            {contents}
        </div>
    )
};

GuessedWords.propTypes = {
    guessedWords: PropTypes.arrayOf(
        PropTypes.shape({
            guessedWord: PropTypes.string.isRequired,
            letterMatchCount: PropTypes.number.isRequired,
        }).isRequired,
    )
};

export default GuessedWords;