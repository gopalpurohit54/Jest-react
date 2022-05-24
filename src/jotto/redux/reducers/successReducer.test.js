import * as actionTypes from '../actionTypes';
import successReducer from '../reducers/successReducer';

const defaultState = false

test('returns default initial state of false', () => {
    const newState = successReducer(defaultState);
    expect(newState).toEqual(false);
})

test('set success true after receiving action type as "CORRECT_GUESS"', () => {
    const newState = successReducer(defaultState, { type: actionTypes.CORRECT_GUESS })
    expect(newState).toEqual(true);
})