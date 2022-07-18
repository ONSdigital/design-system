/** @jest-environment jsdom */

import * as cheerio from 'cheerio';

import axe from '../../tests/helpers/axe';
import { renderComponent } from '../../tests/helpers/rendering';

const EXAMPLE_BROWSER_BANNER_MINIMAL = {};

describe('macro: browser-banner', () => {
  it('passes jest-axe checks with', async () => {
    const $ = cheerio.load(renderComponent('browser-banner', EXAMPLE_BROWSER_BANNER_MINIMAL));

    const results = await axe($.html());
    expect(results).toHaveNoViolations();
  });

  it('has expected default content', () => {
    const $ = cheerio.load(renderComponent('browser-banner', EXAMPLE_BROWSER_BANNER_MINIMAL));

    const htmlContent = $('.ons-browser-banner__content')
      .html()
      .trim();
    expect(htmlContent).toBe(
      '<span class="ons-browser-banner__lead">This website no longer supports your browser.</span> You can <a class="ons-browser-banner__link" href="https://www.ons.gov.uk/help/browsers">upgrade your browser to the latest version</a>.',
    );
  });

  it('has expected english content', () => {
    const $ = cheerio.load(
      renderComponent('browser-banner', {
        ...EXAMPLE_BROWSER_BANNER_MINIMAL,
        language: {
          languages: [
            {
              ISOCode: 'en',
              text: 'English',
              current: true,
            },
          ],
        },
      }),
    );

    const htmlContent = $('.ons-browser-banner__content')
      .html()
      .trim();
    expect(htmlContent).toBe(
      '<span class="ons-browser-banner__lead">This website no longer supports your browser.</span> You can <a class="ons-browser-banner__link" href="https://www.ons.gov.uk/help/browsers">upgrade your browser to the latest version</a>.',
    );
  });

  it('has expected welsh content', () => {
    const $ = cheerio.load(
      renderComponent('browser-banner', {
        ...EXAMPLE_BROWSER_BANNER_MINIMAL,
        language: {
          languages: [
            {
              ISOCode: 'cy',
              text: 'Cymraeg',
              current: true,
            },
          ],
        },
      }),
    );

    const htmlContent = $('.ons-browser-banner__content')
      .html()
      .trim();
    expect(htmlContent).toBe(
      '<span class="ons-browser-banner__lead">Nid yw’r wefan hon yn cefnogi eich porwr mwyach.</span> Gallwch <a class="ons-browser-banner__link" href="https://cy.ons.gov.uk/help/browsers">ddiweddaru eich porwr i’r fersiwn ddiweddaraf</a>.',
    );
  });

  it('has `container--wide` class when `wide` is true', () => {
    const $ = cheerio.load(
      renderComponent('browser-banner', {
        ...EXAMPLE_BROWSER_BANNER_MINIMAL,
        wide: true,
      }),
    );

    expect($('.ons-container').hasClass('ons-container--wide')).toBe(true);
  });
});
