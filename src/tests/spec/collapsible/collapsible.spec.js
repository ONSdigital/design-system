import { awaitPolyfills } from 'js/polyfills/await-polyfills';
import template from 'components/details/src/_template.njk';
import collapsible from 'components/details/src/collapsible';

const params = {
  id: 'details',
  title: 'What is a photovoltaic system?',
  content:
    '<p>A typical photovoltaic system employs solar panels, each comprising a number of solar cells, which generate electrical power. PV installations may be ground-mounted, rooftop mounted or wall mounted. The mount may be fixed, or use a solar tracker to follow the sun across the sky.</p>',
  button: 'Hide this'
};

describe('Component: Details', function() {
  before(() => awaitPolyfills);

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
    it('then the details element should have a open attribute', function() {
      expect(this.details.hasAttribute('open')).to.be.true;
    });

    it('then the details element should not have a details--has-js class', function() {
      expect([...this.details.classList].includes('details--has-js')).to.be.false;
    });

    it('then the details element should not have an aria-expanded attribute', function() {
      expect(this.details.hasAttribute('aria-expanded')).to.be.false;
    });

    it('then the details element should not have an aria-selected attribute', function() {
      expect(this.details.hasAttribute('aria-selected')).to.be.false;
    });

    it('then the summary element should not have a tabindex attribute', function() {
      expect(this.summary.hasAttribute('tabindex')).to.be.false;
    });

    it('then the summary element should not have an aria-controls attribute', function() {
      expect(this.summary.hasAttribute('aria-controls')).to.be.false;
    });

    it('then the content element should not have an aria-hidden attribute', function() {
      expect(this.content.hasAttribute('aria-hidden')).to.be.false;
    });

    it('then the button element should have a u-d-no class', function() {
      expect([...this.button.classList].includes('u-d-no')).to.be.true;
    });
  });

  describe('When the component initialises', function() {
    beforeEach(() => {
      collapsible();
    });

    it('then the open attribute should be removed from the details element', function() {
      expect(this.details.hasAttribute('open')).to.be.false;
    });

    it('then the details--has-js class should be added to the details element', function() {
      expect([...this.details.classList].includes('details--has-js')).to.be.true;
    });

    it('then an aria-expanded attribute should be added to the details element', function() {
      expect(this.details.hasAttribute('aria-expanded')).to.be.true;
      expect(this.details.getAttribute('aria-expanded')).to.equal('false');
    });

    it('then an aria-selected attribute should be added to the details element', function() {
      expect(this.details.hasAttribute('aria-selected')).to.be.true;
      expect(this.details.getAttribute('aria-selected')).to.equal('false');
    });

    it('then a tabindex attribute should be added to the summary element', function() {
      expect(this.summary.hasAttribute('tabindex')).to.be.true;
      expect(this.summary.getAttribute('tabindex')).to.equal('0');
    });

    it('then an aria-controls attribute should be added to the summary element', function() {
      expect(this.summary.hasAttribute('aria-controls')).to.be.true;
      expect(this.summary.getAttribute('aria-controls')).to.equal(this.content.getAttribute('id'));
    });

    it('then an aria-hidden attribute should be added to the content element', function() {
      expect(this.content.hasAttribute('aria-hidden')).to.be.true;
      expect(this.content.getAttribute('aria-hidden')).to.equal('true');
    });

    it('then the u-d-no class should be removed from the button element', function() {
      expect([...this.button.classList].includes('u-d-no')).to.be.false;
    });

    describe('and the component is closed', function() {
      describe('when the component is opened', function() {
        beforeEach(function() {
          this.summary.click();
        });

        it('then the open attribute on the details element should be added', function() {
          expect(this.details.hasAttribute('aria-expanded')).to.be.true;
        });

        it('then a details--open class should be added to the details', function() {
          expect([...this.details.classList].includes('details--open')).to.be.true;
        });

        it('then the aria-expanded attribute on the details element should be set to true', function() {
          expect(this.details.getAttribute('aria-expanded')).to.equal('true');
        });

        it('then the aria-selected attribute on the details element should be set to true', function() {
          expect(this.details.getAttribute('aria-selected')).to.equal('true');
        });

        it('then the data-ga-action attribute on the summary element should be set to "Open panel', function() {
          expect(this.summary.getAttribute('data-ga-action')).to.equal('Open panel');
        });

        it('then the aria-hidden attribute on the content element should be set to false', function() {
          expect(this.content.getAttribute('aria-hidden')).to.equal('false');
        });
      });
    });

    describe('and the component has been opened', function() {
      beforeEach(function() {
        this.summary.click();
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
    console.log(this);

    expect(this.details.hasAttribute('aria-expanded')).to.be.true;
  });

  it('then a details--open class should be removed from details', function() {
    expect([...this.details.classList].includes('details--open')).to.be.false;
  });

  it('then the aria-expanded attribute on the details element should be set to false', function() {
    expect(this.details.getAttribute('aria-expanded')).to.equal('false');
  });

  it('then the aria-selected attribute on the details element should be set to false', function() {
    expect(this.details.getAttribute('aria-selected')).to.equal('false');
  });

  it('then the data-ga-action attribute on the summary element should be set to "Close panel', function() {
    expect(this.summary.getAttribute('data-ga-action')).to.equal('Close panel');
  });

  it('then the aria-hidden attribute on the content element should be set to true', function() {
    expect(this.content.getAttribute('aria-hidden')).to.equal('true');
  });
}
