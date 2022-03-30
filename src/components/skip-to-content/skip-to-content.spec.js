import { setTestPage } from '../../tests/helpers/rendering';

const EXAMPLE_SKIP_TO_LINK_TEMPLATE = `
  {% from "components/skip-to-content/_macro.njk" import onsSkipToContent %}
  {{
      onsSkipToContent({
          "url": "#target-element",
          "text": "Skip to content"
      })
  }}
  <input id="target-element" type="text" style="outline: solid 1px black;" />
`;

describe('script: skip-to-content', () => {
  it('sets `tabIndex` of target element to -1', async () => {
    await setTestPage('/test', EXAMPLE_SKIP_TO_LINK_TEMPLATE);

    await page.focus('.ons-skip-link');
    await page.keyboard.press('Enter');

    const targetTabIndex = await page.$eval('#target-element', el => el.tabIndex);
    expect(targetTabIndex).toBe(-1);
  });

  it('removes outline from target element on navigate', async () => {
    await setTestPage('/test', EXAMPLE_SKIP_TO_LINK_TEMPLATE);

    await page.focus('.ons-skip-link');
    await page.keyboard.press('Enter');

    const targetOutline = await page.$eval('#target-element', el => el.style.outline);
    expect(targetOutline).toBe('none');
  });

  it('focuses target element on navigate', async () => {
    await setTestPage('/test', EXAMPLE_SKIP_TO_LINK_TEMPLATE);

    await page.focus('.ons-skip-link');
    await page.keyboard.press('Enter');

    const focusedElementId = await page.evaluate(() => document.activeElement.id);
    expect(focusedElementId).toBe('target-element');
  });
});
