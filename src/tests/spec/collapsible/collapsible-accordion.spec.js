import { awaitPolyfills } from 'js/polyfills/await-polyfills';
import template from 'components/accordion/_test-template.njk';
import collapsibleGroupMod from 'components/details/collapsible-group.module';
import Collapsible from 'components/details/collapsible';
import CollapsibleGroup from 'components/details/collapsible-group';
import eventMock from 'stubs/event.stub.spec';

const params = {
  id: 'accordion',
  allButton: {
    open: 'Show all',
    close: 'Hide all'
  },
  itemsList: [
    {
      title: 'Total retail turnover',
      content:
        '<h3 class="u-fs-r">Include:</h3><ul class="list"><li class="list__item">VAT</li><li class="list__item">internet sales</li><li class="list__item">retail sales from outlets in Great Britain to <a href="#">customers abroad</a></li></ul><h3 class="u-fs-r">Exclude:</h3><ul class="list"><li class="list__item">revenue from mobile phone network commission and top-up</li><li class="list__item">sales from catering facilities used by customers</li><li class="list__item">lottery sales and commission from lottery sales</li><li class="list__item">sales of car accessories and motor vehicles</li><li class="list__item">NHS receipts</li><li class="list__item">automotive fuel</li></ul>',
      button: {
        open: 'Show',
        close: 'Hide'
      }
    },
    {
      title: 'Food sales',
      content:
        '<h3 class="u-fs-r">Include:</h3><ul class="list"><li class="list__item">all fresh food</li><li class="list__item">other food for human consumption (except chocolate and sugar confectionery)</li><li class="list__item">soft drinks</li></ul><h3 class="u-fs-r">Exclude:</h3><ul class="list"><li class="list__item">sales from catering facilities used by customers</li></ul>',
      button: {
        open: 'Show',
        close: 'Hide'
      }
    },
    {
      title: 'Alcohol, confectionery, soft drinks and tobacco sales',
      content:
        '<h3 class="u-fs-r">Include:</h3><ul class="list"><li class="list__item">chocolate and sugar confectionery</li><li class="list__item">tobacco and smokers’ requisites</li></ul>',
      button: {
        open: 'Show',
        close: 'Hide'
      }
    }
  ]
};

describe('Component: Accordion', function() {
  let rewiremock;

  before(done => {
    awaitPolyfills.then(() => {
      rewiremock = require('rewiremock/webpack').default;
      done();
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
    }
  });

  describe('before the component initialises', function() {
    it('then the toggle button element should have a u-d-no class', function() {
      expect([...this.toggleButton.classList].includes('u-d-no')).to.be.true;
    });
  });

  describe('When the module initialises', () => {
    it('then CollapsibleGroup class create method should be called', () => {
      const mockedCollapsibleGroup = {
        create: chai.spy()
      };

      const mockedStartComponent = chai.spy();

      rewiremock('./src/components/details/collapsible-group')
        .es6()
        .with({
          default: mockedCollapsibleGroup,
          scopeClass: 'js-collapsible-group'
        });

      rewiremock('./src/js/component')
        .es6()
        .with({
          default: require('js/component').default,
          startComponent: mockedStartComponent
        });

      rewiremock.enable();

      const collapsibleGroupModule = require('components/details/collapsible-group.module').default;

      collapsibleGroupModule();

      expect(mockedCollapsibleGroup.create).to.have.been.called();

      rewiremock.disable();
    });

    it('then the toggle button element should not have a u-d-no class', function() {
      collapsibleGroupMod();

      expect([...this.toggleButton.classList].includes('u-d-no')).to.be.false;
    });

    it('then none of the summary items should have a tabindex attribute', function() {
      this.items.forEach(item => {
        expect(item.summary.hasAttribute('tabindex')).to.be.false;
      });
    });

    beforeEach(function() {
      this.item = this.items[0];
      this.collapsible = new Collapsible(this.item.details);
      this.collapsible.init();
      this.collapsible.registerEvents();
      this.group = new CollapsibleGroup(this.scopeEl, {
        collapsibles: [this.collapsible]
      });
      this.group.init();
      this.group.registerEvents();

      this.collapsible.setOpen = chai.spy(this.collapsible.setOpen);
      this.collapsible.onOpen = chai.spy(this.collapsible.onOpen);
      this.collapsible.onClose = chai.spy(this.collapsible.onClose);
    });

    describe('and all of the items are closed', function() {
      describe('when an item is opened', function() {
        beforeEach(function() {
          this.collapsible.setOpen(true);
        });

        it('onOpen should be called', function() {
          expect(this.collapsible.onOpen).to.have.been.called();
        });

        describe('when an item is called to be opened a second time', function() {
          beforeEach(function() {
            this.collapsible.onOpen = chai.spy(this.collapsible.onOpen);
            this.collapsible.setOpen(true);
          });

          it('nothing should happen', function() {
            expect(this.collapsible.onOpen).to.not.have.been.called();
          });
        });

        describe('and toggle is called within the same event loop', function() {
          beforeEach(function() {
            this.collapsible.setOpen = chai.spy(this.collapsible.setOpen);
            this.collapsible.toggle(eventMock());
          });

          it('nothing should happen', function() {
            expect(this.collapsible.setOpen).to.not.have.been.called();
          });
        });
      });

      describe('when the toggle button is clicked', function() {
        beforeEach(function() {
          this.group.buttonClicked();
        });

        it('should call setOpen for each of its collapsibles', function() {
          expect(this.group.collapsibles[0].setOpen).to.have.been.called();
        });
      });
    });

    describe('and an item is open', function() {
      beforeEach(function(done) {
        this.collapsible.setOpen(true);
        setTimeout(done);
      });

      describe('when the item is closed', function() {
        beforeEach(function() {
          this.collapsible.setOpen(false);
        });

        it('onClose should be called', function() {
          expect(this.collapsible.onClose).to.have.been.called();
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

  const scopeEl = wrapper.querySelector('.js-collapsible-group');
  const toggleButton = wrapper.querySelector('.js-collapsible-all');

  const items = [...wrapper.querySelectorAll('.js-collapsible')].map(details => {
    const summary = details.querySelector('.js-collapsible-summary');
    const content = details.querySelector('.js-collapsible-content');
    const button = details.querySelector('.js-collapsible-button');

    return {
      details,
      summary,
      content,
      button
    };
  });

  return {
    wrapper,
    scopeEl,
    toggleButton,
    items
  };
}
