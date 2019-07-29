import { awaitPolyfills } from 'js/polyfills/await-polyfills';
import template from 'components/address/_test-template.njk';
import '../../../scss/main.scss';

import AddressLookup from '../../../components/address/address-lookup';

const params = {
  id: 'address',
  legend: 'What is your address?',
  legendClasses: 'u-vh',
  organisation: {
    label: 'Organisation',
  },
  line1: {
    label: 'Address line 1',
  },
  line2: {
    label: 'Address line 2',
  },
  line3: {
    label: 'Address line 3',
  },
  town: {
    label: 'Town or City',
  },
  county: {
    label: 'County',
  },
  postcode: {
    label: 'Postcode',
  },
  uprn: {},
  typeahead: {
    label: {
      text: 'Enter your address or postcode',
    },
    instructions:
      // eslint-disable-next-line prettier/prettier
      'Use up and down keys to navigate addresses once you\'ve typed more than two characters. Use the enter key to select a address. Touch device users, explore by touch or with swipe gestures.',
    content: {
      no_results: 'No addresses found',
      aria_no_results: 'No addresses found for the query',
      aria_you_have_selected: 'You have selected',
      aria_min_chars: 'Type in 5 or more characters for addresses.',
      aria_one_result: 'There is one address available.',
      aria_n_results: 'There are {n} addresses available.',
      aria_limited_results: 'Results have been limited to 10 addresses. Type more characters to refine your search.',
      more_results: 'Continue typing to refine addresses',
      results_title: 'Select an address',
      lookup_error: 'There was an error looking up up your address. Enter your address manually.',
      select_address_error: 'There was an error. Select and address.',
    },
    autocomplete: 'new-address',
  },
  or: 'Or',
  searchButton: 'Search for an address',
  manualButton: 'Manually enter address',
  selectError: 'Select an address to continue.',
};

