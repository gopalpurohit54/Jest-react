import { jottoStoreFactory } from "../../test/testUtils";
import { guessWord } from './redux/actions';

describe('guessWord action dispatcher', () => {
    const secretWord = 'party';
    const unsuccessfulGuess = 'train';
    
    describe('no guessed words', () => {
        let store;
        const initialState = { secretWord };
        beforeEach(() => {
            store = jottoStoreFactory(initialState);
        });
        test('updates state correctly for unsuccessful guess', () => {
            store.dispatch(guessWord(unsuccessfulGuess));
            const expectedState = {
                secretWord,
                success: false,
                guessedWords: [
                    { guessedWord: unsuccessfulGuess, letterMatchCount: 3 },
                ]
            }
            expect(store.getState()).toEqual(expectedState);
        });
        test('updates state correctly for successful guess', () => {
            store.dispatch(guessWord(secretWord));
            const expectedState = {
                secretWord,
                success: true,
                guessedWords: [
                    { guessedWord: secretWord, letterMatchCount: secretWord.length },
                ]
            }
            expect(store.getState()).toEqual(expectedState)
        });
    })

    describe('guessed words', () => {
        let store;
        const initialState = {
            secretWord,
            success: false,
            guessedWords: [
                { guessedWord: 'agile', letterMatchCount: 1 },
                { guessedWord: 'party', letterMatchCount: 5 },
            ]
        };
        beforeEach(() => {
            store = jottoStoreFactory(initialState);
        });
        test('updates state correctly for unsuccessful guess', () => {
            store.dispatch(guessWord(unsuccessfulGuess));
            const expectedState = {
                secretWord,
                success: false,
                guessedWords: [
                    ...initialState.guessedWords,
                    { guessedWord: unsuccessfulGuess, letterMatchCount: 3 },
                ]
            }
            expect(store.getState()).toEqual(expectedState)
        });
        test('updates state correctly for successful guess', () => {
            store.dispatch(guessWord(secretWord));
            const expectedState = {
                secretWord,
                success: true,
                guessedWords: [
                    ...initialState.guessedWords,
                    { guessedWord: secretWord, letterMatchCount: secretWord.length },
                ]
            }
            expect(store.getState()).toEqual(expectedState)
        });
    })
})
