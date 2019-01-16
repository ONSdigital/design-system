import { awaitPolyfills } from 'js/polyfills/await-polyfills';

import LoaderBtn from 'js/loader-btn';

describe('Component: LoaderBtn', () => {
  before(() => awaitPolyfills);

  beforeEach(function() {
    this.wrapper = document.createElement('div');

    this.button = document.createElement('button');
    this.button.classList.add('js-button');
    this.button.innerHTML = 'Yes';
    this.button.setAttribute('disabled', '');
    this.button.setAttribute('data-loading-msg', 'loading');

    this.wrapper.appendChild(this.button);

    document.body.appendChild(this.wrapper);

    this.instance = new LoaderBtn('.js-button', this.wrapper);
  });

  afterEach(function() {
    if (this.wrapper) {
      this.wrapper.remove();
    }
  });

  describe('When the component initialises', function() {
    it('then the defaultLabel should match the innerHTML of the button', function() {
      expect(this.instance.defaultLabel).to.equal('Yes');
    });

    it('then the disabled attribute should be removed', function() {
      expect(this.button.hasAttribute('disabled')).to.be.false;
    });
  });

  describe('When onClick is called', function() {
    beforeEach(function() {
      this.instance.onClick();
    });

    it('then `is-loading` class should be added to the button', function() {
      expect(this.button.classList.contains('is-loading')).to.be.true;
    });

    it('then `aria-busy` attribute should be set to true', function() {
      expect(this.button.hasAttribute('aria-busy')).to.be.true;
      expect(this.button.getAttribute('aria-busy')).to.equal('true');
    });

    it('then the button text should be set to the loading message', function() {
      expect(this.button.innerHTML).to.equal('loading');
    });
  });

  describe('When reset is called', function() {
    beforeEach(function() {
      this.instance.onClick();
      this.instance.reset();
    });

    it('then `is-loading` class should be removed from the button', function() {
      expect(this.button.classList.contains('is-loading')).to.be.false;
    });

    it('then `aria-busy` attribute should be set to false', function() {
      expect(this.button.hasAttribute('aria-busy')).to.be.true;
      expect(this.button.getAttribute('aria-busy')).to.equal('false');
    });

    it('then the button text should be set to its original value', function() {
      expect(this.button.innerHTML).to.equal('Yes');
    });
  });

  describe('When disable is called', function() {
    beforeEach(function(done) {
      this.instance.disable();
      setTimeout(done, 1);
    });

    it('then then button should be given a disabled attribute', function() {
      expect(this.button.hasAttribute('disabled')).to.be.true;
    });
  });

  describe('When enable is called', function() {
    beforeEach(function(done) {
      this.instance.disable();
      setTimeout(() => this.instance.enable(), 1);
      setTimeout(done, 2);
    });

    it('then then button should not have a disabled attribute', function() {
      expect(this.button.hasAttribute('disabled')).to.be.false;
    });
  });
});
