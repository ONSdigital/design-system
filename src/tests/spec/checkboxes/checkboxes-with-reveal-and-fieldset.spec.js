import Checkboxes from '../../../components/checkboxes/checkboxes-with-reveal';
import CheckboxWithFieldset from '../../../components/checkboxes/checkbox-with-fieldset';
import renderTemplate from '../../helpers/render-template';

const params = {
  legend: 'What are your favourite pizza toppings?',
  checkboxesLabel: 'Select all that apply',
  name: 'food-other',
  checkboxes: [
    {
      id: 'bacon-other',
      label: {
        text: 'Bacon',
      },
      value: 'bacon',
    },
    {
      id: 'olives-other',
      label: {
        text: 'Olives',
      },
      value: 'olives',
    },
    {
      id: 'other-checkbox',
      label: {
        text: 'Other',
        description: 'An answer is required',
      },
      value: 'other',
      other: {
        id: 'other-textbox',
        name: 'other-answer',
        legend: 'Please specify other',
        otherType: 'checkboxes',
        checkboxes: [
          {
            id: 'bacon-other',
            label: {
              text: 'Bacon',
            },
            value: 'bacon',
          },
          {
            id: 'olives-other',
            label: {
              text: 'Olives',
            },
            value: 'olives',
          },
        ],
      },
    },
  ],
};

describe('Component: Checkboxes', function() {
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
      expect(this.checkboxWithOther.hasAttribute('aria-haspopup')).to.equal(true);
      expect(this.checkboxWithOther.getAttribute('aria-haspopup')).to.equal('true');
      expect(this.checkboxWithOther.hasAttribute('aria-controls')).to.equal(true);
      expect(this.checkboxWithOther.getAttribute('aria-controls')).to.equal(
        `${params.checkboxes[params.checkboxes.length - 1].id}-other-wrap`,
      );
    });
  });

  describe('When the component initialises', function() {
    beforeEach(function() {
      new Checkboxes([...document.querySelectorAll('.ons-js-checkbox')]);
      new CheckboxWithFieldset(document.querySelector('.ons-js-other-fieldset'), [...document.querySelectorAll('.ons-js-checkbox')]);
    });

    it('checkboxes with other options should be given aria-expanded attributes', function() {
      expect(this.checkboxWithOther.hasAttribute('aria-expanded')).to.equal(true);
      expect(this.checkboxWithOther.getAttribute('aria-expanded')).to.equal('false');
    });

    describe('and a checkbox with an other input is checked', function() {
      beforeEach(function() {
        this.checkboxWithOther.click();
      });

      // eslint-disable-next-line prettier/prettier
      it("it's aria-expanded attribute should be set to true", function() {
        expect(this.checkboxWithOther.getAttribute('aria-expanded')).to.equal('true');
      });

      describe('and any other checkbox is changed', function() {
        beforeEach(function() {
          this.checkboxes[0].click();
        });

        // eslint-disable-next-line prettier/prettier
        it("the checkbox with an other input's aria-expanded attribute not change", function() {
          expect(this.checkboxWithOther.getAttribute('aria-expanded')).to.equal('true');
        });
      });

      describe('and a child of other checkbox is checked', function() {
        beforeEach(function() {
          this.childInputs[0].click();
        });

        describe('and a checkbox with an other input is unchecked', function() {
          beforeEach(function() {
            this.checkboxWithOther.click();
          });

          it('its aria-expanded attribute should be set to false', function() {
            expect(this.checkboxWithOther.getAttribute('aria-expanded')).to.equal('false');
          });

          it('the child of other checkbox should be unchecked', function() {
            expect(this.childInputs[0].checked).to.equal(false);
          });
        });
      });
    });
  });
});

function renderComponent(params) {
  const html = renderTemplate('components/checkboxes/_test-template.njk', { params });

  const wrapper = document.createElement('div');
  wrapper.innerHTML = html;
  document.body.appendChild(wrapper);
  const checkboxes = [...wrapper.querySelectorAll('.ons-js-checkbox')];
  const checkboxWithOther = document.getElementById('other-checkbox');
  const fieldset = document.querySelector('.ons-js-other-fieldset');
  const childInputs = [...fieldset.querySelectorAll('input')];

  return {
    wrapper,
    checkboxes,
    checkboxWithOther,
    childInputs,
  };
}
