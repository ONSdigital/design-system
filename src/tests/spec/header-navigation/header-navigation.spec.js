import { awaitPolyfills } from 'js/polyfills/await-polyfills';
import template from 'components/header/_test-template.njk';

import GetViewportDetailsMock from 'stubs/getViewportDetails.stub.spec';

const params = {
  toggleButton: {
    text: 'Menu',
    ariaLabel: 'Toggle main navigation',
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
        path: '/surveys',
      },
      {
        title: 'Messages',
        path: '#',
      },
      {
        title: 'To do',
        path: '#',
      },
      {
        title: 'My account',
        path: '#',
        classes: 'nav__item--secondary u-d-no@m',
      },
      {
        title: 'Sign out',
        path: '#',
        classes: 'u-d-no@m',
      },
    ],
  },
};

describe('Component: Navigation', function() {
  const ViewportDetailsMock = new GetViewportDetailsMock();
  let rewiremock;

  before(resolve => {
    awaitPolyfills.then(() => {
      rewiremock = require('rewiremock/webpack').default;
      resolve();
    });
  });

  describe('When the viewport is small,', function() {
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
        this.nav = mockInstance(this.toggleMainBtn, this.mainNavList);
        this.nav.registerEvents = chai.spy(this.nav.registerEvents);
        this.nav.registerEvents();
      });

      it('registerEvents should be called', function() {
        expect(this.nav.registerEvents).to.have.been.called();
      });

      describe('When viewport has a width more than 740,', function() {
        beforeEach(function() {
          ViewportDetailsMock.setParams({ width: 800 });

          rewiremock(() => require('viewport-details'))
            .es6()
            .with({ GetViewportDetails: ViewportDetailsMock.getMock() });

          rewiremock.enable();

          this.nav = mockInstance(this.toggleMainBtn, this.mainNavList);
          this.nav.registerEvents();
        });

        afterEach(function() {
          rewiremock.disable();
        });

        it('The nav list shouldn\'t be given an "aria-hidden" attribute', function() {
          expect(this.mainNavList.hasAttribute('aria-hidden')).to.equal(false);
        });

        describe('and then the viewport width changes to less than 740', function() {
          beforeEach(function() {
            ViewportDetailsMock.setParams({ width: 375 });
            this.nav.setAria();
          });

          it('The nav list should be given an "aria-hidden" attribute', function() {
            expect(this.mainNavList.hasAttribute('aria-hidden')).to.equal(true);
          });
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

        describe('and then the viewport width changes to more than 740', function() {
          beforeEach(function() {
            ViewportDetailsMock.setParams({ width: 800 });
            this.nav.setAria();
          });

          it('The nav list "aria-hidden" attribute should be removed', function() {
            expect(this.mainNavList.hasAttribute('aria-hidden')).to.equal(false);
          });
        });
      });

      describe('When viewport has a width less than 740,', function() {
        beforeEach(function() {
          ViewportDetailsMock.setParams({ width: 375 });

          rewiremock(() => require('viewport-details'))
            .es6()
            .with({ GetViewportDetails: ViewportDetailsMock.getMock() });

          rewiremock.enable();

          this.nav = mockInstance(this.toggleMainBtn, this.mainNavList);
          this.nav.registerEvents();
        });

        afterEach(function() {
          rewiremock.disable();
        });

        it('The nav list should be given an "aria-hidden" attribute', function() {
          expect(this.mainNavList.hasAttribute('aria-hidden')).to.equal(true);
        });

        describe('When the main nav is opened,', function() {
          beforeEach(function() {
            this.nav.openNav = chai.spy(this.nav.openNav);
            this.nav.toggleNav();
          });
        });

        describe('and then the viewport width changes to more than 740', function() {
          beforeEach(function() {
            ViewportDetailsMock.setParams({ width: 800 });
            this.nav.setAria();
          });

          it('The nav list "aria-hidden" attribute should be removed', function() {
            expect(this.mainNavList.hasAttribute('aria-hidden')).to.equal(false);
          });
        });
        describe('and then the viewport width changes to less than 740', function() {
          beforeEach(function() {
            ViewportDetailsMock.setParams({ width: 375 });
            this.nav.setAria();
          });

          it('The nav list "aria-hidden" attribute should be set to true', function() {
            expect(this.mainNavList.hasAttribute('aria-hidden')).to.equal(true);
          });
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
    mainNavList,
  };
}

function mockInstance(toggleMainBtn, mainNavList) {
  const mockedNav = require('components/header/header-nav').default;
  return new mockedNav(toggleMainBtn, mainNavList);
}
