import { render, screen } from '@testing-library/react';
import React from 'react';
import Enzyme, { shallow, ShallowWrapper } from 'enzyme';
import EnzymeAdapter from '@wojtekmaj/enzyme-adapter-react-17'

import App from './App';
import Increment from './increment';

Enzyme.configure({ adapter: new EnzymeAdapter() });


/**
 * Factory function to create ShallowWrapper for the App component
 * @function incrementSetup
 * @param {object} props - Component props specific to this component
 * @param {object} state - Initial state for incrementSetup
 * @returns {ShallowWrapper}
 */
const incrementSetup = (props={}, state=null) => {
    const wrapper = shallow(<Increment {...props}/>)
    if (state) wrapper.setState(state);
    return wrapper
}

/**
 * Returns ShallowWrapper containing node(s) with the given data-test value
 * @function findByTestAttr
 * @param {ShallowWrapper} wrapper - Enzyme shallow wrapper to search within
 * @param {string} val - Value of data-test attribute for search
 */
const findByTestAttr = (wrapper, val) => {
    return wrapper.find(`[data-test="${val}"]`)
}

test('renders without crashing', () => {
    const wrapper = incrementSetup();
    const appComponent = findByTestAttr(wrapper, 'component-app')
    expect(appComponent.length).toBe(1);
});


test('renders display counter', () => {
    const wrapper = incrementSetup();
    const displayComponent = findByTestAttr(wrapper,'display-counter')
    expect(displayComponent.length).toBe(1);
    
})

test('counter starts with 0', () => {
    const wrapper = incrementSetup();
    const initialCounterState = wrapper.state('counter');
    expect(initialCounterState).toBe(0);
})

test('renders increment button', () => {
    const wrapper = incrementSetup();
    const buttonComponent = findByTestAttr(wrapper,'increment-button')
    expect(buttonComponent.length).toBe(1);
})


test('clicking button increments counter display', () => {
    const counter = 7;
    const wrapper = incrementSetup(null, { counter });

    // find button and click
    const buttonComponent = findByTestAttr(wrapper,'increment-button');
    buttonComponent.simulate('click');
    wrapper.update();

    //find display and test 
    const displayComponent = findByTestAttr(wrapper,'display-counter');
    expect(displayComponent.text()).toContain(counter + 1);
})

describe('Decrement', () => {

    test('render decrement button', () => {
        const wrapper = incrementSetup();
        const decrementComponent = findByTestAttr(wrapper, 'decrement-button');
        expect(decrementComponent.length).toBe(1);
    })
    
    test("clicking button decremets counter", () => {
        const counter = 5;
        const wrapper = incrementSetup(null, { counter });
    
        // find decrement button and click
        const decrementComponent = findByTestAttr(wrapper, 'decrement-button');
        decrementComponent.simulate('click');
    
        // find display and test
        const displayComponent = findByTestAttr(wrapper, 'display-counter');
        expect(displayComponent.text()).toContain(counter - 1);
    })
    
    test('error not shown when not needed', () => {
        const wrapper = incrementSetup();
        const errorComponent = findByTestAttr(wrapper, 'error-message');
        const errorHasHiddenClass = errorComponent.hasClass('hidden');
        expect(errorHasHiddenClass).toBe(true);

    })
    
    describe('click decrement when counter is 0', () => {
        let wrapper;
        beforeEach(() => {
            wrapper = incrementSetup();

            // find decrement button and click
            const decrementComponent = findByTestAttr(wrapper, 'decrement-button');
            decrementComponent.simulate('click');
            wrapper.update();
        });

        test("error should show", () => {
            const errorComponent = findByTestAttr(wrapper, 'error-message');
            const errorHasHiddenClass = errorComponent.hasClass('hidden');
            expect(errorHasHiddenClass).toBe(false);
        });

        test("error should hide on increment click", () => {
            const buttonComponent = findByTestAttr(wrapper,'increment-button');
            buttonComponent.simulate('click');
            wrapper.update();

            const errorComponent = findByTestAttr(wrapper, 'error-message');
            const errorHasHiddenClass = errorComponent.hasClass('hidden');
            expect(errorHasHiddenClass).toBe(true);
        })

        test('counter still displays 0', () => {
            const displayComponent = findByTestAttr(wrapper,'display-counter');
            expect(displayComponent.text()).toContain(0);
        })
    })
})



