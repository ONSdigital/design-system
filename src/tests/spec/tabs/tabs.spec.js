import { awaitPolyfills } from 'js/polyfills/await-polyfills';
import template from 'components/tabs/src/_template.njk';
import { matchMediaMobileMock, matchMediaDesktopMock } from 'stubs/matchMedia.stub.spec';

const params = {
  title: 'Tabs',
  tabs: [
    {
      title: 'Tab 1',
      content: 'Tab 1 content'
    },
    {
      title: 'Tab 2',
      content: 'Tab 2 content'
    },
    {
      title: 'Tab 3',
      content: 'Tab 3 content'
    }
  ]
};

describe.only('Component: Tabs', () => {
  const mobileMock = matchMediaMobileMock();
  const desktopMock = matchMediaDesktopMock();
  let rewiremock, tabs;

  before(resolve => {
    awaitPolyfills.then(() => {
      rewiremock = require('rewiremock/webpack').default;
      resolve();
    });
  });

  beforeEach(function() {
    const component = renderComponent(params);

    Object.keys(component).forEach(key => {
      this[key] = component[key];
    });
  });

  afterEach(function() {
    if (this.wrapper) {
      this.wrapper.remove();
      rewiremock.disable();
    }
  });

  describe('when the viewport is large,', function() {
    beforeEach(() => {
      rewiremock('./src/js/utils/matchMedia')
        .es6()
        .withDefault(desktopMock);

      rewiremock.enable();
    });

    describe('Given the component has loaded', () => {
      beforeEach(() => {
        tabs = require('components/tabs/src/tabs').default;
        tabs();
      });

      it('Then the tab list items should be assigned the "presentation" role', function() {
        this.tabListItems.forEach(tabListItem => {
          expect(tabListItem.getAttribute('role')).to.equal('presentation');
        });
      });

      it('Then each tab should be assigned the "tab" role', function() {
        this.tabs.forEach(tab => {
          expect(tab.getAttribute('role')).to.equal('tab');
        });
      });

      it('Then each tab should be assigned a unique "ID"', function() {
        for (let i = 0; i < this.tabs.length; i++) {
          i = i + 1;
          expect(this.tabs[i - 1].getAttribute('id')).to.equal('tab_tabId' + i);
        }
      });

      it('Then each tab should be assigned the "aria-controls" corresponding panel id', function() {
        for (let i = 0; i < this.tabs.length; i++) {
          i = i + 1;
          expect(this.tabs[i - 1].getAttribute('aria-controls')).to.equal('tabId' + i);
          expect(this.tabPanels[i - 1].getAttribute('id')).to.equal('tabId' + i);
        }
      });

      describe('The first tab element,', function() {
        it('Then should be assigned a "tabindex" value', function() {
          expect(this.tabs[0].getAttribute('tabindex')).to.equal('0');
        });

        it('Then should be assigned the "aria-selected" value of true', function() {
          expect(this.tabs[0].getAttribute('aria-selected')).to.equal('true');
        });

        it('Then should be assigned the class tab--selected', function() {
          expect(this.tabs[0].getAttribute('class')).to.equal('tab tab--selected');
        });

        it('Then should show the corresponding panel', function() {
          const tabId = this.tabs[0].getAttribute('href').slice(1);
          const panel = document.getElementById(tabId);
          const classHidden = 'tabs__panel--hidden';
          expect(panel.classList.contains(classHidden)).to.be.false;
        });

        it('Then should hide all other panels', function() {
          const classHidden = 'tabs__panel--hidden';
          const panels = document.getElementsByClassName('tabs__panel');
          expect(panels[1].classList.contains(classHidden)).to.be.true;
          expect(panels[2].classList.contains(classHidden)).to.be.true;
        });
      });

      describe('When a tab is clicked,', function() {
        beforeEach('Click the second tab', function() {
          this.tabs[1].click();
        });

        it('Then the tab should be assigned a "tabindex" value', function() {
          expect(this.tabs[1].getAttribute('tabindex')).to.equal('0');
        });

        it('Then the tab should be assigned the "aria-selected" value of true', function() {
          expect(this.tabs[1].getAttribute('aria-selected')).to.equal('true');
        });

        it('Then the tab should be assigned the class tab--selected', function() {
          expect(this.tabs[1].getAttribute('class')).to.equal('tab tab--selected');
        });

        it('Then the the corresponding panel should be shown', function() {
          const tabId = this.tabs[1].getAttribute('href').slice(1);
          const panel = document.getElementById(tabId);
          const classHidden = 'tabs__panel--hidden';
          expect(panel.classList.contains(classHidden)).to.be.false;
        });

        it('Then all other panels should be hidden', function() {
          const classHidden = 'tabs__panel--hidden';
          const panels = document.getElementsByClassName('tabs__panel');
          expect(panels[0].classList.contains(classHidden)).to.be.true;
          expect(panels[2].classList.contains(classHidden)).to.be.true;
        });
      });
    });
  });

  describe('when the viewport is small,', function() {
    beforeEach(() => {
      rewiremock('./src/js/utils/matchMedia')
        .es6()
        .withDefault(mobileMock);

      rewiremock.enable();
    });

    describe('Given the component has loaded', () => {
      beforeEach(() => {
        tabs = require('components/tabs/src/tabs').default;
        tabs();
      });

      it('Then all aria attributes should be removed from the tabs', function() {
        this.tabs.forEach(tab => {
          expect(tab.getAttribute('role')).to.equal(null);
          expect(tab.getAttribute('aria-controls')).to.equal(null);
          expect(tab.getAttribute('aria-selected')).to.equal(null);
        });
      });

      it('Then all panels should be displayed', function() {
        const classHidden = 'tabs__panel--hidden';
        this.tabPanels.forEach(panel => {
          expect(panel.classList.contains(classHidden)).to.be.false;
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

  const tabsComponent = wrapper.querySelector('.tabs');
  const tabList = tabsComponent.querySelector('.tabs__list');
  const tabs = [...tabsComponent.getElementsByClassName('tab')];
  const tabListItems = [...tabsComponent.getElementsByClassName('tab__list-item')];
  const tabPanels = [...tabsComponent.getElementsByClassName('tabs__panel')];

  return {
    wrapper,
    tabsComponent,
    tabs,
    tabList,
    tabListItems,
    tabPanels
  };
}
