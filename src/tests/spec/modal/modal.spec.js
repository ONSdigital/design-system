import Modal from '../../../components/modal/modal';
import renderTemplate from '../../helpers/render-template';

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
    beforeEach(function() {
      new Modal(this.component);
      const launcher = document.querySelector(`[data-modal-id=${this.component.id}]`);
      launcher.click();
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
