import { awaitPolyfills } from 'js/polyfills/await-polyfills';
import template from 'components/input/src/_template.njk';
import mutuallyExclusive from 'components/mutually-exclusive/src/mutually-exclusive';

const params = {
  id: 'email',
  type: 'email',
  attributes: {
    min: 0,
    required: true
  },
  label: {
    text: 'Enter a email'
  },
  mutuallyExclusive: {
    or: 'Or',
    deselectMessage: 'Selecting this will clear your email',
    deselectAdjective: 'deselected',
    checkbox: {
      id: 'email-checkbox',
      name: 'no-email',
      value: 'no-email',
      label: {
        text: 'I dont want to receive a confirmation email'
      }
    }
  }
};

describe('Component: Mutually Exclusive Email Input', () => {
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

  describe('Given the user populated the email input', () => {
    beforeEach(() => {
      populateInput(input);
    });

    describe('when the user clicks the mutually exclusive option', () => {
      beforeEach(() => {
        checkbox.click();
      });

      it('then the email input should be cleared', () => {
        expect(input.value).to.equal('');
      });

      // it('then the aria alert should tell the user that the email input has been cleared', () => {
      //   expect(ariaAlert.innerHTML).to.equal(`${params.label.text} cleared.`);
      // });
    });
  });

  describe('Given the user has checked the mutually exclusive checkbox', () => {
    beforeEach(() => {
      checkbox.click();
    });

    describe('when the user populates the email input', () => {
      beforeEach(() => {
        populateInput(input);
      });

      it('then the checkbox should be unchecked', () => {
        expect(checkbox.checked).to.equal(false);
      });

      // it('then the aria alert should tell the user that the checkbox has been unchecked', () => {
      //   expect(ariaAlert.innerHTML).to.equal(`"${params.checkbox.label.text}" deselected.`);
      // });
    });
  });

  // describe('Given the user has not populated the email input or checked the checkbox', () => {
  //   describe('when the user populates the email input', () => {
  //     beforeEach(() => {
  //       populateInput(input);
  //     });

  //     it('then the aria alert shouldnt say anything', () => {
  //       expect(ariaAlert.innerHTML).to.equal('');
  //     });
  //   });

  //   describe('when the user clicks the mutually exclusive option', () => {
  //     beforeEach(() => {
  //       checkbox.click();
  //     });

  //     it('then the aria alert shouldnt say anything', () => {
  //       expect(ariaAlert.innerHTML).to.equal('');
  //     });
  //   });
  // });
});

function populateInput(input) {
  input.value = 'email@email.com';
  const event = new CustomEvent('input');
  input.dispatchEvent(event);
}
