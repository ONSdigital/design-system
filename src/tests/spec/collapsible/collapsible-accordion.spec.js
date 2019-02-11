import { awaitPolyfills } from 'js/polyfills/await-polyfills';
import template from 'components/accordion/_template.njk';
import collapsible, { Collapsible } from 'components/details/collapsible';
import CollapsibleGroup from 'components/details/collapsible.group';
import eventMock from 'stubs/event.stub.spec';

const params = {
  id: 'accordion',
  buttonOpen: 'Show',
  buttonClose: 'Hide',
  openAll: 'Show all',
  closeAll: 'Hide all',
  items: [
    {
      title: 'Total retail turnover',
      content:
        '<h3 class="u-fs-r">Include:</h3><ul><li>VAT</li><li>internet sales</li><li>retail sales from outlets in Great Britain to <a href="#">customers abroad</a></li></ul><h3 class="u-fs-r">Exclude:</h3><ul><li>revenue from mobile phone network commission and top-up</li><li>sales from catering facilities used by customers</li><li>lottery sales and commission from lottery sales</li><li>sales of car accessories and motor vehicles</li><li>NHS receipts</li><li>automotive fuel</li></ul>'
    },
    {
      title: 'Food sales',
      content:
        '<h3 class="u-fs-r">Include:</h3><ul><li>all fresh food</li><li>other food for human consumption (except chocolate and sugar confectionery)</li><li>soft drinks</li></ul><h3 class="u-fs-r">Exclude:</h3><ul><li>sales from catering facilities used by customers</li></ul>'
    },
    {
      title: 'Alcohol, confectionery, soft drinks and tobacco sales',
      content: '<h3 class="u-fs-r">Include:</h3><ul><li>chocolate and sugar confectionery</li><li>tobacco and smokers’ requisites</li></ul>'
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

  describe('When the component initialises', function() {
    it('then CollapsibleGroup class should be called', function() {
      const mockedCollapsibleGroup = chai.spy(() => {});

      rewiremock('./components/details/collapsible.group')
        .es6()
        .withDefault(mockedCollapsibleGroup);

      rewiremock.enable();

      const mockedCollapsible = require('components/details/collapsible').default;

      mockedCollapsible();

      expect(mockedCollapsibleGroup).to.have.been.called();

      rewiremock.disable();
    });

    it('then the toggle button element should not have a u-d-no class', function() {
      collapsible();
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
      this.group = new CollapsibleGroup(this.toggleButton, [this.collapsible]);

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
          this.mockedEvent = eventMock();

          this.group.handleButtonClick(this.mockedEvent);
        });

        it('prevent default should be called on the click event', function() {
          expect(this.mockedEvent.preventDefault).to.have.been.called();
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
    toggleButton,
    items
  };
}
