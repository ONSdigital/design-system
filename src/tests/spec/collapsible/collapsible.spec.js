import { awaitPolyfills } from 'js/polyfills/await-polyfills';
import template from 'components/details/_test-template.njk';
import collapsible, { Collapsible } from 'components/details/collapsible';

const params = {
  id: 'details',
  title: 'What is a photovoltaic system?',
  content:
    '<p>A typical photovoltaic system employs solar panels, each comprising a number of solar cells, which generate electrical power. PV installations may be ground-mounted, rooftop mounted or wall mounted. The mount may be fixed, or use a solar tracker to follow the sun across the sky.</p>',
  button: {
    close: 'Hide this'
  },
  saveState: null
};

describe('Component: Details', function() {
  before(() => awaitPolyfills);

  describe('If the component has a button', function() {
    describe('before the component initialises', function() {
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

      it('then the details element should have a open attribute', function() {
        expect(this.details.hasAttribute('open')).to.be.true;
      });

      it('then the details element should not have a details--initialised class', function() {
        expect(this.details.classList.contains('details--initialised')).to.be.false;
      });

      it('then the summary element should not have a role attribute', function() {
        expect(this.summary.hasAttribute('role')).to.be.false;
      });

      it('then the summary element should not have an aria-expanded attribute', function() {
        expect(this.summary.hasAttribute('aria-expanded')).to.be.false;
      });

      it('then the summary element should not have a tabindex attribute', function() {
        expect(this.summary.hasAttribute('tabindex')).to.be.false;
      });

      it('then the summary element should not have a role attribute', function() {
        expect(this.summary.hasAttribute('role')).to.be.false;
      });

      it('then the summary element should not have an aria-controls attribute', function() {
        expect(this.summary.hasAttribute('aria-controls')).to.be.false;
      });

      it('then the content element should not have an aria-hidden attribute', function() {
        expect(this.content.hasAttribute('aria-hidden')).to.be.false;
      });

      it('then the button element should have a u-d-no class', function() {
        expect(this.button.classList.contains('u-d-no')).to.be.true;
      });
    });

    describe('when the component initialises and savestate is not set', function() {
      beforeEach(function() {
        const component = renderComponent(params);

        Object.keys(component).forEach(key => {
          this[key] = component[key];
        });
        collapsible();
      });

      afterEach(function() {
        if (this.wrapper) {
          this.wrapper.remove();
        }
      });

      it('then the open attribute should be removed from the details element', function() {
        expect(this.details.hasAttribute('open')).to.be.false;
      });

      it('then the details--initialised class should be added to the details element', function() {
        expect(this.details.classList.contains('details--initialised')).to.be.true;
      });

      it('then an aria-expanded attribute should be added to the summary element', function() {
        expect(this.summary.hasAttribute('aria-expanded')).to.be.true;
        expect(this.summary.getAttribute('aria-expanded')).to.equal('false');
      });

      it('then an role attribute should be added to the details element', function() {
        expect(this.details.hasAttribute('role')).to.be.true;
        expect(this.details.getAttribute('role')).to.equal('group');
      });

      it('then a tabindex attribute should be added to the summary element', function() {
        expect(this.summary.hasAttribute('tabindex')).to.be.true;
        expect(this.summary.getAttribute('tabindex')).to.equal('0');
      });

      it('then an aria-controls attribute should be added to the summary element', function() {
        expect(this.summary.hasAttribute('aria-controls')).to.be.true;
        expect(this.summary.getAttribute('aria-controls')).to.equal(this.details.getAttribute('id'));
      });

      it('then an role attribute should be added to the summary element', function() {
        expect(this.summary.hasAttribute('role')).to.be.true;
        expect(this.summary.getAttribute('role')).to.equal('link');
      });

      it('then an aria-hidden attribute should be added to the content element', function() {
        expect(this.content.hasAttribute('aria-hidden')).to.be.true;
        expect(this.content.getAttribute('aria-hidden')).to.equal('true');
      });

      it('then the u-d-no class should be removed from the button element', function() {
        expect(this.button.classList.contains('u-d-no')).to.be.false;
      });

      describe('and the component is closed', function() {
        describe('when the component is opened', function() {
          beforeEach(function() {
            this.summary.click();
          });

          onOpenTests();

          describe('and saveState isnt set', function() {
            it('then the local storage item should not be added', function() {
              expect(localStorage.getItem(this.details.getAttribute('id'))).to.be.null;
            });
          });
        });
      });

      describe('and the component has been opened', function() {
        beforeEach(function(done) {
          this.summary.click();
          setTimeout(done);
        });

        describe('when the component is closed from the summary element', function() {
          beforeEach(function() {
            this.summary.click();
          });

          onCloseTests();
        });

        describe('when the component is closed from the button element', function() {
          beforeEach(function() {
            this.button.click();
          });

          onCloseTests();
        });
      });
    });

    describe('when the component initialises, savestate is set and the element has been set in local storage', function() {
      beforeEach(function() {
        params.saveState = true;
        const component = renderComponent(params);

        Object.keys(component).forEach(key => {
          this[key] = component[key];
        });
        localStorage.setItem(this.details.getAttribute('id'), true);
        collapsible();
      });

      afterEach(function() {
        if (this.wrapper) {
          this.wrapper.remove();
        }
        localStorage.removeItem(this.details.getAttribute('id'));
      });

      onOpenTests();

      describe('and the component is closed', function() {
        beforeEach(function(done) {
          this.summary.click();
          setTimeout(done);
        });

        onCloseTests();

        describe('and the component is opened', function() {
          beforeEach(function(done) {
            this.summary.click();
            setTimeout(done);
          });
          it('then the local storage item should be added', function() {
            expect(localStorage.getItem(this.details.getAttribute('id'))).to.equal('true');
          });
        });
      });
    });
  });

  describe('If the component does not have a button', function() {
    beforeEach(function() {
      delete params.button;
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
        this.collapsible = new Collapsible(this.details);
      });

      it('there should be no closeButton or buttonOpen properties', function() {
        expect(this.collapsible.button).to.be.null;
        expect(this.collapsible.closeButton).to.be.undefined;
        expect(this.collapsible.buttonOpen).to.be.undefined;
      });
    });
  });
});

