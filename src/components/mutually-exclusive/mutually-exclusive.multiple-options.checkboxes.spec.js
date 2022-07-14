import { renderComponent, setTestPage } from '../../tests/helpers/rendering';

const SCREEN_READER_TIMEOUT_DELAY = 300;

const EXAMPLE_MUTUALLY_EXCLUSIVE_CHECKBOXES_PARAMS = {
  legend: 'What type of central heating do you have?',
  checkboxesLabel: 'Select all that apply',
  name: 'mutually-exclusive',
  checkboxes: [
    {
      id: 'gas',
      label: {
        text: 'Gas',
      },
      value: 'gas',
    },
    {
      id: 'electric',
      label: {
        text: 'Electric',
      },
      value: 'electric',
    },
    {
      id: 'solid-fuel',
      label: {
        text: 'Solid fuel',
      },
      value: 'solid-fuel',
    },
    {
      id: 'other-fuel',
      label: {
        text: 'Other',
      },
      value: 'other',
      other: {
        id: 'other-fuel-textbox',
        name: 'other-fuel-answer',
        label: {
          text: 'Please specify',
        },
      },
    },
  ],
  mutuallyExclusive: {
    or: 'or',
    deselectMessage: 'Selecting this will uncheck all other checkboxes',
    deselectGroupAdjective: 'deselected',
    deselectExclusiveOptionAdjective: 'deselected',
    exclusiveOptions: [
      {
        id: 'no-central-heating',
        label: {
          text: 'No central heating',
        },
        value: 'no-central-heating',
      },
      {
        id: 'dont-know',
        label: {
          text: 'Dont know',
        },
        value: 'dont-know',
      },
    ],
  },
};

describe('script: mutually-exclusive', () => {
  describe('checkboxes', () => {
    beforeEach(async () => {
      await setTestPage('/test', renderComponent('checkboxes', EXAMPLE_MUTUALLY_EXCLUSIVE_CHECKBOXES_PARAMS));
    });

    describe('Given the user has clicked multiple non-exclusive options', () => {
      beforeEach(async () => {
        await page.click('#gas');
        await page.click('#electric');
        await page.click('#other-fuel');
        await page.type('#other-fuel-textbox', 'Biofuel');
      });

      describe('when the user clicks a mutually exclusive option', () => {
        beforeEach(async () => {
          await page.click('#dont-know');
        });

        it('then the mutually exclusive option is checked', async () => {
          const isChecked = await page.$eval('#dont-know', node => node.checked);
          expect(isChecked).toBe(true);
        });

        it('then the checkboxes are not checked', async () => {
          expect(await page.$eval('#gas', node => node.checked)).toBe(false);
          expect(await page.$eval('#electric', node => node.checked)).toBe(false);
          expect(await page.$eval('#solid-fuel', node => node.checked)).toBe(false);
          expect(await page.$eval('#other-fuel', node => node.checked)).toBe(false);
          expect(await page.$eval('#other-fuel-textbox', node => node.value)).toBe('');
        });

        it('then the aria-live message should reflect the removed non exclusive options', async () => {
          await page.waitForTimeout(SCREEN_READER_TIMEOUT_DELAY);

          const alertText = await page.$eval('.ons-js-exclusive-alert', node => node.textContent);
          expect(alertText).toBe('Gas deselected. Electric deselected. Other deselected. Please specify deselected.');
        });
      });
    });

    describe('Given the user has clicked the mutually exclusive option', () => {
      beforeEach(async () => {
        await page.click('#dont-know');
      });

      describe('when the user clicks the non-exclusive options', () => {
        beforeEach(async () => {
          await page.click('#gas');
          await page.click('#electric');
          await page.click('#other-fuel');
        });

        it('then the expected checkboxes are checked', async () => {
          expect(await page.$eval('#gas', node => node.checked)).toBe(true);
          expect(await page.$eval('#electric', node => node.checked)).toBe(true);
          expect(await page.$eval('#solid-fuel', node => node.checked)).toBe(false);
          expect(await page.$eval('#other-fuel', node => node.checked)).toBe(true);
        });

        it('then the exclusive options should not be checked', async () => {
          expect(await page.$eval('#no-central-heating', node => node.checked)).toBe(false);
          expect(await page.$eval('#dont-know', node => node.checked)).toBe(false);
        });

        it('then the aria-live message should reflect the removed exclusive option', async () => {
          await page.waitForTimeout(SCREEN_READER_TIMEOUT_DELAY);

          const alertText = await page.$eval('.ons-js-exclusive-alert', node => node.textContent);
          expect(alertText).toBe('Dont know deselected.');
        });

        describe('and the user deselects an non-exclusive option', () => {
          beforeEach(async () => {
            await page.click('#electric');
          });

          it('the aria-live message should not be updated', async () => {
            await page.waitForTimeout(SCREEN_READER_TIMEOUT_DELAY);

            const alertText = await page.$eval('.ons-js-exclusive-alert', node => node.textContent);
            expect(alertText).toBe('Dont know deselected.');
          });
        });
      });
    });

    describe('Given the user has not clicked the mutually exclusive option', () => {
      describe('when the user clicks multiple non-exclusive options', () => {
        beforeEach(async () => {
          await page.click('#gas');
          await page.click('#electric');
          await page.click('#other-fuel');
        });

        it('then the expected checkboxes are checked', async () => {
          expect(await page.$eval('#gas', node => node.checked)).toBe(true);
          expect(await page.$eval('#electric', node => node.checked)).toBe(true);
          expect(await page.$eval('#solid-fuel', node => node.checked)).toBe(false);
          expect(await page.$eval('#other-fuel', node => node.checked)).toBe(true);
        });

        it('then the exclusive options should not be checked', async () => {
          expect(await page.$eval('#no-central-heating', node => node.checked)).toBe(false);
          expect(await page.$eval('#dont-know', node => node.checked)).toBe(false);
        });

        it('then the aria-live message should say nothing', async () => {
          await page.waitForTimeout(SCREEN_READER_TIMEOUT_DELAY);

          const alertText = await page.$eval('.ons-js-exclusive-alert', node => node.textContent);
          expect(alertText).toBe('');
        });
      });
    });

    describe('Given the user has not clicked any of the non-exclusive options', () => {
      describe('when the user clicks the mutually exclusive option', () => {
        beforeEach(async () => {
          await page.click('#dont-know');
        });

        it('then the expected checkboxes are not checked', async () => {
          expect(await page.$eval('#gas', node => node.checked)).toBe(false);
          expect(await page.$eval('#electric', node => node.checked)).toBe(false);
          expect(await page.$eval('#solid-fuel', node => node.checked)).toBe(false);
          expect(await page.$eval('#other-fuel', node => node.checked)).toBe(false);
        });

        it('then the exclusive option should be checked', async () => {
          expect(await page.$eval('#no-central-heating', node => node.checked)).toBe(false);
          expect(await page.$eval('#dont-know', node => node.checked)).toBe(true);
        });

        it('then the aria-live message should say nothing', async () => {
          await page.waitForTimeout(SCREEN_READER_TIMEOUT_DELAY);

          const alertText = await page.$eval('.ons-js-exclusive-alert', node => node.textContent);
          expect(alertText).toBe('');
        });
      });
    });
  });
});
