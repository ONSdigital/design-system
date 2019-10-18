import { awaitPolyfills } from 'js/polyfills/await-polyfills';
import template from 'components/button/_test-template.njk';
import SubmitButton from 'components/button/button';

let params = {
  id: 'button',
  text: 'Submit',
  submitType: 'loader',
};

describe('Function: Loader Button ', function() {
  let wrapper, buttonElement, formElement;

  before(() => awaitPolyfills);

  beforeEach(() => {
    const html = template.render({ params });

    wrapper = document.createElement('div');
    wrapper.innerHTML = html;
    document.body.appendChild(wrapper);
    buttonElement = document.getElementById(params.id);
    formElement = document.getElementsByTagName('form');
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
      new SubmitButton(buttonElement, formElement[0], params.submitType);
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

params = {
  id: 'button',
  text: 'Submit',
  submitType: 'timer',
};

describe.only('Function: Timer Button ', function() {
  let wrapper, buttonElement, formElement;

  before(() => awaitPolyfills);

  beforeEach(() => {
    const html = template.render({ params });

    wrapper = document.createElement('div');
    wrapper.innerHTML = html;
    document.body.appendChild(wrapper);

    buttonElement = document.getElementById(params.id);
    formElement = document.getElementsByTagName('form');
  });

  afterEach(() => {
    if (wrapper) {
      wrapper.remove();
    }
  });

  describe('Before the button is initialised', () => {
    it('Button should have relevant classes', () => {
      expect(buttonElement.classList.contains('btn--loader')).to.be.false;
      expect(buttonElement.classList.contains('js-timer')).to.be.true;
      expect(buttonElement.classList.contains('js-submit-btn')).to.be.true;
    });
  });

  describe('Once the button is initialised', () => {
    beforeEach(() => {
      new SubmitButton(buttonElement, formElement[0], params.submitType);
    });

    it('Button disabled attribute should not be set', () => {
      expect(buttonElement.getAttribute('disabled')).to.not.exist;
    });

    describe('and the button is clicked', () => {
      beforeEach(() => {
        buttonElement.click();
      });

      it('Button should not have loading style applied', () => {
        expect(buttonElement.classList.contains('is-loading')).to.be.false;
      });

      it('Button should be disabled', () => {
        console.log(buttonElement);
        expect(buttonElement.getAttribute('disabled')).to.equal('true');
      });

      it('After timer button disabled attribute should not be set', () => {
        setTimeout(function() {
          console.log('waiting over.');
          done();
        }, 30000000000);
        console.log(buttonElement);
        expect(buttonElement.getAttribute('disabled')).to.not.exist;
      });
    });
  });
});
