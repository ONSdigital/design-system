import { awaitPolyfills } from 'js/polyfills/await-polyfills';
import template from 'components/navigation/_template.njk';
import matchMediaMobileMock from 'stubs/matchMediaMobile.stub.spec';

const params = {
  classes: 'nav--inline nav--light nav--header nav--h-m js-main-nav',
  id: 'main-nav',
  ariaLabel: 'Main menu',
  ariraListLabel: 'Navigation menu',
  currentPath: '/surveys',
  items: [
    {
      title: 'Surveys',
      path: '/surveys'
    },
    {
      title: 'Messages',
      path: '#'
    },
    {
      title: 'To do',
      path: '#'
    },
    {
      title: 'My account',
      path: '#',
      classes: 'nav__item--secondary u-d-no@m'
    },
    {
      title: 'Sign out',
      path: '#',
      classes: 'u-d-no@m'
    }
  ]
};

describe.only('Component: Navigation', function() {
  const mobileMock = matchMediaMobileMock();

  let nav, rewiremock;

  before(resolve => {
    awaitPolyfills.then(() => {
      rewiremock = require('rewiremock/webpack').default;
      resolve();
    });
  });

  describe('When the viewport is small,', () => {
    beforeEach(function() {
      const component = renderComponent(params);

      Object.keys(component).forEach(key => {
        this[key] = component[key];
      });

      const mockedNav = require('components/navigation/main-nav').default;
      nav = new mockedNav(this.toggleMainBtn, this.mainNavList);

      rewiremock.disable();

      rewiremock('./src/js/utils/matchMedia')
        .es6()
        .withDefault(mobileMock);

      rewiremock.enable();
    });

    afterEach(function() {
      if (this.wrapper) {
        this.wrapper.remove();
      }
    });

    describe('When the component initialises', () => {
      it('Should assign the main navigation with "aria-hidden" value of true', function() {
        expect(this.mainNavList.getAttribute('aria-hidden')).to.equal('true');
      });
    });
  });
});

function renderComponent(params) {
  const html = template.render({ params });

  const wrapper = document.createElement('div');
  wrapper.innerHTML = html;
  document.body.appendChild(wrapper);

  const toggleMainBtn = wrapper.querySelector('.js-toggle-main');
  const mainNavList = wrapper.querySelector('.js-main-nav');

  return {
    wrapper,
    toggleMainBtn,
    mainNavList
  };
}
