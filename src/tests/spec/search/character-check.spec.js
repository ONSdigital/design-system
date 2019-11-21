import { awaitPolyfills } from 'js/polyfills/await-polyfills';
import template from 'components/search/_test-template.njk';
import CharCheck from 'components/search/character-check';

const params = {
  input: {
    id: 'search-field',
    type: 'number',
    classes: 'input--w-6',
    label: 'Filter results',
  },
  button: {
    text: 'Filter',
  },
  charcheck: 11,
  charCountSingular: '{x} more number needed',
  charCountPlural: '{x} more numbers needed',
  charCountOverLimitSingular: '{x} number too many',
  charCountOverLimitPlural: '{x} numbers too many',
};

describe('Component: Search with character check', () => {
  let wrapper, searchWrapper, searchInput, limit_readout;

  before(() => awaitPolyfills);

  beforeEach(() => {
    const html = template.render({ params });

    wrapper = document.createElement('div');
    wrapper.innerHTML = html;
    document.body.appendChild(wrapper);

    searchWrapper = document.querySelector('.js-char-check');
    searchInput = document.getElementById(params.input.id);
    limit_readout = document.getElementById(`${params.input.id}-check-remaining`);

    new CharCheck(searchWrapper);
  });

  afterEach(() => {
    if (wrapper) {
      wrapper.remove();
    }
  });

  describe('Given that the char check helper has initialised correctly', () => {
    it('the char check readout should be invisible', () => {
      expect(limit_readout.classList.contains('u-d-no')).to.equal(true);
    });
  });

  describe('Given that the user has not typed into the search input', () => {
    describe('when the user types into the search input', () => {
      const value = '1';
      beforeEach(() => {
        populateSearchInput(searchInput, value);
      });

      it('then the characters remaining readout reflect the number of characters remaining', () => {
        expect(limit_readout.innerHTML).to.equal(params.charCountPlural.replace('{x}', params.charcheck - value.length));
      });

      it('the char check readout should be visible', () => {
        expect(limit_readout.classList.contains('u-d-no')).to.equal(false);
      });
    });

    describe('when the user reaches the charcheck limit of the input', () => {
      let value = '11111111111';

      beforeEach(() => {
        populateSearchInput(searchInput, value);
      });

      it('the char check readout should be invisible', () => {
        expect(limit_readout.classList.contains('u-d-no')).to.equal(true);
      });
    });
  });

  describe('Given that the user has exceeded the charcheck limit of the input', () => {
    let value = '111111111111';

    beforeEach(() => {
      populateSearchInput(searchInput, value);
    });

    it('the char check readout should be visible', () => {
      expect(limit_readout.classList.contains('u-d-no')).to.equal(false);
    });

    it('then the characters remaining readout reflect the number of characters exceeded', () => {
      let remaining = params.charcheck - value.length;
      expect(limit_readout.innerHTML).to.equal(params.charCountOverLimitSingular.replace('{x}', Math.abs(remaining)));
    });

    it('then the input and readout should be given limit reached classes', () => {
      expect(searchInput.classList.contains('input--limit-reached')).to.equal(true);
      expect(limit_readout.classList.contains('input__limit--reached')).to.equal(true);
    });
  });

  describe('Given that the input value is cleared programatically', () => {
    beforeEach(() => {
      populateSearchInput(searchInput);
      populateSearchInput(searchInput, '');

      it('then aria-live attribute should not be added', () => {
        expect(limit_readout.hasAttribute('aria-live')).to.be.false;
      });
    });
  });
});

function populateSearchInput(searchInput, value = '1') {
  searchInput.value = value;
  const event = new CustomEvent('input');
  event.inputType = 'unitTest';
  searchInput.dispatchEvent(event);
}
