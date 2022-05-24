import axios from 'axios';

import * as actionTypes from '../actionTypes';
import { getLetterMatchCount } from '../../helpers/index'

/**
 * @function correctGuess
 * @returns {object}
 */
export function correctGuess() {
    return { type: actionTypes.CORRECT_GUESS };
}

/**
 * Returns a redux thunk function that dispatches GUESS_WORD action
 * and (conditionally) CORRECT_GUESS action
 * @function guessWord
 * @param {string} guessedWord - Guessed word
 * @returns {function} - Redux thunk function
 */
export const guessWord = (guessedWord) => {
    return function(dispatch, getState) {
        const secretWord = getState().secretWord;
        const letterMatchCount = getLetterMatchCount(guessedWord, secretWord);

        dispatch({
            type: actionTypes.GUESS_WORD,
            payload: { guessedWord, letterMatchCount }
        });

        if(guessedWord === secretWord) {
            dispatch(correctGuess())
        }
    }
}


export const getSecretWord = () => {
    return (dispatch) => {
        return axios.get('http://localhost:1234')
            .then(response => {
                dispatch({
                    type: actionTypes.SET_SECRET_WORD,
                    payload: response.data
                })
            })
            .catch(err => {
                console.log(err);
                dispatch({
                    type: actionTypes.SET_SECRET_WORD,
                    payload: 'party'
                })
            });
    }
}