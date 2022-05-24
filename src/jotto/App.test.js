import React from 'react';
import { shallow, ShallowWrapper } from 'enzyme';

import { findByAttribute, jottoStoreFactory } from '../../test/testUtils'
import App, { UnconnectedApp } from './App';

/**
 * Factory function to create shallow wrapper for App component
 * @function setup
 * @param {object} initialState - Initial state for setup
 * @returns {ShallowWrapper}
 */
const setup = (initialState={}) => {
    const store = jottoStoreFactory(initialState);
    const wrapper = shallow(<App store={store} />)
    return wrapper.dive().dive();
};

test('renders without crashing', () => {
    const wrapper = setup();
    const appComponent = findByAttribute(wrapper, 'component-app');
    expect(appComponent.length).toBe(1);
});

describe('check corrects props are received', () => {
    
    test('has excess to `success` state', () => {
        const success = true
        const wrapper = setup({ success });
        const successProp = wrapper.instance().props.success;
        expect(successProp).toBe(success);
    });
    test('has excess to `secret` state', () => {
        const secretWord = 'party'
        const wrapper = setup({ secretWord });
        const successProp = wrapper.instance().props.secretWord;
        expect(successProp).toBe(secretWord);
    });
    test('has excess to `guessedWords` state', () => {
        const guessedWords = [
            { guessedWord: 'train', letterMatchCount: 3 },
            { guessedWord: 'agile', letterMatchCount: 1 },
            { guessedWord: 'party', letterMatchCount: 5 },
        ];
        const wrapper = setup({ guessedWords });
        const guessedWordsProp = wrapper.instance().props.guessedWords;
        expect(guessedWordsProp).toEqual(guessedWords);
    });
    test('`getSecretWord` action creator is a function on the props', () => {
        const wrapper = setup();
        const getSecretWordProp = wrapper.instance().props.getSecretWord;
        expect(getSecretWordProp).toBeInstanceOf(Function);
    });
});

test('`getSecretWord` runs on App mount', () => {
    const getSecretWordMock = jest.fn();

    const props = {
        getSecretWord: getSecretWordMock,
        success:false,
        guessedWords:[],
    }

    // set up app component with getSecretWordMock as getSecretWord prop
    const wrapper = shallow(<UnconnectedApp {...props} />);
    wrapper.instance().componentDidMount();

    // check to see if mock ran
    const getSecretWordCallCount = getSecretWordMock.mock.calls.length;

    expect(getSecretWordCallCount).toBe(1);

});