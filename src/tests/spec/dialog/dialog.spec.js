import { awaitPolyfills } from 'js/polyfills/await-polyfills';

import Dialog from 'js/dialog';

describe('Component: Dialog', () => {
  before(() => awaitPolyfills);

  beforeEach(function() {
    this.wrapper = document.createElement('div');

    this.dialog = document.createElement('div');
    const dialogEl = document.createElement('dialog');
    this.dialog.classList.add('js-dialog');
    this.dialog.classList.add('is-hidden');

    this.dialog.appendChild(dialogEl);

    this.wrapper.appendChild(this.dialog);

    document.body.appendChild(this.wrapper);

    this.instance = new Dialog();
  });

  afterEach(function() {
    if (this.wrapper) {
      this.wrapper.remove();
    }
  });

  describe('When show called', function() {
    beforeEach(function() {
      this.instance.show();
    });

    it('then the is-hidden class should be removed', function() {
      expect(this.dialog.classList.contains('is-hidden')).to.be.false;
    });
  });

  describe('When hide called', function() {
    beforeEach(function() {
      this.instance.show();
      this.instance.hide();
    });

    it('then the is-hidden class should be added', function() {
      expect(this.dialog.classList.contains('is-hidden')).to.be.true;
    });
  });
});
