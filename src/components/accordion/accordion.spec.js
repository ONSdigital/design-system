import { renderComponent, setTestPage } from '../../tests/helpers/rendering';

const EXAMPLE_ACCORDION_WITH_THREE_ITEMS = {
  id: 'example-accordion',
  itemsList: [
    {
      title: 'Title for item 1',
      content: 'Content for item 1',
      button: {
        open: 'Open item',
        close: 'Close item',
      },
    },
    {
      title: 'Title for item 2',
      content: 'Content for item 2',
      button: {
        open: 'Open item',
        close: 'Close item',
      },
    },
    {
      title: 'Title for item 3',
      content: 'Content for item 3',
      button: {
        open: 'Open item',
        close: 'Close item',
      },
    },
  ],
};

const EXAMPLE_ACCORDION_WITH_ALL_BUTTON = {
  ...EXAMPLE_ACCORDION_WITH_THREE_ITEMS,
  allButton: {
    open: 'Open all',
    close: 'Close all',
    attributes: {
      'data-test-trigger': true,
    },
  },
};

describe('script: accordion', () => {
  it('begins with all items closed', async () => {
    await setTestPage('/test', renderComponent('accordion', EXAMPLE_ACCORDION_WITH_THREE_ITEMS));

    const openItemCount = await page.$$eval('.ons-collapsible--open', elements => elements.length);
    expect(openItemCount).toBe(0);
  });

  it('begins with all items open when specified', async () => {
    await setTestPage(
      '/test',
      renderComponent('accordion', {
        ...EXAMPLE_ACCORDION_WITH_THREE_ITEMS,
        open: true,
      }),
    );

    const openItemCount = await page.$$eval('.ons-collapsible--open', elements => elements.length);
    expect(openItemCount).toBe(3);
  });

  it('opens all items when accordion "Open all" button is clicked', async () => {
    await setTestPage('/test', renderComponent('accordion', EXAMPLE_ACCORDION_WITH_ALL_BUTTON));

    await page.click('button[data-test-trigger]');

    const openItemCount = await page.$$eval('.ons-collapsible--open', elements => elements.length);
    expect(openItemCount).toBe(3);
  });

  it('closes all items when accordion "Open all" button is clicked twice', async () => {
    await setTestPage('/test', renderComponent('accordion', EXAMPLE_ACCORDION_WITH_ALL_BUTTON));

    await page.click('button[data-test-trigger]');
    await page.click('button[data-test-trigger]');

    const openItemCount = await page.$$eval('.ons-collapsible--open', elements => elements.length);
    expect(openItemCount).toBe(0);
  });

  it('starts with the toggle all button labelled as "Open all"', async () => {
    await setTestPage('/test', renderComponent('accordion', EXAMPLE_ACCORDION_WITH_ALL_BUTTON));

    const buttonText = await page.$eval('button[data-test-trigger]', element => element.innerText);
    expect(buttonText.trim()).toBe('Open all');
  });

  it('sets toggle all button label to "Hide all" when clicked', async () => {
    await setTestPage('/test', renderComponent('accordion', EXAMPLE_ACCORDION_WITH_ALL_BUTTON));

    await page.click('button[data-test-trigger]');

    const buttonText = await page.$eval('button[data-test-trigger]', element => element.innerText);
    expect(buttonText.trim()).toBe('Close all');
  });

  it('sets toggle all button label to "Hide all" when all items are shown', async () => {
    await setTestPage('/test', renderComponent('accordion', EXAMPLE_ACCORDION_WITH_ALL_BUTTON));

    await page.click('#example-accordion-1 .ons-collapsible__btn');
    await page.click('#example-accordion-2 .ons-collapsible__btn');
    await page.click('#example-accordion-3 .ons-collapsible__btn');

    const buttonText = await page.$eval('button[data-test-trigger]', element => element.innerText);
    expect(buttonText.trim()).toBe('Close all');
  });

  it('opens an item when its open button is clicked', async () => {
    await setTestPage('/test', renderComponent('accordion', EXAMPLE_ACCORDION_WITH_THREE_ITEMS));

    await page.click('#example-accordion-2 .ons-collapsible__btn');
    await page.click('#example-accordion-3 .ons-collapsible__btn');

    const openItemCount = await page.$$eval('.ons-collapsible--open', elements => elements.length);
    expect(openItemCount).toBe(2);
  });

  it('closes an item when its open button is clicked twice', async () => {
    await setTestPage('/test', renderComponent('accordion', EXAMPLE_ACCORDION_WITH_THREE_ITEMS));

    await page.click('#example-accordion-2 .ons-collapsible__btn');
    await page.click('#example-accordion-3 .ons-collapsible__btn');
    await page.click('#example-accordion-3 .ons-collapsible__btn');

    const isItem2Open = await page.$eval('#example-accordion-2', element => element.classList.contains('ons-collapsible--open'));
    expect(isItem2Open).toBe(true);

    const isItem3Open = await page.$eval('#example-accordion-3', element => element.classList.contains('ons-collapsible--open'));
    expect(isItem3Open).toBe(false);
  });
});
