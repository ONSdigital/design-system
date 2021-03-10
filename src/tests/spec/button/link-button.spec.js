import { awaitPolyfills } from 'js/polyfills/await-polyfills';
import eventMock from 'stubs/event.stub.spec';

import template from 'components/button/_test-template.njk';
import SubmitButton from 'components/button/button';

describe('Function: Timer Button ', function() {
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

  describe('Once the button is initialised', () => {
    beforeEach(() => {
      new SubmitButton(buttonElement, params.submitType);
    });

    describe('and the button is clicked with the spacebar', () => {
      beforeEach(() => {
        this.mockedEvent = eventMock({ keyCode: 32 });
      });

      it('then preventDefault should have been called on the event', function() {
        expect(this.mockedEvent.preventDefault).to.have.been.called();
      });
    });
  });
});
