

const EXAMPLE_INPUT_TEMPLATE = `
  {% from "components/input/_macro.njk" import onsInput %}
  {{ onsInput({
      "label": "Label",
      "name": "input-name",
      "id": "input-id",
      "placeholder": "Placeholder",
      "required": true,
      "value": "Input value",
      "abbr": "abbr"
  }) }}
`;

describe('script: input', () => {
  it('focuses input when abbreviation is clicked', async () => {
    await setTestPage('/test', EXAMPLE_INPUT_TEMPLATE);

    const abbreviation = await page.$('.ons-js-input-abbr');
    const input = await page.$('.ons-input');

    await abbreviation.click();

    const focusedElementId = await page.evaluate(() => document.activeElement.id);
    expect(focusedElementId).toBe('input-id');
  });
});
