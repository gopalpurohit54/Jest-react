import moxios from "moxios";

import { jottoStoreFactory } from '../../../../test/testUtils'
import { correctGuess, getSecretWord } from ".";
import * as actionTypes from '../actionTypes';

describe('correctGuess', () => {
    test('returns an action with type "CORRECT_GUESS"', () => {
        const action = correctGuess();
        expect(action).toEqual({ type: actionTypes.CORRECT_GUESS });
    });
});

describe('getSecretWord action creator', () => {
    beforeEach(() => {
        moxios.install();
    });
    afterEach(() => {
        moxios.uninstall();
    });
    test('adds response word to state', () => {
        const secretWord = 'party';
        const store = jottoStoreFactory();
        moxios.wait(() => {
            const request = moxios.requests.mostRecent();
            request.respondWith({
                status: 200,
                response: secretWord,
            })
        })
        return store.dispatch(getSecretWord()).then(() => {
            const newState = store.getState();
            expect(newState.secretWord).toBe(secretWord);
        })
    });
});