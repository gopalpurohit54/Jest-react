import React from 'react';
import { shallow } from 'enzyme';
import { findByAttribute, checkProps } from '../../test/testUtils'
import GuessedWords from './GuessedWords';

const defaultProps = {
    guessedWords: [
        { guessedWord: 'train', letterMatchCount: 3 },
    ],
};

const setup = (props = null) => {
    const setupProps = { ...defaultProps, ...props };
    return shallow(<GuessedWords { ...setupProps } />);
};


test('does not throw warning with expected props', () => {
    checkProps(GuessedWords, defaultProps);
});

describe('if there are no words guessed', () => {
    let wrapper;
    beforeEach(() => {
        wrapper = setup({ guessedWords: [] });
    })
    test("renders without errors", () => {
        const component = findByAttribute(wrapper, 'component-guessed-words');
        expect(component.length).toBe(1);
    });

    test('renders instruction to guess words', () => {
        const instructions = findByAttribute(wrapper, 'guess-instructions');
        expect(instructions.text().length).not.toBe(0);
    })

});

describe('if there are words guessed', () => {
    let wrapper;
    const guessedWords = [
        { guessedWord: 'train', letterMatchCount: 3 },
        { guessedWord: 'agile', letterMatchCount: 1 },
        { guessedWord: 'party', letterMatchCount: 5 },
    ]
    beforeEach(() => {
        wrapper = setup({ guessedWords });
    })

    test("renders without errors", () => {
        const component = findByAttribute(wrapper, 'component-guessed-words');
        expect(component.length).toBe(1);
    });

    test("renders guessed words section", () => {
        const guessedWordsNode = findByAttribute(wrapper, 'guessed-words');
        expect(guessedWordsNode.length).toBe(1);
    });
    
    test("correct number of guessed words", () => {
        const guessedWordsNode = findByAttribute(wrapper, 'guessed-word');
        expect(guessedWordsNode.length).toBe(guessedWords.length);
    });
});
