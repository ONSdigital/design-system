import { renderComponent, setTestPage } from '../../tests/helpers/rendering';

describe('script: checkboxes', () => {
  describe('automatic selection', () => {
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

    beforeEach(async () => {
      await setTestPage('/test', renderComponent('checkboxes', params));
    });

    describe('and the autoselect button is clicked', () => {
      beforeEach(async () => {
        await page.click('.ons-js-auto-selector');
      });

      it('all checkboxes should be checked', async () => {
        const checkedStates = await page.$$eval('.ons-js-checkbox', nodes => nodes.map(node => node.checked));
        expect(checkedStates).toEqual([true, true, true]);
      });

      it('the button text should have changed', async () => {
        const buttonText = await page.$eval('.ons-js-button-text', node => node.textContent);
        expect(buttonText).toBe('Unselect all');
      });
    });

    describe('and the autoselect button is clicked to select all and clicked again', () => {
      beforeEach(async () => {
        await page.click('.ons-js-auto-selector');
        await page.click('.ons-js-auto-selector');
      });

      it('all checkboxes should be unchecked', async () => {
        const checkedStates = await page.$$eval('.ons-js-checkbox', nodes => nodes.map(node => node.checked));
        expect(checkedStates).toEqual([false, false, false]);
      });

      it('the button text should have changed', async () => {
        const buttonText = await page.$eval('.ons-js-button-text', node => node.textContent);
        expect(buttonText).toBe('Select all');
      });
    });

    describe('when all except one checkbox is checked', () => {
      beforeEach(async () => {
        await page.$eval('#olives-other', node => (node.checked = true));
      });

      it('the button text should be select all', async () => {
        const buttonText = await page.$eval('.ons-js-button-text', node => node.textContent);
        expect(buttonText).toBe('Select all');
      });
    });

    describe('when the only unchecked checkbox is checked', () => {
      beforeEach(async () => {
        await page.click('#bacon-other');
        await page.click('#olives-other');
        await page.click('#other-checkbox');
      });

      it('the button text should be unselect all', async () => {
        const buttonText = await page.$eval('.ons-js-button-text', node => node.textContent);
        expect(buttonText).toBe('Unselect all');
      });
    });
  });

  describe('reveal and fieldset', function() {
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
      await setTestPage('/test', renderComponent('checkboxes', params));
    });

    it('checkboxes with other options should be given aria-expanded attributes', async () => {
      const ariaExpanded = await page.$eval('#other-checkbox', node => node.getAttribute('aria-expanded'));
      expect(ariaExpanded).toBe('false');
    });

    describe('and a checkbox with an other input is checked', () => {
      beforeEach(async () => {
        await page.click('#other-checkbox');
      });

      it('has aria-expanded attribute should be set to true', async () => {
        const ariaExpanded = await page.$eval('#other-checkbox', node => node.getAttribute('aria-expanded'));
        expect(ariaExpanded).toBe('true');
      });

      describe('and any other checkbox is changed', () => {
        beforeEach(async () => {
          await page.click('#bacon-other');
        });

        it('the checkbox with an other input aria-expanded attribute not change', async () => {
          const ariaExpanded = await page.$eval('#other-checkbox', node => node.getAttribute('aria-expanded'));
          expect(ariaExpanded).toBe('true');
        });
      });

      describe('and a child of other checkbox is checked', () => {
        beforeEach(async () => {
          await page.click('#inner-bacon-other');
        });

        describe('and a checkbox with an other input is unchecked', () => {
          beforeEach(async () => {
            await page.click('#other-checkbox');
          });

          it('its aria-expanded attribute should be set to false', async () => {
            const ariaExpanded = await page.$eval('#other-checkbox', node => node.getAttribute('aria-expanded'));
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
