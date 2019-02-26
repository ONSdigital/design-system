import { awaitPolyfills } from 'js/polyfills/await-polyfills';
import template from 'components/feedback/_template.njk';
import Feedback from 'components/feedback/feedback';

import fetchMock from 'stubs/fetch.stub.spec';
import promiseInstanceMock from 'stubs/promise.stub.spec';

const params = {
  id: 'feedback',
  action: '/',
  title: 'Give feedback and help us improve this service',
  closeButton: 'I dont want to provide feedback',
  textarea: {
    label: {
      text: 'How can we improve this survey'
    },
    maxlength: 2000,
    charCountSingular: 'You have {x} character remaining',
    charCountPlural: 'You have {x} characters remaining'
  },
  name: {
    label: {
      text: 'Name (optional)',
      description:
        'Please include your name and email address if you’re interested in taking part in further research to improve this survey'
    }
  },
  email: {
    label: {
      text: 'Email address (optional)'
    }
  },
  sendButton: 'Send feedback',
  thankYouMessage: 'Thank you for your feedback.',
  errorMessage: 'There was an error sending your feedback.\n(Error code: {x})'
};

describe('Component: Feedback', function() {
  const promiseInstance = promiseInstanceMock();
  const mockedFetch = fetchMock(promiseInstance);

  before(() => awaitPolyfills);

  beforeEach(function() {
    const component = renderComponent(params);

    Object.keys(component).forEach(key => {
      this[key] = component[key];
    });
  });

  afterEach(function() {
    if (this.wrapper) {
      this.wrapper.remove();
    }
  });

  describe('When a feedback button is clicked', function() {
    beforeEach(function() {
      this.button.click();
    });

    it('the details element should be opened', function() {
      expect(this.details.open).to.be.true;
    });
  });

  describe('When the form is submitted', function() {
    beforeEach(function() {
      const originalFetch = window.fetch;
      window.fetch = mockedFetch;
      this.submit.click();
      window.fetch = originalFetch;
    });

    it('the form fields should be disabled', function() {
      expect(this.textarea.disabled).to.be.true;
      expect(this.name.disabled).to.be.true;
      expect(this.email.disabled).to.be.true;
      expect(this.submit.disabled).to.be.true;
    });

    it('the submit button should be set to loader mode', function() {
      expect(this.submit.classList.contains('is-loading')).to.be.true;
    });

    it('the form should be posted', function() {
      expect(mockedFetch).to.have.been.called();
    });

    describe('and the form is submitted successfully', function() {
      beforeEach(function() {
        this.feedback.onSuccess();
      });

      it('the form should be replaced with a thank you message', function() {
        expect(this.wrapper.innerHTML.includes(`<p>${params.thankYouMessage}</p>`)).to.be.true;
      });
    });

    describe('and the form errors', function() {
      beforeEach(function() {
        const originalAlert = window.alert;
        this.mockedAlert = chai.spy();
        window.alert = this.mockedAlert;

        this.feedback.onError({ status: '500' });

        window.alert = originalAlert;
      });

      it('the an alert should be thrown', function() {
        expect(this.mockedAlert).to.have.been.called();
        expect(this.mockedAlert).to.have.been.called.with(params.errorMessage.replace('{x}', '500'));
      });

      it('the form fields should be re-enabled', function() {
        expect(this.textarea.disabled).to.be.false;
        expect(this.name.disabled).to.be.false;
        expect(this.email.disabled).to.be.false;
        expect(this.submit.disabled).to.be.false;
      });

      it('the submit button should have loader mode disabled', function() {
        expect(this.submit.classList.contains('is-loading')).to.be.false;
      });
    });
  });
});

function renderComponent(params) {
  const html = template.render({ params });

  const wrapper = document.createElement('div');
  wrapper.innerHTML = `<a href="#" class="js-feedback-button">Feedback</a>${html}`;
  document.body.appendChild(wrapper);

  const button = wrapper.querySelector('.js-feedback-button');
  const details = wrapper.querySelector('.js-feedback');
  const summary = details.querySelector('.js-collapsible-summary');
  const form = wrapper.querySelector('.js-feedback-form');
  const textarea = wrapper.querySelector('.js-feedback-textarea');
  const name = wrapper.querySelector('.js-feedback-name');
  const email = wrapper.querySelector('.js-feedback-email');
  const submit = wrapper.querySelector('.js-feedback-send');
  const feedback = new Feedback();

  return {
    wrapper,
    details,
    summary,
    button,
    form,
    feedback,
    textarea,
    name,
    email,
    submit
  };
}
