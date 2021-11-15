import Modal from '../../../components/modal/modal';
import renderTemplate from '../../helpers/render-template';
chai.use(chaiSpies);

const params = {
  id: 'first',
  title: 'Hello',
  body: 'Hows it going?',
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
    beforeEach(function(done) {
      this.modal = new Modal(this.component);
      done();
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
    });
  });
});

function renderComponent(params) {
  const html = renderTemplate('components/modal/_test-template.njk', { params });

  const wrapper = document.createElement('div');
  wrapper.innerHTML = html;
  document.body.appendChild(wrapper);

  const component = document.querySelector('.ons-js-modal');

  return {
    component,
  };
}
