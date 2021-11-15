import CheckboxWithAutoSelect from '../../../components/checkboxes/checkbox-with-autoselect';
import renderTemplate from '../../helpers/render-template';

const params = {
  legend: 'What are your favourite pizza toppings?',
  checkboxesLabel: 'Select all that apply',
  name: 'food-other',
  autoSelect: {
    selectAllText: 'Select all',
    unselectAllText: 'Unselect all',
    context: 'following checkboxes',
  },
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

  describe('When the component initialises', function() {
    beforeEach(function() {
      new CheckboxWithAutoSelect(
        document.querySelector('.ons-js-auto-selector').parentNode,
        document.querySelector('.ons-js-auto-selector'),
      );
    });

    describe('and the autoselect button is clicked', function() {
      beforeEach(function() {
        this.checkboxes.forEach(checkbox => {
          checkbox.checked = false;
        });
        this.button.click();
      });

      it('all checkboxes should be checked', function() {
        this.checkboxes.forEach(checkbox => {
          expect(checkbox.checked).to.equal(true);
        });
      });

      it('the button text should have changed', function() {
        const buttonText = this.button.querySelector('.ons-js-button-text');
        expect(buttonText.textContent).to.equal(params.autoSelect.unselectAllText);
      });
    });

    describe('and the autoselect button is clicked to select all and clicked again', function() {
      beforeEach(function() {
        this.button.click();
        this.button.click();
      });

      it('all checkboxes should be unchecked', function(done) {
        setTimeout(() => {
          this.checkboxes.forEach(checkbox => {
            expect(checkbox.checked).to.equal(false);
            done();
          });
        }, 500);
      });

      it('the button text should have changed', function(done) {
        setTimeout(() => {
          const buttonText = this.button.querySelector('.ons-js-button-text');
          expect(buttonText.textContent).to.equal(params.autoSelect.selectAllText);
          done();
        }, 500);
      });
    });

    describe('when all except one checkbox is checked', function() {
      beforeEach(function() {
        this.checkboxes.forEach(checkbox => {
          checkbox.checked = true;
        });
        this.checkboxes[0].checked = false;
      });

      it('the button text should be select all', function(done) {
        setTimeout(() => {
          const buttonText = this.button.querySelector('.ons-js-button-text');
          expect(buttonText.textContent).to.equal(params.autoSelect.selectAllText);
          done();
        }, 500);
      });
    });

    describe('when the only unchecked checkbox is checked', function() {
      beforeEach(function() {
        this.checkboxes.forEach(checkbox => {
          checkbox.checked = true;
        });
        this.checkboxes[0].click();
        this.checkboxes[0].click();
      });

      it('the button text should be unselect all', function(done) {
        setTimeout(() => {
          const buttonText = this.button.querySelector('.ons-js-button-text');
          expect(buttonText.textContent).to.equal(params.autoSelect.unselectAllText);
          done();
        }, 1000);
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
  const button = document.querySelector('.ons-js-auto-selector');

  return {
    wrapper,
    checkboxes,
    button,
  };
}
