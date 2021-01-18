import { awaitPolyfills } from 'js/polyfills/await-polyfills';
import template from 'components/button/_test-template.njk';
import SubmitButton from 'components/button/button';

describe('Function: Loader Button ', function() {
  let wrapper, buttonElement;

  let params = {
    id: 'button',
    text: 'Submit',
    submitType: 'loader',
  };

  before(() => awaitPolyfills);

  beforeEach(() => {
    const html = template.render({ params });

    wrapper = document.createElement('form');
    wrapper.innerHTML = html;
    document.body.appendChild(wrapper);

    form = [...document.getElementsByTagName('form')][0];
    form.classList.add('js-patternlib-form');

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
      expect(buttonElement.classList.contains('js-loader')).to.be.true;
      expect(buttonElement.classList.contains('js-submit-btn')).to.be.true;
    });
  });

  describe('Once the button is initialised', () => {
    beforeEach(() => {
      new SubmitButton(buttonElement, params.submitType);
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
