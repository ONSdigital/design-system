import { sanitiseAutosuggestText } from './autosuggest.helpers';

describe('FOR: module: autosuggest.helpers', () => {
    describe('GIVEN: function: sanitiseAutosuggestText', () => {
        describe('WHEN: only input parameter is set', () => {
            test.each([
                ['ABC', 'abc'],
                ['ABCdEF', 'abcdef'],
                ['1ABC23', '1abc23'],
            ])('THEN: it transforms input characters into lower case (%s)', (input, expectedResult) => {
                const result = sanitiseAutosuggestText(input);
                expect(result).toBe(expectedResult);
            });

            test.each([
                ['a    b', 'a b'],
                ['a    b    c', 'a b c'],
                ['a  \n\n\t  b', 'a b'],
            ])('THEN: it replaces blocks of whitespace with a single space character', (input, expectedResult) => {
                const result = sanitiseAutosuggestText(input);
                expect(result).toBe(expectedResult);
            });

            test.each([
                ['a&b', 'a%26b'],
                ['a&&b', 'a%26%26b'],
                ['a&b&c', 'a%26b%26c'],
            ])('THEN: it escapes the "&" character for use in a URL', (input, expectedResult) => {
                const result = sanitiseAutosuggestText(input);
                expect(result).toBe(expectedResult);
            });

            test.each([
                ['abccdefge', [], 'abccdefge'],
                ['abccdefge', ['c'], 'abdefge'],
                ['abccdefge', ['c', 'E'], 'abdfg'],
            ])('THEN: it removes unwanted characters (%s)', (input, removeChars, expectedResult) => {
                const result = sanitiseAutosuggestText(input, removeChars);
                expect(result).toBe(expectedResult);
            });
        });

        describe('WHEN: `sanitisedQuerySplitNumsChars` is false', () => {
            test.each([
                ['1a', '1a'],
                ['1aa', '1aa'],
                ['1aaa', '1aaa'],
                ['1aaaa', '1aaaa'],
                ['11aaaa', '11aaaa'],
                ['11aaaa22bbb', '11aaaa22bbb'],
                ['11aaaa2b33ccc', '11aaaa2b33ccc'],
            ])('THEN: it does not a space after a digit that is followed by at least 3 letters', (input, expectedResult) => {
                const result = sanitiseAutosuggestText(input, [], false);
                expect(result).toBe(expectedResult);
            });
        });

        describe('WHEN: `sanitisedQuerySplitNumsChars` is true', () => {
            test.each([
                ['1a', '1a'],
                ['1aa', '1aa'],
                ['1aaa', '1 aaa'],
                ['1aaaa', '1 aaaa'],
                ['11aaaa', '11 aaaa'],
                ['11aaaa22bbb', '11 aaaa22 bbb'],
                ['11aaaa2b33ccc', '11 aaaa2b33 ccc'],
            ])('THEN: it adds a space after a digit that is followed by at least 3 letters', (input, expectedResult) => {
                const result = sanitiseAutosuggestText(input, [], true);
                expect(result).toBe(expectedResult);
            });
        });

        describe('WHEN: `trimEnd` is true', () => {
            const result = sanitiseAutosuggestText('    1a    ', [], false, true);
            test('THEN: it trims whitespace from start and end of input', () => {
                expect(result).toBe('1a');
            });
        });

        describe('WHEN: `trimEnd` is false', () => {
            const result = sanitiseAutosuggestText('    1a    ', [], false, false);
            // The trailing space is consolidated into 1 whitespace due to a transformation that
            // this implementation applies.
            test('THEN: it trims whitespace from only the start of input', () => {
                expect(result).toBe('1a ');
            });
        });
    });
});
