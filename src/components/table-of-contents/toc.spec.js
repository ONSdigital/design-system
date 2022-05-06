import { renderComponent, setTestPage } from '../../tests/helpers/rendering';

describe('script: table-of-contents', () => {
  beforeEach(async () => {
    await setTestPage(
      '/test',
      `
      <div class="ons-page__container ons-container">
        <div class="ons-grid ons-js-toc-container">
          <div class="ons-grid__col ons-grid__col--sticky@m ons-col-4@m">
            ${renderComponent('table-of-contents', {
              title: 'Contents',
              ariaLabel: 'Sections in this page',
              itemsList: [
                {
                  url: '#section1',
                  text: 'First section',
                },
                {
                  url: '#section2',
                  text: 'Second section',
                },
                {
                  url: '#section3',
                  text: 'Third section',
                },
              ],
            })}
          </div>
          <div class="ons-grid__col ons-col-7@m ons-push-1@m">
            <section id="section1">
              <h2>First section</h2>
              <p>${'<br/>'.repeat(20)}</p>
            </section>
            <section id="section2">
              <h2>Second section</h2>
              <p>${'<br/>'.repeat(10)}</p>
            </section>
            <section id="section3">
              <h2>Third section</h2>
              <p>${'<br/>'.repeat(50)}</p>
            </section>
          </div>
        </div>
      </div>
      `,
    );
  });

  it.each([
    ['section1', 'First section'],
    ['section2', 'Second section'],
    ['section3', 'Third section'],
  ])('marks "%s" as the current section', async (sectionId, sectionTitle) => {
    await page.$eval(`#${sectionId}`, node => node.scrollIntoView());
    await page.waitForTimeout(250);

    const activeSection = await page.$eval('.ons-toc__link-active', node => node.innerText.trim());
    expect(activeSection).toBe(sectionTitle);
  });
});
