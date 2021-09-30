import Toc from '../../../components/table-of-contents/toc';
import renderTemplate from '../../helpers/render-template';

const params = {
  title: 'Contents',
  ariaLabel: 'Sections in this page',
  itemsList: [
    {
      url: '#section1',
      text: 'What is the census?',
    },
    {
      url: '#section2',
      text: 'The online census has now closed',
    },
    {
      url: '#section3',
      text: 'What happens after Census Day',
    },
    {
      url: '#section4',
      text: 'The census in Northern Ireland and Scotland',
    },
    {
      url: '#section5',
      text: 'The last census',
    },
  ],
};

describe('Component: Table of contents', function() {
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

  describe.only('When the component initialises', function() {
    beforeEach(function() {
      this.toc = new Toc(this.component);
      this.setCurrentSpy = chai.spy.on(this.toc, 'setCurrent');
      const mockIntersectionObserver = {
        observe: () => null,
      };
      window.IntersectionObserver = mockIntersectionObserver;
    });

    it('should call the setCurrent function', function() {
      expect(this.setCurrentSpy).to.have.been.called;
    });
  });
});

function renderComponent(params) {
  const html = renderTemplate('components/table-of-contents/_test-template.njk', { params });

  const wrapper = document.createElement('div');
  wrapper.innerHTML = html;
  document.body.appendChild(wrapper);

  const component = wrapper.querySelector('.ons-js-toc-container');

  return {
    component,
  };
}
