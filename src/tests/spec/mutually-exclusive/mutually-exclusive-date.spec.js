import MutuallyExclusive from '../../../components/mutually-exclusive/mutually-exclusive';
import renderTemplate from '../../helpers/render-template';

const params = {
  id: 'date-mutually-exclusive',
  legendOrLabel: 'When did you leave your last paid job?',
  description: 'For example, 31 3 2018',
  day: {
    label: {
      text: 'Day',
    },
    name: 'day-exclusive',
  },
  month: {
    label: {
      text: 'Month',
    },
    name: 'month-exclusive',
  },
  year: {
    label: {
      text: 'Year',
    },
    name: 'year-exclusive',
  },
  mutuallyExclusive: {
    or: 'Or',
    deselectMessage: 'Selecting this will clear the date if one has been inputted',
    deselectGroupAdjective: 'cleared',
    deselectExclusiveOptionAdjective: 'deselected',
    exclusiveOptions: [
      {
        id: 'date-exclusive-exclusive-option',
        name: 'no-paid-job',
        value: 'no-paid-job',
        label: {
          text: 'I have never had a paid job',
        },
      },
    ],
  },
};

describe('Component: Mutually Exclusive Date Input', () => {
  let wrapper, component, dayInput, monthInput, yearInput, exclusiveOption, ariaAlert;

  beforeEach(() => {
    const html = renderTemplate('components/date-input/_test-template.njk', { params });

    wrapper = document.createElement('div');
    wrapper.innerHTML = html;
    document.body.appendChild(wrapper);

    component = document.querySelector('.ons-js-mutually-exclusive');

    dayInput = document.getElementById(`${params.id}-day`);
    monthInput = document.getElementById(`${params.id}-month`);
    yearInput = document.getElementById(`${params.id}-year`);
    exclusiveOption = document.getElementById(params.mutuallyExclusive.exclusiveOptions[0].id);
    ariaAlert = document.querySelector('.ons-js-exclusive-alert');

    new MutuallyExclusive(component);
  });

  afterEach(() => {
    if (wrapper) {
      wrapper.remove();
    }
  });

  describe('Given the user populated the date input', () => {
    beforeEach(() => {
      populateDate(dayInput, monthInput, yearInput);
    });

    describe('when the user clicks the mutually exclusive option', () => {
      beforeEach(() => {
        exclusiveOption.click();
      });

      it('then the date input should be cleared', () => {
        expect(dayInput.value).to.equal('');
        expect(monthInput.value).to.equal('');
        expect(yearInput.value).to.equal('');
      });

      it('then the aria alert should tell the user that the date input has been cleared', done => {
        setTimeout(() => {
          expect(ariaAlert.innerHTML).to.equal(
            // prettier-ignore
            `${params.day.label.text} ${params.mutuallyExclusive.deselectGroupAdjective}. ${params.month.label.text} ${params.mutuallyExclusive.deselectGroupAdjective}. ${params.year.label.text} ${params.mutuallyExclusive.deselectGroupAdjective}.`,
          );
          done();
        }, 300);
      });
    });
  });

  describe('Given the user has checked the mutually exclusive exclusive option', () => {
    beforeEach(() => {
      exclusiveOption.click();
    });

    describe('when the user populates the dateInput', () => {
      beforeEach(() => {
        populateDate(dayInput, monthInput, yearInput);
      });

      it('then the exclusive option should be unchecked', () => {
        expect(exclusiveOption.checked).to.equal(false);
      });

      it('then the aria alert should tell the user that the exclusive option has been unchecked', done => {
        setTimeout(() => {
          expect(ariaAlert.innerHTML).to.equal(
            `${params.mutuallyExclusive.exclusiveOptions[0].label.text} ${params.mutuallyExclusive.deselectExclusiveOptionAdjective}.`,
          );
          done();
        }, 300);
      });
    });
  });

  describe('Given the user has not populated the date input or checked the exclusive option', () => {
    describe('when the user populates the date input', () => {
      beforeEach(() => {
        populateDate(dayInput, monthInput, yearInput);
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
        exclusiveOption.click();
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

function populateDate(dayInput, monthInput, yearInput) {
  dayInput.value = 14;
  monthInput.value = 12;
  yearInput.value = 2018;

  const event = new CustomEvent('input');

  dayInput.dispatchEvent(event);
  monthInput.dispatchEvent(event);
  yearInput.dispatchEvent(event);
}
