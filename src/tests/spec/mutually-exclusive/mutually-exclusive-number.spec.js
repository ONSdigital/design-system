import MutuallyExclusive from '../../../components/mutually-exclusive/mutually-exclusive';
import renderTemplate from '../../helpers/render-template';

const params = {
  id: 'currency',
  type: 'number',
  legend: 'What is your annual income before tax in 2018/19?',
  width: '5',
  attributes: {
    min: 0,
  },
  label: {
    text: 'Gross annual income',
  },
  prefix: {
    title: 'Pounds',
    text: '£',
  },
  mutuallyExclusive: {
    or: 'Or',
    deselectMessage: 'Selecting this will clear your inputted annual income',
    deselectGroupAdjective: 'cleared',
    deselectExclusiveOptionAdjective: 'deselected',
    exclusiveOptions: [
      {
        id: 'currency-exclusive-option',
        name: 'no-currency',
        value: 'no-currency',
        label: {
          text: 'I prefer not to say',
        },
      },
    ],
  },
};

describe('Component: Mutually Exclusive Number Input', () => {
  let wrapper, component, input, exclusiveOption, ariaAlert;

  beforeEach(() => {
    const html = renderTemplate('components/input/_test-template.njk', { params });

    wrapper = document.createElement('div');
    wrapper.innerHTML = html;
    document.body.appendChild(wrapper);

    component = document.querySelector('.ons-js-mutually-exclusive');
    input = document.getElementById(params.id);
    exclusiveOption = document.getElementById(params.mutuallyExclusive.exclusiveOptions[0].id);
    ariaAlert = document.querySelector('.ons-js-exclusive-alert');

    new MutuallyExclusive(component);
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
        exclusiveOption.click();
      });

      it('then the number input should be cleared', () => {
        expect(input.value).to.equal('');
      });

      it('then the aria alert should tell the user that the number input has been cleared', done => {
        setTimeout(() => {
          expect(ariaAlert.innerHTML).to.equal(`${params.label.text} ${params.mutuallyExclusive.deselectGroupAdjective}.`);
          done();
        }, 300);
      });
    });
  });

  describe('Given the user has checked the mutually exclusive exclusive option', () => {
    beforeEach(() => {
      exclusiveOption.click();
    });

    describe('when the user populates the number input', () => {
      beforeEach(() => {
        populateInput(input);
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

  describe('Given the user has not populated the number input or checked the exclusive option', () => {
    describe('when the user populates the number input', () => {
      beforeEach(() => {
        populateInput(input);
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

function populateInput(input) {
  input.value = 25000;
  const event = new CustomEvent('input');
  input.dispatchEvent(event);
}
