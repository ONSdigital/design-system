import CharacterLimit from '../../../components/char-check-limit/character-limit';
import MutuallyExclusive from '../../../components/mutually-exclusive/mutually-exclusive';
import renderTemplate from '../../helpers/render-template';
import { populateTextarea } from '../textarea/character-limit.spec';

const params = {
  id: 'feedback',
  name: 'feedback',
  width: '30',
  legend: 'What do you think of this service?',
  label: {
    text: 'Enter your feedback',
    description: 'For example describe any difficulties you experienced in the use of this service',
  },
  charCheckLimit: {
    limit: 200,
    charCountSingular: 'You have {x} character remaining',
    charCountPlural: 'You have {x} characters remaining',
  },
  mutuallyExclusive: {
    or: 'Or',
    deselectMessage: 'Selecting this will clear your feedback',
    deselectGroupAdjective: 'cleared',
    deselectExclusiveOptionAdjective: 'deselected',
    exclusiveOptions: [
      {
        id: 'feedback-exclusive-option',
        name: 'no-feedback',
        value: 'no-feedback',
        label: {
          text: 'I dont want to provide feedback',
        },
      },
    ],
  },
};

describe('Component: Mutually Exclusive Textarea', () => {
  let wrapper, mutuallyExclusiveComponent, textarea, textareaRemaining, exclusiveOption, ariaAlert;

  beforeEach(() => {
    const html = renderTemplate('components/textarea/_test-template.njk', { params });

    wrapper = document.createElement('div');
    wrapper.innerHTML = html;
    document.body.appendChild(wrapper);

    mutuallyExclusiveComponent = document.querySelector('.ons-js-mutually-exclusive');
    textarea = document.getElementById(params.id);
    textareaRemaining = document.getElementById(`${params.id}-lim-remaining`);
    exclusiveOption = document.getElementById(params.mutuallyExclusive.exclusiveOptions[0].id);
    ariaAlert = document.querySelector('.ons-js-exclusive-alert');

    new CharacterLimit(textarea);
    new MutuallyExclusive(mutuallyExclusiveComponent);
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
        exclusiveOption.click();
      });

      it('then the textarea should be cleared', () => {
        expect(textarea.value).to.equal('');
      });

      it('then the characters remaining readout should be reset', () => {
        expect(textareaRemaining.innerHTML).to.equal(params.charCheckLimit.charCountPlural.replace('{x}', params.charCheckLimit.limit));
      });

      it('then the aria alert should tell the user that the textarea has been cleared', done => {
        setTimeout(() => {
          expect(ariaAlert.innerHTML).to.equal(`${params.label.text} ${params.mutuallyExclusive.deselectGroupAdjective}.`);
          done();
        }, 300);
      });
    });
  });

  describe('Given the user has checked the mutually exclusive exclusiveOption', () => {
    beforeEach(() => {
      exclusiveOption.click();
    });

    describe('when the user populates the textarea', () => {
      beforeEach(() => {
        populateTextarea(textarea);
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

  describe('Given the user has not populated the textarea or checked the exclusive option', () => {
    describe('when the user populates the textarea', () => {
      beforeEach(() => {
        populateTextarea(textarea);
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
