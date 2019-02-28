import { awaitPolyfills } from 'js/polyfills/await-polyfills';
import template from 'components/input/_template.njk';
import mutuallyExclusive from 'components/mutually-exclusive/mutually-exclusive';

const params = {
  id: 'currency',
  type: 'number',
  classes: 'input--w-5',
  attributes: {
    min: 0
  },
  label: {
    text: 'What is your annual income before tax?'
  },
  prefix: {
    title: 'Pounds',
    text: '£'
  },
  mutuallyExclusive: {
    or: 'Or',
    deselectMessage: 'Selecting this will clear your inputted annual income',
    deselectGroupAdjective: 'cleared',
    deselectCheckboxAdjective: 'deselected',
    checkbox: {
      id: 'currency-checkbox',
      name: 'no-currency',
      value: 'no-currency',
      label: {
        text: 'I prefer not to say'
      }
    }
  }
};

describe('Component: Mutually Exclusive Number Input', () => {
  let wrapper, input, checkbox, ariaAlert;

  before(() => {
    return awaitPolyfills;
  });

  beforeEach(() => {
    const html = template.render({ params });

    wrapper = document.createElement('div');
    wrapper.innerHTML = html;
    document.body.appendChild(wrapper);

    input = document.getElementById(params.id);
    checkbox = document.getElementById(params.mutuallyExclusive.checkbox.id);
    ariaAlert = document.querySelector('.js-exclusive-alert');

    mutuallyExclusive();
  });

  afterEach(() => {
    if (wrapper) {
      wrapper.remove();
    }
  });

  describe('Given the user populated the number input', () => {
    beforeEach(() => {
      populateInput(input);
    });

    describe('when the user clicks the mutually exclusive option', () => {
      beforeEach(() => {
        checkbox.click();
      });

      it('then the number input should be cleared', () => {
        expect(input.value).to.equal('');
      });

      it('then the aria alert should tell the user that the number input has been cleared', () => {
        expect(ariaAlert.innerHTML).to.equal(`${params.label.text} ${params.mutuallyExclusive.deselectGroupAdjective}.`);
      });
    });
  });

  describe('Given the user has checked the mutually exclusive checkbox', () => {
    beforeEach(() => {
      checkbox.click();
    });

    describe('when the user populates the number input', () => {
      beforeEach(() => {
        populateInput(input);
      });

      it('then the checkbox should be unchecked', () => {
        expect(checkbox.checked).to.equal(false);
      });

      it('then the aria alert should tell the user that the checkbox has been unchecked', () => {
        expect(ariaAlert.innerHTML).to.equal(
          `${params.mutuallyExclusive.checkbox.label.text} ${params.mutuallyExclusive.deselectCheckboxAdjective}.`
        );
      });
    });
  });

  describe('Given the user has not populated the number input or checked the checkbox', () => {
    describe('when the user populates the number input', () => {
      beforeEach(() => {
        populateInput(input);
      });

      it('then the aria alert shouldnt say anything', () => {
        expect(ariaAlert.innerHTML).to.equal('');
      });
    });

    describe('when the user clicks the mutually exclusive option', () => {
      beforeEach(() => {
        checkbox.click();
      });

      it('then the aria alert shouldnt say anything', () => {
        expect(ariaAlert.innerHTML).to.equal('');
      });
    });
  });
});

function populateInput(input) {
  input.value = 25000;
  const event = new CustomEvent('input');
  input.dispatchEvent(event);
}
