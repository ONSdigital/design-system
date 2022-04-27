import MutuallyExclusive from '../../../components/mutually-exclusive/mutually-exclusive';
import renderTemplate from '../../helpers/render-template';

const params = {
  id: 'email',
  type: 'email',
  legend: 'Get a confirmation email',
  label: {
    text: 'Enter an email',
  },
  mutuallyExclusive: {
    or: 'Or',
    deselectMessage: 'Selecting this will clear your email',
    deselectGroupAdjective: 'cleared',
    deselectExclusiveOptionAdjective: 'deselected',
    exclusiveOptions: [
      {
        id: 'email-exclusive-option',
        name: 'no-email',
        value: 'no-email',
        label: {
          text: 'I dont want to receive a confirmation email',
        },
      },
    ],
  },
};

describe('Component: Mutually Exclusive Email Input', () => {
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

  describe('Given the user populated the email input', () => {
    beforeEach(() => {
      populateInput(input);
    });

    describe('when the user clicks the mutually exclusive option', () => {
      beforeEach(() => {
        exclusiveOption.click();
      });

      it('then the email input should be cleared', () => {
        expect(input.value).to.equal('');
      });

      it('then the aria alert should tell the user that the email input has been cleared', done => {
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

    describe('when the user populates the email input', () => {
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

  describe('Given the user has not populated the email input or checked the exclusive option', () => {
    describe('when the user populates the email input', () => {
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
  input.value = 'email@email.com';
  const event = new CustomEvent('input');
  input.dispatchEvent(event);
}
