import * as actionTypes from '../actionTypes';

// Initial state for success reducer
const initialState = {
    success: false,
}

/**
 * Success Message reducer
 * @param {object} state 
 * @param {object} action 
 * @returns 
 */
const successReducer = (state = false, action) => {
    if (!(action && action.type)) {
        return state
    }
    switch(action.type) {
        case actionTypes.CORRECT_GUESS:
            return true
        default: 
            return state;
    }
}

export default successReducer;