import { awaitPolyfills } from 'js/polyfills/await-polyfills';
import template from 'components/header/_test-template.njk';

const params = {
  toggleButton: {
    text: 'Menu',
    ariaLabel: 'Toggle main navigation'
  },
  navigation: {
    classes: 'js-header-nav u-d-no',
    id: 'main-nav',
    ariaLabel: 'Main menu',
    ariraListLabel: 'Navigation menu',
    currentPath: '/surveys',
    itemsList: [
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
  }
};

describe('Component: Navigation', function() {
  let nav;

  before(() => awaitPolyfills);

  describe('When the viewport is small,', function() {
    beforeEach(function() {
      const component = renderComponent(params);

      Object.keys(component).forEach(key => {
        this[key] = component[key];
      });

      const mockedNav = require('components/header/header-nav').default;
      this.nav = new mockedNav(this.toggleMainBtn, this.mainNavList);
    });

    afterEach(function() {
      if (this.wrapper) {
        this.wrapper.remove();
      }
    });

    describe('When the component initialises', function() {
      beforeEach(function() {
        this.nav.registerEvents = chai.spy(this.nav.registerEvents);
        this.nav.registerEvents();
      });

      it('registerEvents should be called', function() {
        expect(this.nav.registerEvents).to.have.been.called();
      });

      describe('When the main nav is opened,', function() {
        beforeEach(function() {
          this.nav.openNav = chai.spy(this.nav.openNav);
          this.nav.toggleNav();
        });

        it('openNav should be called', function() {
          expect(this.nav.openNav).to.have.been.called();
        });

        it('Should be assigned the "aria-hidden" value of false', function() {
          expect(this.mainNavList.getAttribute('aria-hidden')).to.equal('false');
        });

        it('Should not have the hidden class', function() {
          expect(this.mainNavList.classList.contains('u-d-no@xs@m')).to.be.false;
        });
      });

      describe('When the main nav is closed,', function() {
        beforeEach(function() {
          this.nav.closeNav(this.toggleMainBtn, this.mainNavList);
        });

        it('Should be assigned the "aria-hidden" value of false', function() {
          expect(this.mainNavList.getAttribute('aria-hidden')).to.equal('true');
        });

        it('Should not have the hidden class', function() {
          expect(this.mainNavList.classList.contains('u-d-no@xs@m')).to.be.true;
        });
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
  const mainNavList = wrapper.querySelector('.js-header-nav');

  return {
    wrapper,
    toggleMainBtn,
    mainNavList
  };
}
