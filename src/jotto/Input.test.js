import React from 'react';
import { shallow } from 'enzyme';

import { findByAttribute, jottoStoreFactory } from '../../test/testUtils';
import Input, { UnconnectedInput } from './Input';

/**
 * Factory function to create a ShallowWrapper for Input component
 * @function setup
 * @param {object} initialState - Initial state for setup
 * @returns {ShallowWrapper}
 */
const setup = (initialState={}) => {
    const store = jottoStoreFactory(initialState)
    const wrapper = shallow(<Input store={store} />).dive().dive();
    return wrapper;
}


describe('render', () => {
    describe('word has not been guessed', () => {
        let wrapper;
        beforeEach(() => {
            const initialState = {
                success: false
            };
            wrapper = setup(initialState);
        })
        test('renders component without error', () => {
            const inputComponent = findByAttribute(wrapper, 'component-input');
            expect(inputComponent.length).toBe(1);
        });
        test('renders input box', () => {
            const inputBox = findByAttribute(wrapper, 'input-box');
            expect(inputBox.length).toBe(1);
        });
        test('renders submit button', () => {
            const submitButton = findByAttribute(wrapper, 'submit-button');
            expect(submitButton.length).toBe(1);
        });
    });
    describe('word has been guessed', () => {
        let wrapper;
        beforeEach(() => {
            const initialState = {
                success: true
            };
            wrapper = setup(initialState);
        })
        test('renders without error', () => {
            const inputComponent = findByAttribute(wrapper, 'component-input');
            expect(inputComponent.length).toBe(1);
        });
        test('does not render input box', () => {
            const inputBox = findByAttribute(wrapper, 'input-box');
            expect(inputBox.length).toBe(0);
        });
        test('does not render submit button', () => {
            const submitButton = findByAttribute(wrapper, 'submit-button');
            expect(submitButton.length).toBe(0);
        });
    });
});

describe('redux props', () => {
    test('getting success props in component', () => {
        const success = true;
        const wrapper = setup({ success });
        const successProp = wrapper.instance().props.success;
        expect(successProp).toBe(success);
    });
    test('`guessWord` action creator is a function prop', () => {
        const wrapper = setup();
        const guessWordProp = wrapper.instance().props.guessWord;
        expect(guessWordProp).toBeInstanceOf(Function);
    });
});

describe('`guessWord` action creator called',() => {
    let wrapper;
    let guessWordMock;
    const guessedWord = 'train';

    beforeEach(() => {
        // setting a mock function for guessWord
        guessWordMock = jest.fn();
    
        const props = {
            success: false,
            guessWord: guessWordMock,
        }
        wrapper = shallow(<UnconnectedInput {...props} />);
        const submitButton = findByAttribute(wrapper, 'submit-button');

        // Set input box value
        wrapper.instance().inputBox.current = { value: guessedWord };

        // Simulate submit button click
        submitButton.simulate('click', { preventDefault() {} });
    })


    test('`guessWord` action creator called when submit is clicked', () => {
        // Check `guessWord` is called once
        const guessWordCallCount = guessWordMock.mock.calls.length;
        expect(guessWordCallCount).toBe(1);
    });

    test('`guessWord` action creator called with input value', () => {
        // check args passed to `guessWord`
        const guessWordArg = guessWordMock.mock.calls[0][0];
        expect(guessWordArg).toBe(guessedWord);
    });
    test('input box clears on suubmit', () => {
        expect(wrapper.instance().inputBox.current.value).toBe('')
    })
})
