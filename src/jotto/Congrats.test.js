import React from 'react';
import { shallow } from 'enzyme';

import { findByAttribute, checkProps } from '../../test/testUtils'
import Congrats from './Congrats';

// Props that the component will be
const defaultProps = { success: false }

/**
 * Factory function to create a ShallowWrapper for congrats component
 * @function setup
 * @param {object} props - Component specific props
 * @returns {ShallowWrapper}
 */
const setup = (props={}) => {
    const setupProps = { ...defaultProps, ...props }
    return shallow(<Congrats {...setupProps}/>)
}

test("renders without error", () => {
    const expectedProps = { success: false };
    let wrapper = setup(expectedProps);
    const component = findByAttribute(wrapper, 'component-congrats');
    expect(component.length).toBe(1)
});

test("renders no text when 'success' props is false", () => {
    const wrapper = setup({ success: false });
    const component = findByAttribute(wrapper, 'component-congrats')
    expect(component.text()).toBe('');
});

test("renders non empty congrats when 'success' prop is true", () => {
    const wrapper = setup({ success: true });
    const message = findByAttribute(wrapper, 'congrats-message');
    expect(message.text().length).not.toBe(0);
})

test('does not throw warning with expected props', () => {
    const expectedProps = { success: false };
    checkProps(Congrats, expectedProps)
})