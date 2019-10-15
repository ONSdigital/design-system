import { awaitPolyfills } from 'js/polyfills/await-polyfills';
import template from 'components/button/_test-template.njk';
import SubmitButton from 'components/button/button';

const params = {
  id: 'button',
  type: 'submit',
  text: 'Submit',
};

describe('Function: Submit Button ', function() {
  let wrapper, buttonElement;

  before(() => awaitPolyfills);

  beforeEach(() => {
    const html = template.render({ params });

    wrapper = document.createElement('div');
    wrapper.innerHTML = html;
    document.body.appendChild(wrapper);

    buttonElement = document.getElementById(params.id);
  });

  afterEach(() => {
    if (wrapper) {
      wrapper.remove();
    }
  });

  describe('Before the button is initialised', () => {
    it('Button should have relevant classes', () => {
      expect(buttonElement.classList.contains('btn--loader')).to.be.true;
      expect(buttonElement.classList.contains('js-button')).to.be.true;
    });

    it('Button should be type submit', () => {
      expect(buttonElement.getAttribute('type')).to.equal('submit');
    });
  });

  describe('Once the button is initialised', () => {
    beforeEach(() => {
      new SubmitButton(buttonElement);
    });

    it('Button disabled attribute should not be set', () => {
      expect(buttonElement.getAttribute('disabled')).to.not.exist;
    });

    describe('and the button is clicked', () => {
      beforeEach(() => {
        buttonElement.click();
      });

      it('Button should have loading style applied', () => {
        expect(buttonElement.classList.contains('is-loading')).to.be.true;
      });

      it('Button should be disabled', () => {
        expect(buttonElement.getAttribute('disabled')).to.equal('true');
      });
    });
  });
});
