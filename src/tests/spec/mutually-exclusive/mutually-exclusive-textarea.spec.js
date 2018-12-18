import { awaitPolyfills } from 'js/polyfills/await-polyfills';
import template from 'components/textarea/src/_template.njk';
import mutuallyExclusive from 'js/mutually-exclusive';
import characterLimit from 'components/textarea/src/character-limit';

const params = {
  id: 'feedback',
  name: 'feedback',
  classes: 'input--w-30',
  label: {
    text: 'Please provide some feedback',
    description: 'For example describe any difficulties you experienced in the use of this service'
  },
  maxlength: 200,
  charCountSingular: 'You have {x} character remaining',
  charCountPlural: 'You have {x} characters remaining',
  mutuallyExclusive: {
    or: 'Or',
    deselectMessage: 'Selecting this will clear your feedback',
    deselectAdjective: 'deselected',
    checkbox: {
      id: 'feedback-checkbox',
      name: 'no-feedback',
      value: 'no-feedback',
      label: {
        text: 'I dont want to provide feedback'
      }
    }
  }
};

describe('Component: Mutually Exclusive Textarea', () => {
  let wrapper, textarea, textareaRemaining, checkbox, ariaAlert;

  before(() => {
    return awaitPolyfills;
  });

  beforeEach(() => {
    const html = template.render({ params });

    wrapper = document.createElement('div');
    wrapper.innerHTML = html;
    document.body.appendChild(wrapper);

    textarea = document.getElementById(params.id);
    textareaRemaining = document.getElementById(`${params.id}-lim-remaining`);
    checkbox = document.getElementById(params.mutuallyExclusive.checkbox.id);
    ariaAlert = document.querySelector('.js-exclusive-alert');

    characterLimit();
    mutuallyExclusive();
  });

  afterEach(() => {
    if (wrapper) {
      wrapper.remove();
    }
  });

  describe('Given the user populated the textarea', () => {
    beforeEach(() => {
      populateTextarea(textarea);
    });

    describe('when the user clicks the mutually exclusive option', () => {
      beforeEach(() => {
        checkbox.click();
      });

      it('then the textarea should be cleared', () => {
        expect(textarea.value).to.equal('');
      });

      it('then the characters remaining readout should be reset', () => {
        expect(textareaRemaining.innerHTML).to.equal(params.charCountPlural.replace('{x}', params.maxlength));
      });

      // it('then the aria alert should tell the user that the textarea has been cleared', () => {
      //   expect(ariaAlert.innerHTML).to.equal(`${params.label.text} cleared.`);
      // });
    });
  });

  describe('Given the user has checked the mutually exclusive checkbox', () => {
    beforeEach(() => {
      checkbox.click();
    });

    describe('when the user populates the textarea', () => {
      beforeEach(() => {
        populateTextarea(textarea);
      });

      it('then the checkbox should be unchecked', () => {
        expect(checkbox.checked).to.equal(false);
      });

      // it('then the aria alert should tell the user that the checkbox has been unchecked', () => {
      //   expect(ariaAlert.innerHTML).to.equal(`"${params.checkbox.label.text}" deselected.`);
      // });
    });
  });

  // describe('Given the user has not populated the textarea or checked the checkbox', () => {
  //   describe('when the user populates the textarea', () => {
  //     beforeEach(() => {
  //       populateTextarea(textarea);
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

function populateTextarea(textarea) {
  textarea.value =
    'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Morbi rhoncus varius mauris, vitae venenatis sem ullamcorper in. Integer eu facilisis urna. Sed convallis porttitor massa eu pulvinar.';
  const event = new CustomEvent('input');
  textarea.dispatchEvent(event);
}
