import { renderComponent, setTestPage } from '../../tests/helpers/rendering';

const EXAMPLE_ACCORDION_WITH_THREE_ITEMS = {
  id: 'example-accordion',
  itemsList: [
    {
      title: 'Title for item 1',
      content: 'Content for item 1',
    },
    {
      title: 'Title for item 2',
      content: 'Content for item 2',
    },
    {
      title: 'Title for item 3',
      content: 'Content for item 3',
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
  it('begins with all items open when specified', async () => {
    await setTestPage(
      '/test',
      renderComponent('accordion', {
        ...EXAMPLE_ACCORDION_WITH_THREE_ITEMS,
        open: true,
      }),
    );

    const openElements = await page.$$eval('.ons-js-details', nodes => nodes.filter(node => node.open));
    expect(openElements[0]).not.toBe(undefined);
    expect(openElements[1]).not.toBe(undefined);
    expect(openElements[2]).not.toBe(undefined);
  });

  it('sets toggle all button label to "Hide all" when open is specified', async () => {
    await setTestPage(
      '/test',
      renderComponent('accordion', {
        ...EXAMPLE_ACCORDION_WITH_ALL_BUTTON,
        open: true,
      }),
    );

    const buttonText = await page.$eval('button[data-test-trigger]', element => element.innerText);
    expect(buttonText.trim()).toBe('Close all');
  });

  it('sets toggle all button aria-expanded set to true when open is specified', async () => {
    await setTestPage(
      '/test',
      renderComponent('accordion', {
        ...EXAMPLE_ACCORDION_WITH_ALL_BUTTON,
        open: true,
      }),
    );

    const ariaExpanded = await page.$eval('button[data-test-trigger]', element => element.getAttribute('aria-expanded'));
    expect(ariaExpanded).toBe('true');
  });

  it('opens all items when accordion `allbutton` is clicked', async () => {
    await setTestPage('/test', renderComponent('accordion', EXAMPLE_ACCORDION_WITH_ALL_BUTTON));

    await page.click('button[data-test-trigger]');

    const openElements = await page.$$eval('.ons-js-details', nodes => nodes.filter(node => node.open));
    expect(openElements[0]).not.toBe(undefined);
    expect(openElements[1]).not.toBe(undefined);
    expect(openElements[2]).not.toBe(undefined);
  });

  it('closes all items when accordion `allbutton` is clicked twice', async () => {
    await setTestPage('/test', renderComponent('accordion', EXAMPLE_ACCORDION_WITH_ALL_BUTTON));

    await page.click('button[data-test-trigger]');
    await page.click('button[data-test-trigger]');

    const openElements = await page.$$eval('.ons-js-details', nodes => nodes.filter(node => node.open));
    expect(openElements[0]).toBe(undefined);
    expect(openElements[1]).toBe(undefined);
    expect(openElements[2]).toBe(undefined);
  });

  it('starts with the toggle all button labelled as "Open all"', async () => {
    await setTestPage('/test', renderComponent('accordion', EXAMPLE_ACCORDION_WITH_ALL_BUTTON));

    const buttonText = await page.$eval('button[data-test-trigger]', element => element.innerText);
    expect(buttonText.trim()).toBe('Open all');
  });

  it('starts with the toggle all button aria-expanded set to false', async () => {
    await setTestPage('/test', renderComponent('accordion', EXAMPLE_ACCORDION_WITH_ALL_BUTTON));

    const ariaExpanded = await page.$eval('button[data-test-trigger]', element => element.getAttribute('aria-expanded'));
    expect(ariaExpanded).toBe('false');
  });

  it('sets toggle all button label to "Hide all" when clicked', async () => {
    await setTestPage('/test', renderComponent('accordion', EXAMPLE_ACCORDION_WITH_ALL_BUTTON));

    await page.click('button[data-test-trigger]');

    const buttonText = await page.$eval('button[data-test-trigger]', element => element.innerText);
    expect(buttonText.trim()).toBe('Close all');
  });

  it('sets toggle all button aria-expanded set to true when clicked', async () => {
    await setTestPage('/test', renderComponent('accordion', EXAMPLE_ACCORDION_WITH_ALL_BUTTON));

    await page.click('button[data-test-trigger]');

    const ariaExpanded = await page.$eval('button[data-test-trigger]', element => element.getAttribute('aria-expanded'));
    expect(ariaExpanded).toBe('true');
  });

  it('sets toggle all button label to "Hide all" when all items are shown', async () => {
    await setTestPage('/test', renderComponent('accordion', EXAMPLE_ACCORDION_WITH_ALL_BUTTON));

    await page.click('#example-accordion-1 .ons-details__heading');
    await page.click('#example-accordion-2 .ons-details__heading');
    await page.click('#example-accordion-3 .ons-details__heading');

    const buttonText = await page.$eval('button[data-test-trigger]', element => element.innerText);
    expect(buttonText.trim()).toBe('Close all');
  });
});