describe.only('Address component', function() {
  before(function(done) {
    awaitPolyfills.then(() => {
      this.rewiremock = require('rewiremock/webpack').default;
      done();
    });
  });

  beforeEach(function() {
    const component = renderComponent(params);

    Object.keys(component).forEach(key => {
      this[key] = component[key];
    });
  });

  afterEach(function() {
    if (this.wrapper) {
      this.wrapper.remove();
    }
  });

  describe('Before the component initialises', function() {
    it('the manual fields should be display block', function() {
      expect(getComputedStyle(this.manualWrapper).display).to.equal('block');
    });

    it('the search fields should be display none', function() {
      expect(getComputedStyle(this.searchWrapper).display).to.equal('none');
    });

    it('the search address button container should be display none', function() {
      expect(getComputedStyle(this.searchButtonContainer).display).to.equal('none');
    });
  });

  describe('When the component initialises', function() {
    describe('if organisation has a value', function() {
      beforeEach(function() {
        this.organisation.value = 'Test';
        this.addressLookup = new AddressLookup(this.context);
      });

      initalisedWithValueTests();
    });

    describe('if line 1 has a value', function() {
      beforeEach(function() {
        this.line1.value = 'Test';
        this.addressLookup = new AddressLookup(this.context);
      });

      initalisedWithValueTests();
    });

    describe('if line 2 has a value', function() {
      beforeEach(function() {
        this.line2.value = 'Test';
        this.addressLookup = new AddressLookup(this.context);
      });

      initalisedWithValueTests();
    });

    describe('if line 3 has a value', function() {
      beforeEach(function() {
        this.line3.value = 'Test';
        this.addressLookup = new AddressLookup(this.context);
      });

      initalisedWithValueTests();
    });

    describe('if town has a value', function() {
      beforeEach(function() {
        this.town.value = 'Test';
        this.addressLookup = new AddressLookup(this.context);
      });

      initalisedWithValueTests();
    });

    describe('if county has a value', function() {
      beforeEach(function() {
        this.county.value = 'Test';
        this.addressLookup = new AddressLookup(this.context);
      });

      initalisedWithValueTests();
    });

    describe('if none of the manual inputs have a value', function() {
      beforeEach(function() {
        this.addressLookup = new AddressLookup(this.context);
      });

      it('the manual fields should be display none', function() {
        expect(getComputedStyle(this.manualWrapper).display).to.equal('none');
      });

      it('the search fields should be display block', function() {
        expect(getComputedStyle(this.searchWrapper).display).to.equal('block');
      });

      it('the search address button container should be display block', function() {
        expect(getComputedStyle(this.searchButtonContainer).display).to.equal('block');
      });
    });

    describe('if the mode is search and the mode is toggled', function() {
      beforeEach(function() {
        this.addressLookup = new AddressLookup(this.context);
        this.setManualModeSpy = chai.spy.on(this.addressLookup, 'setManualMode');
        this.typeaheadInput.value = 'Text';
        this.addressLookup.toggleMode();
      });

      it('setManualMode should be called with true, false', function() {
        expect(this.setManualModeSpy).to.have.been.called.with.exactly(true, false);
      });

      it('then the search wrapper should become display none', function() {
        expect(getComputedStyle(this.searchWrapper).display).to.equal('none');
      });

      it('then the manual wrapper should become display block', function() {
        expect(getComputedStyle(this.manualWrapper).display).to.equal('block');
      });

      it('then the typeahead input should be cleared', function() {
        expect(this.typeaheadInput.value).to.equal('');
      });

      it('then manual mode should be set to true', function() {
        expect(this.addressLookup.manualMode).to.be.true;
      });
    });

    describe('if the mode is search and the mode is toggled with clear input set to true', function() {
      beforeEach(function() {
        this.addressLookup = new AddressLookup(this.context);
        this.setManualModeSpy = chai.spy.on(this.addressLookup, 'setManualMode');
        this.unsetResultsSpy = chai.spy.on(this.addressLookup.typeahead, 'unsetResults');
        this.typeaheadInput.value = 'Text';
        this.addressLookup.toggleMode(true);
      });

      it('setManualMode should be called with true, true', function() {
        expect(this.setManualModeSpy).to.have.been.called.with.exactly(true, true);
      });

      it('unsetResults should be called', function() {
        expect(this.unsetResultsSpy).to.have.been.called();
      });
    });

    describe('if the mode is manual and the mode is toggled', function() {
      beforeEach(function() {
        this.addressLookup = new AddressLookup(this.context);
        this.setManualModeSpy = chai.spy.on(this.addressLookup, 'setManualMode');
        this.addressLookup.manualMode = true;
        this.addressLookup.toggleMode();
      });

      it('setManualMode should be called with false, false', function() {
        expect(this.setManualModeSpy).to.have.been.called.with.exactly(false, false);
      });

      it('then the search wrapper should become display block', function() {
        expect(getComputedStyle(this.searchWrapper).display).to.equal('block');
      });

      it('then the manual wrapper should become display none', function() {
        expect(getComputedStyle(this.manualWrapper).display).to.equal('none');
      });

      it('then manual mode should be set to false', function() {
        expect(this.addressLookup.manualMode).to.be.false;
      });
    });

    describe('if the mode is manual and the mode is toggled with clearInputs set to true', function() {
      beforeEach(function() {
        this.addressLookup = new AddressLookup(this.context);
        this.setManualModeSpy = chai.spy.on(this.addressLookup, 'setManualMode');
        this.unsetResultsSpy = chai.spy.on(this.addressLookup.typeahead, 'unsetResults');
        this.addressLookup.manualMode = true;
        this.addressLookup.toggleMode(true);
      });

      it('setManualMode should be called with false, true', function() {
        expect(this.setManualModeSpy).to.have.been.called.with.exactly(false, true);
      });

      it('unsetResults should be called', function() {
        expect(this.unsetResultsSpy).to.have.been.called();
      });
    });

    describe('if clearManualInputs is called', function() {
      beforeEach(function() {
        this.organisation.value = 'Test';
        this.line1.value = 'Test';
        this.line2.value = 'Test';
        this.line3.value = 'Test';
        this.town.value = 'Test';
        this.county.value = 'Test';
        this.postcode.value = 'Test';

        this.addressLookup = new AddressLookup(this.context);
        this.addressLookup.addressSelected = true;

        this.triggerManualInputsChangesSpy = chai.spy.on(this.addressLookup, 'triggerManualInputsChanges');

        this.addressLookup.clearManualInputs();
      });

      it('then all manual inputs should have their values cleared', function() {
        expect(this.organisation.value).to.equal('');
        expect(this.line1.value).to.equal('');
        expect(this.line2.value).to.equal('');
        expect(this.line3.value).to.equal('');
        expect(this.town.value).to.equal('');
        expect(this.county.value).to.equal('');
        expect(this.postcode.value).to.equal('');
      });

      it('then triggerManualInputsChanges should be called', function() {
        expect(this.triggerManualInputsChangesSpy).to.have.been.called();
      });

      it('then addressSelected should be set to false', function() {
        expect(this.addressLookup.addressSelected).to.be.false;
      });
    });

    describe('if clearManualInputs is called with false', function() {
      beforeEach(function() {
        this.addressLookup = new AddressLookup(this.context);
        this.triggerManualInputsChangesSpy = chai.spy.on(this.addressLookup, 'triggerManualInputsChanges');

        this.addressLookup.clearManualInputs(false);
      });

      it('then triggerManualInputsChanges should not have be called', function() {
        expect(this.triggerManualInputsChangesSpy).to.not.have.been.called();
      });
    });
  });
});

function renderComponent(params) {
  const html = template.render({ params });

  const wrapper = document.createElement('div');

  wrapper.innerHTML = html;
  document.body.appendChild(wrapper);

  const context = wrapper.querySelector('.js-address');
  const manualWrapper = context.querySelector('.address__manual');
  const searchWrapper = context.querySelector('.address__search');
  const searchButtonContainer = context.querySelector('.js-address-search-btn-container');
  const organisation = context.querySelector('.js-address-organisation');
  const line1 = context.querySelector('.js-address-line-1');
  const line2 = context.querySelector('.js-address-line-2');
  const line3 = context.querySelector('.js-address-line-3');
  const town = context.querySelector('.js-address-town');
  const county = context.querySelector('.js-address-county');
  const postcode = context.querySelector('.js-address-postcode');
  const typeaheadInput = context.querySelector('.js-typeahead-input');

  return {
    wrapper,
    context,
    manualWrapper,
    searchWrapper,
    searchButtonContainer,
    organisation,
    line1,
    line2,
    line3,
    town,
    county,
    postcode,
    typeaheadInput,
  };
}

function initalisedWithValueTests() {
  it('then the manual inputs should be visible', function() {
    expect(getComputedStyle(this.manualWrapper).display).to.equal('block');
  });

  it('the search fields should be display none', function() {
    expect(getComputedStyle(this.searchWrapper).display).to.equal('none');
  });

  it('the search address button container should be display none', function() {
    expect(getComputedStyle(this.searchButtonContainer).display).to.equal('block');
  });
}
