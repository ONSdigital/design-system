import { renderComponent, setTestPage } from '../../tests/helpers/rendering';

describe('script: button', () => {
  describe('mode: link', () => {
    it('navigates to url when button is clicked with the spacebar', async () => {
      await setTestPage(
        '/test',
        renderComponent('button', {
          id: 'test-button',
          url: '/test/path#abc',
        }),
      );

      await page.focus('#test-button');

      await Promise.all([page.waitForNavigation(), page.keyboard.press('Space')]);

      const url = await page.url();
      expect(url).toBe(`http://localhost:${process.env.TEST_PORT}/test/path#abc`);
    });
  });

  describe('mode: standard', () => {
    it('allow rapidly repeated submissions when in a form', async () => {
      await setTestPage(
        '/test',
        `
        <form>
          ${renderComponent('button', {
            id: 'test-button',
          })}
        </form>
      `,
      );

      await page.evaluate(() => {
        window.__COUNTER = 0;
        document.querySelector('form').addEventListener('submit', event => {
          window.__COUNTER++;
          event.preventDefault();
        });
      });

      await page.click('#test-button');
      await page.click('#test-button');

      const counter = await page.evaluate(() => window.__COUNTER);
      expect(counter).toBe(2);
    });
  });

  describe('mode: loader', () => {
    it('disables button when clicked', async () => {
      await setTestPage(
        '/test',
        renderComponent('button', {
          id: 'test-button',
          text: 'Submit',
          variants: 'loader',
        }),
      );

      await page.click('#test-button');

      const isButtonDisabled = await page.evaluate(() => document.querySelector('#test-button').getAttribute('disabled'));
      expect(isButtonDisabled).toBe('true');
    });

    it('initialised without loading style applied', async () => {
      await setTestPage(
        '/test',
        renderComponent('button', {
          id: 'test-button',
          text: 'Submit',
          variants: 'loader',
        }),
      );

      const hasIsLoadingClass = await page.evaluate(() => document.querySelector('#test-button').classList.contains('ons-is-loading'));
      expect(hasIsLoadingClass).toBe(false);
    });

    it('applies loading style when clicked', async () => {
      await setTestPage(
        '/test',
        renderComponent('button', {
          id: 'test-button',
          text: 'Submit',
          variants: 'loader',
        }),
      );

      await page.click('#test-button');

      const hasIsLoadingClass = await page.evaluate(() => document.querySelector('#test-button').classList.contains('ons-is-loading'));
      expect(hasIsLoadingClass).toBe(true);
    });

    it('disables button when clicked when in a form', async () => {
      await setTestPage(
        '/test',
        `
        <form onsubmit="return false;">
          ${renderComponent('button', {
            id: 'test-button',
            text: 'Submit',
            variants: 'loader',
          })}
        </form>
      `,
      );

      await page.click('#test-button');

      const isButtonDisabled = (await page.$('#test-button[disabled]')) !== null;
      expect(isButtonDisabled).toBe(true);
    });

    it('initialised without loading style applied when in a form', async () => {
      await setTestPage(
        '/test',
        `
        <form>
          ${renderComponent('button', {
            id: 'test-button',
            text: 'Submit',
            variants: 'loader',
          })}
        </form>
      `,
      );

      const hasIsLoadingClass = await page.evaluate(() => document.querySelector('#test-button').classList.contains('ons-is-loading'));
      expect(hasIsLoadingClass).toBe(false);
    });

    it('applies loading style when clicked when in a form', async () => {
      await setTestPage(
        '/test',
        `
        <form onsubmit="return false;">
          ${renderComponent('button', {
            id: 'test-button',
            text: 'Submit',
            variants: 'loader',
          })}
        </form>
      `,
      );

      await page.click('#test-button');

      const hasIsLoadingClass = await page.evaluate(() => document.querySelector('#test-button').classList.contains('ons-is-loading'));
      expect(hasIsLoadingClass).toBe(true);
    });
  });

  describe('mode: timer', () => {
    it('allow intentional repeated submissions', async () => {
      await setTestPage(
        '/test',
        renderComponent('button', {
          id: 'test-button',
          variants: 'timer',
          text: 'Submit',
        }),
      );

      await page.evaluate(() => {
        window.__COUNTER = 0;
        document.querySelector('#test-button').addEventListener('click', event => {
          window.__COUNTER++;
          event.preventDefault();
        });
      });

      await page.click('#test-button');
      await page.click('#test-button', { delay: 1000 });

      const counter = await page.evaluate(() => window.__COUNTER);
      expect(counter).toBe(2);
    });

    it('prevents unintentional repeated submissions', async () => {
      await setTestPage(
        '/test',
        renderComponent('button', {
          id: 'test-button',
          variants: 'timer',
          text: 'Submit',
        }),
      );

      await page.evaluate(() => {
        window.__COUNTER = 0;
        document.querySelector('#test-button').addEventListener('click', event => {
          window.__COUNTER++;
          event.preventDefault();
        });
      });

      await page.click('#test-button');
      await page.click('#test-button');

      const counter = await page.evaluate(() => window.__COUNTER);
      expect(counter).toBe(1);
    });

    it('allow intentional repeated submissions when in a form', async () => {
      await setTestPage(
        '/test',
        `
        <form>
          ${renderComponent('button', {
            id: 'test-button',
            variants: 'timer',
            text: 'Submit',
          })}
        </form>
      `,
      );

      await page.evaluate(() => {
        window.__COUNTER = 0;
        document.querySelector('form').addEventListener('submit', event => {
          window.__COUNTER++;
          event.preventDefault();
        });
      });

      await page.click('#test-button');
      await page.click('#test-button', { delay: 1000 });

      const counter = await page.evaluate(() => window.__COUNTER);
      expect(counter).toBe(2);
    });

    it('prevents unintentional repeated submissions when in a form', async () => {
      await setTestPage(
        '/test',
        `
        <form>
          ${renderComponent('button', {
            id: 'test-button',
            variants: 'timer',
            text: 'Submit',
          })}
        </form>
      `,
      );

      await page.evaluate(() => {
        window.__COUNTER = 0;
        document.querySelector('form').addEventListener('submit', event => {
          window.__COUNTER++;
          event.preventDefault();
        });
      });

      await page.click('#test-button');
      await page.click('#test-button');

      const counter = await page.evaluate(() => window.__COUNTER);
      expect(counter).toBe(1);
    });
  });

  describe('style: print', () => {
    it('displays the browsers print interface', async () => {
      await setTestPage(
        '/test',
        renderComponent('button', {
          id: 'test-button',
          type: 'button',
          text: 'Print this page',
          variants: 'print',
        }),
      );

      await page.evaluate(() => {
        window.print = () => (window.wasPrinted = 'yes');
      });

      await page.click('#test-button');

      const wasPrinted = await page.evaluate(() => window.wasPrinted);
      expect(wasPrinted).toBe('yes');
    });
  });
});
