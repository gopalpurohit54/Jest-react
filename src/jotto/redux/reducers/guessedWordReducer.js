import * as actionTypes from '../actionTypes'

/**
 * @function guessedWordReducer
 * @param {Array} state - Array of guessed words
 * @param {object} action - action to be reduced
 * @returns {Array} - New guessedWords state
 */
const guessedWordReducer = (state=[], action) => {
    switch(action.type) {
        case actionTypes.GUESS_WORD:
            return [...state, action.payload];

        default:
            return state;
    }
};

export default guessedWordReducer;