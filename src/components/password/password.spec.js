import { renderComponent, setTestPage } from '../../tests/helpers/rendering';

const EXAMPLE_PASSWORD_MINIMAL = {
  id: 'example-password',
  name: 'example-password-name',
  label: {
    text: 'Label text',
    description: 'Description text',
    classes: 'extra-label-class',
  },
  showPasswordText: 'Show password',
};

describe('script: password', () => {
  it('has input of type `password` initially', async () => {
    await setTestPage('/test', renderComponent('password', EXAMPLE_PASSWORD_MINIMAL));

    const inputType = await page.evaluate(() => document.querySelector('#example-password').type);
    expect(inputType).toBe('password');
  });

  it('has input of type `text` when "Show password" toggle is clicked', async () => {
    await setTestPage('/test', renderComponent('password', EXAMPLE_PASSWORD_MINIMAL));

    await page.click('#example-password-toggle');

    const inputType = await page.evaluate(() => document.querySelector('#example-password').type);
    expect(inputType).toBe('text');
  });

  it('has input of type `password` when "Show password" toggle is clicked twice', async () => {
    await setTestPage('/test', renderComponent('password', EXAMPLE_PASSWORD_MINIMAL));

    await page.click('#example-password-toggle');
    await page.click('#example-password-toggle');

    const inputType = await page.evaluate(() => document.querySelector('#example-password').type);
    expect(inputType).toBe('password');
  });
});
