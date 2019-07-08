import { awaitPolyfills } from 'js/polyfills/await-polyfills';
import template from 'components/radios/_test-template.njk';
import Radios from 'components/checkboxes/checkboxes';

const params = {
  name: 'contact-preference',
  radios: [
    {
      id: 'email',
      value: 'email',
      label: {
        text: 'Email'
      },
      other: {
        type: 'email',
        label: {
          text: 'Enter your email address'
        }
      }
    },
    {
      id: 'phone',
      value: 'phone',
      label: {
        text: 'Phone'
      },
      other: {
        type: 'tel',
        label: {
          text: 'Enter your phone number'
        }
      }
    },
    {
      id: 'text',
      value: 'text',
      label: {
        text: 'Text'
      },
      other: {
        type: 'tel',
        label: {
          text: 'Enter your phone number'
        }
      }
    }
  ]
};

describe('Component: Radios', function() {
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

  describe('Before the component initialises', function() {
    it('if a checkbox has an other option, it should be given the correct aria-attributes', function() {
      this.radios.forEach(radio => {
        expect(radio.hasAttribute('aria-haspopup')).to.equal(true);
        expect(radio.getAttribute('aria-haspopup')).to.equal('true');
        expect(radio.hasAttribute('aria-controls')).to.equal(true);
        expect(radio.getAttribute('aria-controls')).to.equal(`${radio.id}-other-wrap`);
      });
    });
  });

  describe('When the component initialises', function() {
    beforeEach(function() {
      new Radios('js-radio');
    });

    it('checkboxes with other options should be given aria-expanded attributes', function() {
      this.radios.forEach(radio => {
        expect(radio.hasAttribute('aria-expanded')).to.equal(true);
        expect(radio.getAttribute('aria-expanded')).to.equal('false');
      });
    });

    describe('and a radio checked', function() {
      beforeEach(function() {
        this.radios[0].click();
      });

      // eslint-disable-next-line prettier/prettier
      it('then the checked radio\'s aria-expanded attribute should be set to true', function() {
        expect(this.radios[0].getAttribute('aria-expanded')).to.equal('true');
      });

      // eslint-disable-next-line prettier/prettier
      it('then the unchecked radios\' aria-expanded attribute should be set to false', function() {
        this.radios
          .filter(radio => !radio.checked)
          .forEach(radio => {
            expect(radio.getAttribute('aria-expanded')).to.equal('false');
          });
      });

      describe('and the radio selection is changed', function() {
        beforeEach(function() {
          this.radios[1].click();
        });

        // eslint-disable-next-line prettier/prettier
        it('then the checked radio\'s aria-expanded attribute should be set to true', function() {
          expect(this.radios[1].getAttribute('aria-expanded')).to.equal('true');
        });

        // eslint-disable-next-line prettier/prettier
        it('then the unchecked radios\' aria-expanded attribute should be set to false', function() {
          this.radios
            .filter(radio => !radio.checked)
            .forEach(radio => {
              expect(radio.getAttribute('aria-expanded')).to.equal('false');
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

  const radios = [...wrapper.querySelectorAll('.js-radio')];

  return {
    wrapper,
    radios
  };
}
