import { awaitPolyfills } from 'js/polyfills/await-polyfills';

import { sanitiseTypeaheadText } from 'components/typeahead/typeahead.helpers';

describe('Typeahead helpers', () => {
  before(() => awaitPolyfills);

  describe('When a string with uppercase characters is supplied', () => {
    it('then the string should be converted to lowercase', () => {
      const result = sanitiseTypeaheadText('This string should Be PUT into All LOWERCASE');

      expect(result).to.equal('this string should be put into all lowercase');
    });
  });

  describe('When a string with multiple spaces is supplied', () => {
    it('then all multiple spaces should be replaced with one space', () => {
      const result = sanitiseTypeaheadText('the    multiple  spaces in   this      string should  be removed');

      expect(result).to.equal('the multiple spaces in this string should be removed');
    });
  });

  describe('When a string starting and ending with spaces is supplied', () => {
    describe('and trim end is set to true', () => {
      it('then both the leading and trailing space should be removed', () => {
        const result = sanitiseTypeaheadText(' the leading and trailing space should be removed ');

        expect(result).to.equal('the leading and trailing space should be removed');
      });
    });

    describe('and trim end is set to false', () => {
      it('then only the leading space should be removed', () => {
        const result = sanitiseTypeaheadText(' only t the leading space should be removed ', [], false);

        expect(result).to.equal('only t the leading space should be removed ');
      });
    });
  });

  describe('When remove characters are provided', () => {
    describe('and the remove characters are in lowercase', () => {
      it('then all instances of the remove characters should be removed', () => {
        const result = sanitiseTypeaheadText('all instances of the letter l and e should be removed', ['l', 'e']);

        expect(result).to.equal('a instancs of th ttr and shoud b rmovd');
      });
    });

    describe('and the remove characters are in uppercase', () => {
      it('then all instances of the remove characters should be removed', () => {
        const result = sanitiseTypeaheadText('all instances of the letter a and d should be removed', ['A', 'd']);

        expect(result).to.equal('ll instnces of the letter n shoul be remove');
      });
    });
  });
});
