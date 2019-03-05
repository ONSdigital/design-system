import { awaitPolyfills } from 'js/polyfills/await-polyfills';
import template from 'components/mutually-exclusive/test-templates/_duration.njk';
import mutuallyExclusive from 'components/mutually-exclusive/mutually-exclusive';

const params = {
  id: 'address-duration',
  legend: 'How long have you lived at this address?',
  description: 'If you have lived at this address for less than a year then enter 0 into the year input.',
  mutuallyExclusive: {
    or: 'Or',
    deselectMessage: 'Selecting this will clear the date if one has been inputted',
    deselectGroupAdjective: 'cleared',
    deselectCheckboxAdjective: 'deselected',
    checkbox: {
      id: 'duration-exclusive-checkbox',
      name: 'no-duration',
      value: 'no-duration',
      label: {
        text: 'I have not moved in to this address yet'
      }
    }
  },
  years: {
    id: 'address-duration-years',
    type: 'number',
    name: 'address-duration-years',
    classes: 'input--w-2 js-exclusive-group',
    attributes: {
      min: 0,
      max: 100
    },
    suffix: {
      title: 'Years'
    }
  },
  months: {
    id: 'address-duration-months',
    type: 'number',
    name: 'address-duration-months',
    classes: 'input--w-2 js-exclusive-group',
    attributes: {
      min: 0,
      max: 11
    },
    suffix: {
      title: 'Months'
    }
  }
};

describe('Component: Mutually Exclusive Duration Pattern', () => {
  let wrapper, yearsInput, monthsInput, checkbox, ariaAlert;

  before(() => {
    return awaitPolyfills;
  });

  beforeEach(() => {
    const html = template.render({ params });

    wrapper = document.createElement('div');
    wrapper.innerHTML = html;
    document.body.appendChild(wrapper);

    yearsInput = document.getElementById(params.years.id);
    monthsInput = document.getElementById(params.months.id);
    checkbox = document.getElementById(params.mutuallyExclusive.checkbox.id);
    ariaAlert = document.querySelector('.js-exclusive-alert');

    mutuallyExclusive();
  });

  afterEach(() => {
    if (wrapper) {
      wrapper.remove();
    }
  });

  describe('Given the user populated the duration', () => {
    beforeEach(() => {
      populateDuration(yearsInput, monthsInput);
    });

    describe('when the user clicks the mutually exclusive option', () => {
      beforeEach(() => {
        checkbox.click();
      });

      it('then the inputs should be cleared', () => {
        expect(yearsInput.value).to.equal('');
        expect(monthsInput.value).to.equal('');
      });

      it('then the aria alert should tell the user that the inputs have been cleared', done => {
        setTimeout(() => {
          expect(ariaAlert.innerHTML).to.equal(
            // prettier-ignore
            `${params.years.suffix.title} ${params.mutuallyExclusive.deselectGroupAdjective}. ${params.months.suffix.title} ${params.mutuallyExclusive.deselectGroupAdjective}.`
          );
          done();
        }, 300);
      });
    });
  });

  describe('Given the user has checked the mutually exclusive checkbox', () => {
    beforeEach(() => {
      checkbox.click();
    });

    describe('when the user populates the duration fields', () => {
      beforeEach(() => {
        populateDuration(yearsInput, monthsInput);
      });

      it('then the checkbox should be unchecked', () => {
        expect(checkbox.checked).to.equal(false);
      });

      it('then the aria alert should tell the user that the checkbox has been unchecked', done => {
        setTimeout(() => {
          expect(ariaAlert.innerHTML).to.equal(
            `${params.mutuallyExclusive.checkbox.label.text} ${params.mutuallyExclusive.deselectCheckboxAdjective}.`
          );
          done();
        }, 300);
      });
    });
  });

  describe('Given the user has not populated the duration inputs or checked the checkbox', () => {
    describe('when the user populates the duration inputs', () => {
      beforeEach(() => {
        populateDuration(yearsInput, monthsInput);
      });

      it('then the aria alert shouldnt say anything', done => {
        setTimeout(() => {
          expect(ariaAlert.innerHTML).to.equal('');
          done();
        }, 300);
      });
    });

    describe('when the user clicks the mutually exclusive option', () => {
      beforeEach(() => {
        checkbox.click();
      });

      it('then the aria alert shouldnt say anything', done => {
        setTimeout(() => {
          expect(ariaAlert.innerHTML).to.equal('');
          done();
        }, 300);
      });
    });
  });
});

function populateDuration(yearsInput, monthsInput) {
  yearsInput.value = 2;
  monthsInput.value = 4;

  const event = new CustomEvent('input');

  yearsInput.dispatchEvent(event);
  monthsInput.dispatchEvent(event);
}