function renderComponent(params) {
  const html = template.render({ params });

  const wrapper = document.createElement('div');
  wrapper.innerHTML = html;
  document.body.appendChild(wrapper);

  const details = wrapper.querySelector('.js-collapsible');
  const summary = details.querySelector('.js-collapsible-summary');
  const content = details.querySelector('.js-collapsible-content');
  const button = details.querySelector('.js-collapsible-button');

  return {
    wrapper,
    details,
    summary,
    content,
    button
  };
}

function onCloseTests() {
  it('then the open attribute on the details element should be removed', function() {
    expect(this.details.hasAttribute('open')).to.be.false;
  });

  it('then a details--open class should be removed from details', function() {
    expect(this.details.classList.contains('details--open')).to.be.false;
  });

  it('then the aria-expanded attribute on the summary element should be set to false', function() {
    expect(this.summary.getAttribute('aria-expanded')).to.equal('false');
  });

  it('then the data-ga-action attribute on the summary element should be set to "Close panel', function() {
    expect(this.summary.getAttribute('data-ga-action')).to.equal('Close panel');
  });

  it('then the aria-hidden attribute on the content element should be set to true', function() {
    expect(this.content.getAttribute('aria-hidden')).to.equal('true');
  });

  it('then the local storage item should be removed or not set', function() {
    expect(localStorage.getItem(this.details.getAttribute('id'))).to.be.null;
  });
}

function onOpenTests() {
  it('then the open attribute on the summary element should be added', function() {
    expect(this.summary.hasAttribute('aria-expanded')).to.be.true;
  });

  it('then a details--open class should be added to the details', function() {
    expect(this.details.classList.contains('details--open')).to.be.true;
  });

  it('then the aria-expanded attribute on the summary element should be set to true', function() {
    expect(this.summary.getAttribute('aria-expanded')).to.equal('true');
  });

  it('then the data-ga-action attribute on the summary element should be set to "Open panel', function() {
    expect(this.summary.getAttribute('data-ga-action')).to.equal('Open panel');
  });

  it('then the aria-hidden attribute on the content element should be set to false', function() {
    expect(this.content.getAttribute('aria-hidden')).to.equal('false');
  });
}
