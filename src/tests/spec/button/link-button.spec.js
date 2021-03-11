import { awaitPolyfills } from 'js/polyfills/await-polyfills';

import template from 'components/button/_test-template.njk';
import SubmitButton from 'components/button/button';

describe('Function: Link Button ', function() {
  let wrapper, buttonElement;

  let params = {
    id: 'button',
    text: 'Submit',
    submitType: 'link',
    url: '#',
  };

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
      expect(buttonElement.classList.contains('btn--link')).to.be.true;
    });
  });

  describe('When the button is clicked with the spacebar', () => {
    beforeEach(done => {
      this.submitButton = new SubmitButton(buttonElement, params.submitType);
      this.linkButtonSpy = chai.spy.on(this.submitButton, 'linkButton');

      buttonElement.focus();
      const event = new KeyboardEvent('keypress', { keyCode: 32 });
      document.dispatchEvent(event);

      setTimeout(done);
    });

    it('then the linkButton function should be called', function() {
      expect(this.linkButtonSpy).to.have.been.called();
    });
  });
});
