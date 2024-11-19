import { renderComponent, setTestPage } from '../../tests/helpers/rendering';

const { setTimeout } = require('node:timers/promises');

describe('script: table-of-contents', () => {
    beforeEach(async () => {
        await setTestPage(
            '/test',
            /* eslint-disable indent */
            `
      <div class="ons-page__container ons-container">
        <div class="ons-grid ons-js-table-of-contents-container">
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
            /* eslint-enable indent */
        );
    });

    it.each([
        ['section1', 'First section'],
        ['section2', 'Second section'],
        ['section3', 'Third section'],
    ])('marks "%s" as the current section', async (sectionId, sectionTitle) => {
        await page.$eval(`#${sectionId}`, (node) => node.scrollIntoView());
        await setTimeout(250);

        const activeSection = await page.$eval('.ons-table-of-contents__link-active', (node) => node.innerText.trim());
        expect(activeSection).toBe(sectionTitle);
    });
});

describe('script: table-of-contents-fixed-position', () => {
    beforeEach(async () => {
        await setTestPage(
            '/test',
            /* eslint-disable indent */
            `
        <div class="ons-page__container ons-container">
          <div class="ons-grid ons-js-table-of-contents-container">
            <div id="sticky-container" class="ons-grid__col ons-grid__col--sticky@m ons-col-4@m">
              ${renderComponent('table-of-contents', {
                  title: 'Contents',
                  ariaLabel: 'Sections in this page',
                  itemsList: [
                      {
                          url: '#section1',
                          text: 'What is the census?',
                      },
                      {
                          url: '#section2',
                          text: 'The online census has now closed',
                      },
                      {
                          url: '#section3',
                          text: 'What happens after Census Day',
                      },
                      {
                          url: '#section4',
                          text: 'The census in Northern Ireland and Scotland',
                      },
                      {
                          url: '#section5',
                          text: 'The last census',
                      },
                  ],
              })}
            </div>
            <div class="ons-grid__col ons-col-7@m ons-push-1@m">
                <section id="section1">
                    <h2>What is the census?</h2>
                    <p>The census is a survey that happens every 10 years and gives us a picture of all the people and households in England and Wales.</p>

                    <p>Your answers to the census questions will help organisations make decisions on planning and funding public services in your area, including transport, education and healthcare.</p>
                </section>
                <section id="section2">
                    <h2>The online census has now closed</h2>
                    <p>Census Day was on Sunday 21 March 2021.</p>

                    <p>If you still have a paper census questionnaire, fill it in as soon as you can and return it to FREEPOST, Census 2021.</p>
                </section>
                <section id="section3">
                    <h2>What happens after Census Day</h2>
                    <p>Two follow-up surveys, the <a href="#0">Census Coverage Survey</a> and the <a href="#0">Census Quality Survey</a>, help to improve the quality and accuracy of the census results.</p>

                    <p>Over the next year, we work hard to process the answers from all the census questionnaires. This is so that we can publish the initial Census 2021 findings one year after the census and the main releases two years after the census.</p>

                    <p>To make sure the Census 2021 statistics we publish meet the needs of those who use them, we also run an outputs consultation.</p>
                </section>
                <section id="section4">
                    <h2>The census in Northern Ireland and Scotland</h2>
                    <p>The Office for National Statistics (ONS) runs the census in England and Wales.</p>

                    <p>If you live in Northern Ireland, visit the Northern Ireland Statistics Agency (NISRA) census website to find out about the census for Northern Ireland.</p>

                    <p>If you live in Scotland, visit the National Records of Scotland census website to find out how to take part in the census for Scotland.</p>
                </section>
                <section id="section5">
                    <h2>The last census</h2>
                    <p>The last census took place in 2011. Many people and organisations used information from the 2011 Census in a variety of ways.</p>

                    <p>For example, Bristol City Council used it to inform decisions on how to fund local housing improvements. It was also essential for the charity Redbridge Council for Voluntary Services to help people from ethnic minority groups learn more about dementia.</p>

                    <p>To read more about the benefits that information from the 2011 Census helped to create, visit the Office for National Statistics (ONS) website.</p>
                    <p>The Census Coverage Survey (CCS) was a short, separate survey that we at the Office for National Statistics (ONS) started six to eight weeks after Census Day.</p>

                    <p>The CCS helps make sure everyone is counted and our census results are as accurate as possible. It asked similar questions to the main census, just fewer of them, at addresses in a selection of postcodes across England and Wales.</p>

                    <p>The CCS has now closed.</p>
                </section>
            </div>
          </div>
        </div>
      `,
            /* eslint-enable indent */
            'main',
        );
    });

    it('when the "ons-grid__col--sticky" class is used, then the table of contents stays in a fixed position while scrolling', async () => {
        await page.evaluate(() => {
            window.scrollTo(0, 1000);
        });

        await setTimeout(250);
        const leftColumn = await page.$('#sticky-container');
        const boundingBox = await leftColumn.boundingBox();

        const viewport = await page.evaluate(() => ({
            width: window.innerWidth,
            height: window.innerHeight,
        }));

        const isInViewport =
            boundingBox &&
            boundingBox.x < viewport.width &&
            boundingBox.y < viewport.height &&
            boundingBox.x + boundingBox.width > 0 &&
            boundingBox.y + boundingBox.height > 0;

        expect(isInViewport).toBeTruthy();
    });
});
