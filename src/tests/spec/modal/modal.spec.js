import Modal from '../../../components/modal/modal';
import renderTemplate from '../../helpers/render-template';

import chai from 'chai';
import chaiSpies from 'chai-spies';
chai.use(chaiSpies);

const params = {
  id: 'first',
  title: 'Hello',
  body: 'Hows it going?',
  btnText: 'Close',
};

describe('Component: Modal', function() {
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

  describe('When the component initialises', function() {
    beforeEach(function() {
      this.modal = new Modal(this.component);
    });

    describe('When the launcher link is clicked', function() {
      beforeEach(function() {
        this.saveLastFocusedElSpy = chai.spy.on(this.modal, 'saveLastFocusedEl');
        const launcher = document.querySelector(`[data-modal-id=${this.component.id}]`);
        launcher.click();
      });

      it('then the saveLastFocusedEl function should be called', function() {
        expect(this.saveLastFocusedElSpy).to.have.been.called();
      });

      it('then the body should contain the overlay class', function() {
        expect(document.body.classList.contains('ons-modal-overlay')).to.be.true;
      });

      it('then the modal should be visible', function() {
        expect(this.component.classList.contains('ons-u-db')).to.be.true;
      });
    });

    describe('When the continue button is clicked', function() {
      beforeEach(function() {
        const button = document.querySelector('.ons-js-modal-btn');
        button.click();
      });

      it('then the modal should be hidden', function() {
        expect(this.component.classList.contains('ons-u-d-b')).to.be.false;
      });

      it('then the underlying page should not be hidden from screen readers', function() {
        expect(document.querySelector('.ons-page').getAttribute('aria-hidden')).to.equal('false');
      });
    });
  });

  describe('When an element is previously focused and the modal opens', function() {
    beforeEach(function(done) {
      this.input = document.querySelector('.ons-input');
      this.input.focus();
      this.modal = new Modal(this.component);
      this.saveLastFocusedElSpy = chai.spy.on(this.modal, 'saveLastFocusedEl');
      this.modal.openDialog();
      setTimeout(done);
    });

    it('then the element should be stored', function() {
      expect(this.saveLastFocusedElSpy).to.have.been.called();
    });

    describe('When the modal is then closed', function() {
      beforeEach(function() {
        this.setFocusOnLastFocusedElSpy = chai.spy.on(this.modal, 'setFocusOnLastFocusedEl');
        this.modal.closeDialog();
      });

      it('then the element should receive focus again', function() {
        expect(this.setFocusOnLastFocusedElSpy).to.have.been.called();
      });
    });
  });
});

function renderComponent(params) {
  const html = renderTemplate('components/modal/_test-template.njk', { params });
  const wrapper = document.createElement('div');
  wrapper.classList.add('ons-page');
  wrapper.innerHTML = html;
  document.body.appendChild(wrapper);
  const component = document.querySelector('.ons-js-modal');

  return {
    component,
  };
}
