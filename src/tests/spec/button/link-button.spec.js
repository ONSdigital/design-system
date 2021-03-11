import { awaitPolyfills } from 'js/polyfills/await-polyfills';
import eventMock from 'stubs/event.stub.spec';

import template from 'components/button/_test-template.njk';
import SubmitButton from 'components/button/button';

import chai from 'chai';
import chaiAsPromised from 'chai-as-promised';
import chaiSpies from 'chai-spies';

chai.should();
chai.use(chaiSpies);
chai.use(chaiAsPromised);

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
    beforeEach(function(done) {
      this.submitButton = new SubmitButton(buttonElement, params.submitType);
      this.mockedEvent = eventMock({ keyCode: 32 });
      this.submitButton.linkButton(this.mockedEvent);
      setTimeout(done);

      done();
    });

    it('then preventDefault should be called on the event', function() {
      expect(this.mockedEvent.preventDefault).to.have.been.called();
    });
  });
});
