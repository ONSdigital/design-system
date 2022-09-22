import { renderComponent, setTestPage } from '../../tests/helpers/rendering';

const EXAMPLE_RADIOS_PARAMS = {
  name: 'contact-preference',
  clearRadios: {
    text: 'Clear selection',
    url: '/',
    ariaClearText: 'You can clear your answer by clicking the clear selection button under the radio buttons',
    ariaClearedText: 'You have cleared your answer',
  },
  legend: 'How would you like us to contact you?',
  legendClasses: 'ons-u-vh',
  radios: [
    {
      id: 'email',
      value: 'email',
      label: {
        text: 'Email',
      },
      other: {
        id: 'email-other',
        type: 'email',
        label: {
          text: 'Enter your email address',
        },
      },
    },
    {
      id: 'phone',
      value: 'phone',
      label: {
        text: 'Phone',
      },
      other: {
        id: 'tel-other',
        type: 'tel',
        label: {
          text: 'Enter your phone number',
        },
      },
    },
    {
      id: 'text',
      value: 'Open input test',
      label: {
        text: 'Text',
      },
      other: {
        id: 'text-other',
        type: 'text',
        open: true,
        label: {
          text: 'Enter something else',
        },
      },
    },
  ],
};

describe('script: radios', () => {
  describe('other options', () => {
    beforeEach(async () => {
      await setTestPage('/test', renderComponent('radios', EXAMPLE_RADIOS_PARAMS));
    });

    it('radios with other options should be given aria-expanded attributes', async () => {
      const ariaExpandedOption1 = await page.$eval('#email', node => node.getAttribute('aria-expanded'));
      expect(ariaExpandedOption1).toBe('false');
      const ariaExpandedOption2 = await page.$eval('#phone', node => node.getAttribute('aria-expanded'));
      expect(ariaExpandedOption2).toBe('false');
    });

    it('radios with "open" other options should not be given aria-expanded attributes', async () => {
      const hasAriaExpandedOption3 = await page.$eval('#text', node => node.hasAttribute('aria-expanded'));
      expect(hasAriaExpandedOption3).toBe(false);
    });

    describe('a radio checked', () => {
      beforeEach(async () => {
        await page.click('#email');
      });

      it('then the checked radio aria-expanded attribute should be set to true', async () => {
        const ariaExpandedOption1 = await page.$eval('#email', node => node.getAttribute('aria-expanded'));
        expect(ariaExpandedOption1).toBe('true');
      });

      it('then the unchecked radio aria-expanded attribute should be set to false', async () => {
        const ariaExpandedOption2 = await page.$eval('#phone', node => node.getAttribute('aria-expanded'));
        expect(ariaExpandedOption2).toBe('false');
      });

      it('then the unchecked radio aria-expanded attribute of "open" radio should not be set', async () => {
        const hasAriaExpanded = await page.$eval('#text', node => node.hasAttribute('aria-expanded'));
        expect(hasAriaExpanded).toBe(false);
      });

      it('then the clear button should be visible', async () => {
        const isHidden = await page.$eval('.ons-js-clear-btn', node => node.classList.contains('ons-u-db-no-js_enabled'));
        expect(isHidden).toBe(false);
      });

      it('then the aria live message should announce that the answer can be cleared', async () => {
        const alertText = await page.$eval('.ons-js-clear-radio-alert', node => node.innerHTML);
        expect(alertText).toBe('You can clear your answer by clicking the clear selection button under the radio buttons');
      });

      describe('and the radio selection is changed', () => {
        beforeEach(async () => {
          await page.click('#phone');
        });

        it('then the checked radio aria-expanded attribute should be set to true', async () => {
          const ariaExpandedOption2 = await page.$eval('#phone', node => node.getAttribute('aria-expanded'));
          expect(ariaExpandedOption2).toBe('true');
        });

        it('then the unchecked radio aria-expanded attribute should be set to false', async () => {
          const ariaExpandedOption1 = await page.$eval('#email', node => node.getAttribute('aria-expanded'));
          expect(ariaExpandedOption1).toBe('false');
        });

        it('then the unchecked radio aria-expanded attribute of "open" radio should not be set', async () => {
          const hasAriaExpanded = await page.$eval('#text', node => node.hasAttribute('aria-expanded'));
          expect(hasAriaExpanded).toBe(false);
        });
      });
    });

    describe('the clear button is clicked', () => {
      beforeEach(async () => {
        await page.$eval('.ons-js-clear-btn', node => node.click());
      });

      it('then the clear button should not be visible', async () => {
        const isHidden = await page.$eval('.ons-js-clear-btn', node => node.classList.contains('ons-u-db-no-js_enabled'));
        expect(isHidden).toBe(true);
      });

      it('then the aria live message should announce that the answer has been cleared', async () => {
        const alertText = await page.$eval('.ons-js-clear-radio-alert', node => node.innerHTML);
        expect(alertText).toBe('You have cleared your answer');
      });

      it('then all radios should not be checked', async () => {
        const checkedRadios = await page.$$eval('.ons-js-radio', nodes => nodes.map(node => node.checked));
        expect(checkedRadios).not.toContain(true);
      });

      it('then all other input fields should be empty', async () => {
        const emailOtherValue = await page.$eval('#email-other', node => node.value);
        expect(emailOtherValue).toBe('');
        const telOtherValue = await page.$eval('#tel-other', node => node.value);
        expect(telOtherValue).toBe('');
        const textOtherValue = await page.$eval('#text-other', node => node.value);
        expect(textOtherValue).toBe('');
      });
    });

    describe('there is a visible input which is focused', () => {
      beforeEach(async () => {
        await page.focus('#text-other');
      });

      it('then the radio button should be checked', async () => {
        const isRadioChecked = await page.$eval('#text', node => node.checked);
        expect(isRadioChecked).toBe(true);
      });
    });

    describe('there is a visible input and the radio is checked', () => {
      beforeEach(async () => {
        await page.click('#text');
      });

      it('then the input should have a tab index of 0', async () => {
        const tabIndex = await page.$eval('#text-other', node => node.getAttribute('tabindex'));
        expect(tabIndex).toBe('0');
      });
    });
  });

  describe('reveal and fieldset', function() {
    const params = {
      legend: 'What are your favourite pizza toppings?',
      name: 'food-other',
      radios: [
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
          id: 'other-radio',
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
                id: 'inner-bacon-other',
                label: {
                  text: 'Bacon',
                },
                value: 'bacon',
              },
              {
                id: 'inner-olives-other',
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

    beforeEach(async () => {
      await setTestPage('/test', renderComponent('radios', params));
    });

    it('radios with other options should be given aria-expanded attributes', async () => {
      const ariaExpanded = await page.$eval('#other-radio', node => node.getAttribute('aria-expanded'));
      expect(ariaExpanded).toBe('false');
    });

    describe('and a radio with an other input is checked', () => {
      beforeEach(async () => {
        await page.click('#other-radio');
      });

      it('has aria-expanded attribute should be set to true', async () => {
        const ariaExpanded = await page.$eval('#other-radio', node => node.getAttribute('aria-expanded'));
        expect(ariaExpanded).toBe('true');
      });

      describe('and any other radio is changed', () => {
        beforeEach(async () => {
          await page.click('#bacon-other');
        });

        it('the radio with an other input aria-expanded attribute changes', async () => {
          const ariaExpanded = await page.$eval('#other-radio', node => node.getAttribute('aria-expanded'));
          expect(ariaExpanded).toBe('false');
        });
      });

      describe('and a child of other radio is checked', () => {
        beforeEach(async () => {
          await page.click('#inner-bacon-other');
        });

        describe('and another radio is checked', () => {
          beforeEach(async () => {
            await page.click('#olives-other');
          });

          it('the other radio aria-expanded attribute should be set to false', async () => {
            const ariaExpanded = await page.$eval('#other-radio', node => node.getAttribute('aria-expanded'));
            expect(ariaExpanded).toBe('false');
          });

          it('the child of other checkbox should be unchecked', async () => {
            const innerInputChecked = await page.$eval('#inner-bacon-other', node => node.checked);
            expect(innerInputChecked).toBe(false);
          });
        });
      });
    });
  });
});
