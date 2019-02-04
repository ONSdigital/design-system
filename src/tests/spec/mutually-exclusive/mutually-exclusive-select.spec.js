import { awaitPolyfills } from 'js/polyfills/await-polyfills';
import template from 'components/select/src/_template.njk';
import mutuallyExclusive from 'components/mutually-exclusive/src/mutually-exclusive';

const params = {
  id: 'select',
  name: 'select',
  label: {
    text: 'Select your favourite cartoon character'
  },
  options: [
    {
      value: '',
      text: 'Select an option',
      disabled: true,
      selected: true
    },
    {
      value: 'bart',
      text: 'Bart Simpson'
    },
    {
      value: 'homer',
      text: 'Homer Simpson'
    },
    {
      value: 'marge',
      text: 'Marge Simpson'
    },
    {
      value: 'lisa',
      text: 'Lisa Simpson'
    },
    {
      value: 'maggie',
      text: 'Maggie Simpson'
    },
    {
      value: 'ned',
      text: 'Ned Flanders'
    },
    {
      value: '7-dwarves',
      text: 'The 7 Dwarves: Grumpy, Happy, Sleepy, Bashful, Sneezy, Dopey, Doc'
    }
  ],
  mutuallyExclusive: {
    or: 'Or',
    deselectMessage: 'Selecting this will clear your selection',
    deselectAdjective: 'deselected',
    checkbox: {
      id: 'select-checkbox',
      name: 'no-select',
      value: 'no-select',
      label: {
        text: 'I dont want to select a cartoon character'
      }
    }
  }
};

describe('Component: Mutually Exclusive Select', () => {
  let wrapper, select, checkbox;
  // let ariaAlert;

  before(() => {
    return awaitPolyfills;
  });

  beforeEach(() => {
    const html = template.render({ params });

    wrapper = document.createElement('div');
    wrapper.innerHTML = html;
    document.body.appendChild(wrapper);

    select = document.getElementById(params.id);
    checkbox = document.getElementById(params.mutuallyExclusive.checkbox.id);
    ariaAlert = document.querySelector('.js-exclusive-alert');

    mutuallyExclusive();
  });

  afterEach(() => {
    if (wrapper) {
      wrapper.remove();
    }
  });

  describe('Given the user populated the select', () => {
    beforeEach(() => {
      populateInput(select);
    });

    describe('when the user clicks the mutually exclusive option', () => {
      beforeEach(() => {
        checkbox.click();
      });

      it('then the select should be cleared', () => {
        expect(select.value).to.equal('');
      });

      // it('then the aria alert should tell the user that the select has been cleared', () => {
      //   expect(ariaAlert.innerHTML).to.equal(`${params.label.text} cleared.`);
      // });
    });
  });

  describe('Given the user has checked the mutually exclusive checkbox', () => {
    beforeEach(() => {
      checkbox.click();
    });

    describe('when the user populates the select', () => {
      beforeEach(() => {
        populateInput(select);
      });

      it('then the checkbox should be unchecked', () => {
        expect(checkbox.checked).to.equal(false);
      });

      // it('then the aria alert should tell the user that the checkbox has been unchecked', () => {
      //   expect(ariaAlert.innerHTML).to.equal(`"${params.checkbox.label.text}" deselected.`);
      // });
    });
  });

  // describe('Given the user has not populated the select or checked the checkbox', () => {
  //   describe('when the user populates the select', () => {
  //     beforeEach(() => {
  //       populateInput(input);
  //     });

  //     it('then the aria alert shouldnt say anything', () => {
  //       expect(ariaAlert.innerHTML).to.equal('');
  //     });
  //   });

  //   describe('when the user clicks the mutually exclusive option', () => {
  //     beforeEach(() => {
  //       checkbox.click();
  //     });

  //     it('then the aria alert shouldnt say anything', () => {
  //       expect(ariaAlert.innerHTML).to.equal('');
  //     });
  //   });
  // });
});

function populateInput(input) {
  input.value = params.options[2].value;
  const event = new CustomEvent('input');
  input.dispatchEvent(event);
}
