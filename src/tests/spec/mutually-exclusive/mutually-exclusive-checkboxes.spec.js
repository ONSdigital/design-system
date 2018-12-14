import { awaitPolyfills } from 'js/polyfills/await-polyfills';
import template from 'components/checkboxes/src/_template.njk';
import mutuallyExclusive from 'js/mutually-exclusive';

const params = {
  legend: 'Select all that apply',
  name: 'mutually-exclusive',
  mutuallyExclusive: true,
  or: 'or',
  deselectMessage: 'Selecting this will uncheck all other checkboxes',
  deselectAdjective: 'deselected',
  checkboxes: [
    {
      id: 'gas',
      label: {
        text: 'Gas'
      },
      value: 'gas'
    },
    {
      id: 'electric',
      label: {
        text: 'Electric'
      },
      value: 'electric'
    },
    {
      id: 'solid-fuel',
      label: {
        text: 'Solid fuel'
      },
      value: 'solid-fuel'
    },
    {
      id: 'other-fuel',
      label: {
        text: 'Other'
      },
      value: 'other',
      other: {
        id: 'other-fuel-textbox',
        name: 'other-fuel-answer',
        label: {
          text: 'Please specify'
        }
      }
    },
    {
      id: 'no-central-heating',
      label: {
        text: 'No central heating'
      },
      value: 'no-central-heating',
      exclusive: true
    }
  ]
};

describe('Component: Mutually Exclusive Checkbox With Single Checkbox Override', () => {
  let wrapper, nonExclusiveCheckboxes, exclusiveCheckbox, exclusiveCheckboxElem, ariaAlert;

  before(() => {
    return awaitPolyfills;
  });

  beforeEach(() => {
    const html = template.render({ params });
  
    wrapper = document.createElement('div');
    wrapper.innerHTML = html;
    document.body.appendChild(wrapper);

    nonExclusiveCheckboxes = params.checkboxes.filter(checkbox => !checkbox.exclusive);
    exclusiveCheckbox = params.checkboxes.find(checkbox => checkbox.exclusive);
    exclusiveCheckboxElem = document.getElementById(exclusiveCheckbox.id);
    ariaAlert = document.querySelector('.js-exclusive-alert');

    mutuallyExclusive();
  });

  afterEach(() => {
    if (wrapper) {
      wrapper.remove();
    }
  });

  describe('Given the user has clicked multiple non-exclusive options', () => {
    beforeEach(() => {
      nonExclusiveCheckboxes.forEach(checkbox => {
        const element = document.getElementById(checkbox.id);
        element.click();

        if (checkbox.other) {
          const otherElement = document.getElementById(checkbox.other.id);
          otherElement.value = 'Biofuel';
        }
      });
    });

    describe('when the user clicks the mutually exclusive option', () => {
      beforeEach(() => {
        exclusiveCheckboxElem.click();
      });

      describe('then only the mutually exclusive option should be checked', () => {
        it('', () => {
          expect(exclusiveCheckboxElem.checked).to.equal(true);
          expect(exclusiveCheckboxElem.value).to.equal(exclusiveCheckbox.value);
    
          nonExclusiveCheckboxes.forEach(checkbox => {
            const element = document.getElementById(checkbox.id);
    
            expect(element.checked).to.equal(false);
            expect(element.value).to.equal(checkbox.value);
    
            if (checkbox.other) {
              const otherElement = document.getElementById(checkbox.other.id);
    
              expect(otherElement.value).to.equal('');
            }
          });     
        });
      });

      // describe('then the aria-live message should reflect the removed non exclusive options', () => {
      //   it('', () => {
      //     const message = nonExclusiveCheckboxes.map(checkbox => checkbox.label.text + ` ${params.deselectAdjective}.`).join(' ');
      //     expect(ariaAlert.innerHTML).to.equal(message);
      //   });
      // });
    });

  });

  describe('Given the user has clicked the mutually exclusive option', () => {
    beforeEach(() => {
      exclusiveCheckboxElem.click();
    });

    describe('when the user clicks the non-exclusive options', () => {
      beforeEach(() => {
        nonExclusiveCheckboxes.forEach(checkbox => {
          const element = document.getElementById(checkbox.id);
  
          element.click();
        });
      });

      describe(' then only the non-exclusive options should be checked', () => {
        it('', () => {
          nonExclusiveCheckboxes.forEach(checkbox => {
            const element = document.getElementById(checkbox.id);
    
            expect(element.checked).to.equal(true);
            expect(element.value).to.equal(checkbox.value);
          });
    
          expect(exclusiveCheckboxElem.checked).to.equal(false);
          expect(exclusiveCheckboxElem.value).to.equal(exclusiveCheckbox.value);
        });
      });

      // describe('then the aria-live message should reflect the removed exclusive option', () => {
      //   it('', () => {
      //     expect(ariaAlert.innerHTML).to.equal(`${exclusiveCheckbox.label.text} ${params.deselectAdjective}.`);
      //   });
      // });
    });
  });

  describe('Given the user has not clicked the mutually exclusive option', () => {
    beforeEach(() => {
      expect(exclusiveCheckboxElem.checked).to.equal(false);
    });

    describe('when the user clicks multiple non-exclusive options', () => {
      beforeEach(() => {
        nonExclusiveCheckboxes.forEach(checkbox => {
          const element = document.getElementById(checkbox.id);
          element.click();
        });
      });

      describe('then only the non-exclusive options should be checked', () => {
        it('', () => {
          nonExclusiveCheckboxes.forEach(checkbox => {
            const element = document.getElementById(checkbox.id);
            expect(element.checked).to.equal(true);
          });
    
          expect(exclusiveCheckboxElem.checked).to.equal(false);
        });
      });

      // describe('then the aria-live message should say nothing', () => {
      //   it('', () => {
      //     expect(ariaAlert.innerHTML).to.equal('');
      //   });
      // });
    });
  });

  describe('Given the user has not clicked any of the non-exclusive options', () => {
    beforeEach(() => {
      nonExclusiveCheckboxes.forEach(checkbox => {
        const element = document.getElementById(checkbox.id);
        expect(element.checked).to.equal(false);
      });
    });

    describe('when the user clicks the mutually exclusive option', () => {
      beforeEach(() => {
        exclusiveCheckboxElem.click();
      });

      describe('then only the exclusive option should be checked', () => {
        it('', () => {
          expect(exclusiveCheckboxElem.checked).to.equal(true);
    
          nonExclusiveCheckboxes.forEach(checkbox => {
            const element = document.getElementById(checkbox.id);
            expect(element.checked).to.equal(false);
          });
        });
      });

      // describe('then the aria-live message should say nothing', () => {
      //   it('', () => {
      //     expect(ariaAlert.innerHTML).to.equal('');
      //   });
      // });
    });
  });
});
