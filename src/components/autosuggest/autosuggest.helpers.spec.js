import { sanitiseAutosuggestText } from './autosuggest.helpers';

describe('module: autosuggest.helpers', () => {
  describe('function: sanitiseAutosuggestText', () => {
    it.each([
      ['ABC', 'abc'],
      ['ABCdEF', 'abcdef'],
      ['1ABC23', '1abc23'],
    ])('transforms input characters into lower case (%s)', (input, expectedResult) => {
      const result = sanitiseAutosuggestText(input);
      expect(result).toBe(expectedResult);
    });

    it.each([
      ['abccdefge', [], 'abccdefge'],
      ['abccdefge', ['c'], 'abdefge'],
      ['abccdefge', ['c', 'E'], 'abdfg'],
    ])('removes unwanted characters (%s)', (input, removeChars, expectedResult) => {
      const result = sanitiseAutosuggestText(input, removeChars);
      expect(result).toBe(expectedResult);
    });

    it.each([
      ['a    b', 'a b'],
      ['a    b    c', 'a b c'],
      ['a  \n\n\t  b', 'a b'],
    ])('replaces blocks of whitespace with a single space character', (input, expectedResult) => {
      const result = sanitiseAutosuggestText(input);
      expect(result).toBe(expectedResult);
    });

    it.each([
      ['a&b', 'a%26b'],
      ['a&&b', 'a%26%26b'],
      ['a&b&c', 'a%26b%26c'],
    ])('escapes the "&" character for use in a URL', (input, expectedResult) => {
      const result = sanitiseAutosuggestText(input);
      expect(result).toBe(expectedResult);
    });

    it.each([
      ['1a', '1a'],
      ['1aa', '1aa'],
      ['1aaa', '1aaa'],
      ['1aaaa', '1aaaa'],
      ['11aaaa', '11aaaa'],
      ['11aaaa22bbb', '11aaaa22bbb'],
      ['11aaaa2b33ccc', '11aaaa2b33ccc'],
    ])(
      'does not a space after a digit that is followed by at least 3 letters when `sanitisedQuerySplitNumsChars` is false',
      (input, expectedResult) => {
        const result = sanitiseAutosuggestText(input, [], false);
        expect(result).toBe(expectedResult);
      },
    );

    it.each([
      ['1a', '1a'],
      ['1aa', '1aa'],
      ['1aaa', '1 aaa'],
      ['1aaaa', '1 aaaa'],
      ['11aaaa', '11 aaaa'],
      ['11aaaa22bbb', '11 aaaa22 bbb'],
      ['11aaaa2b33ccc', '11 aaaa2b33 ccc'],
    ])(
      'adds a space after a digit that is followed by at least 3 letters when `sanitisedQuerySplitNumsChars` is true',
      (input, expectedResult) => {
        const result = sanitiseAutosuggestText(input, [], true);
        expect(result).toBe(expectedResult);
      },
    );

    it('trims whitespace from start and end of input when `trimEnd` is true', () => {
      const result = sanitiseAutosuggestText('    1a    ', [], false, true);
      expect(result).toBe('1a');
    });

    it('trims whitespace from only the start of input when `trimEnd` is false', () => {
      const result = sanitiseAutosuggestText('    1a    ', [], false, false);
      // The trailing space is consolidated into 1 whitespace due to a transformation that
      // this implementation applies.
      expect(result).toBe('1a ');
    });
  });
});
