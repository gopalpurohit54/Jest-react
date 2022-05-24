import { ShallowWrapper } from "enzyme"
import checkPropTypes from 'check-prop-types'
import { createStore, applyMiddleware } from 'redux';

import jottoRootReducer from '../src/jotto/redux/reducers'
import { middlewares as jottoMiddlwares } from "../src/jotto/redux/store";

/**
 * Return node(s) with the given data-test attribute
 * @param {ShallowWrapper} wrapper - Enzyme shallow wrapper
 * @param {string} val - Value for data-test attribute for search
 * @returns {ShallowWrapper}
 */
export const findByAttribute = (wrapper, val) => {
    return wrapper.find(`[data-test="${val}"]`)
}

/**
 * Validate props passed to the component
 * @param {JSX.Element} component - Component for which we want to check props
 * @param {object} conformingProps - Expected props
 */
export const checkProps = (component, conformingProps) => {
    const propError = checkPropTypes(
        component.propTypes,
        conformingProps,
        'prop',
        component.name
    );
    expect(propError).toBeUndefined();
}

/**
 * Create a testing store with imported reducers, middleware and initial state
 * @function jottoStoreFactory
 * @param {object} initialState - Initial state of store
 * @returns {Store} - Redux store
 */
export const jottoStoreFactory = (initialState) => {
    const createStoreWithMiddleware = applyMiddleware(...jottoMiddlwares);
    return createStore(jottoRootReducer, initialState, createStoreWithMiddleware);
}