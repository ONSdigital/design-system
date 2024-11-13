/** @jest-environment jsdom */

import * as cheerio from 'cheerio';

import axe from '../../tests/helpers/axe';
import { renderComponent } from '../../tests/helpers/rendering';

describe('FOR: Macro: Browser-banner', () => {
    describe('GIVEN: Params: default', () => {
        describe('WHEN: params are at default state', () => {
            const $ = cheerio.load(renderComponent('browser-banner', {}));

            test('THEN: passes jest-axe checks', async () => {
                const results = await axe($.html());
                expect(results).toHaveNoViolations();
            });

            test('THEN: has the english default bannerLeadingText', () => {
                const bannerLeadingText = $('.ons-browser-banner__lead').text().trim();
                expect(bannerLeadingText).toBe('This website no longer supports your browser.');
            });

            test('THEN: has the english default bannerCTA', () => {
                const bannerCtaHtml = $('.ons-browser-banner__cta').text().trim();
                expect(bannerCtaHtml).toBe('You can upgrade your browser to the latest version.');
            });

            test('THEN: has the english default bannerLinkUrl', () => {
                expect($('.ons-browser-banner__link').attr('href')).toBe('https://www.ons.gov.uk/help/browsers');
            });
        });

        describe('WHEN: params are at default and language is set to welsh', () => {
            const $ = cheerio.load(renderComponent('browser-banner', { lang: 'cy' }));

            test('THEN: has the welsh default bannerLeadingText', () => {
                const bannerLeadingText = $('.ons-browser-banner__lead').text().trim();
                expect(bannerLeadingText).toBe('Nid yw’r wefan hon yn cefnogi eich porwr mwyach.');
            });

            test('THEN: has the welsh default bannerCTA', () => {
                const bannerCtaHtml = $('.ons-browser-banner__cta').text().trim();
                expect(bannerCtaHtml).toBe('Gallwch ddiweddaru eich porwr i’r fersiwn ddiweddaraf.');
            });

            test('THEN: has the welsh default bannerLinkUrl', () => {
                expect($('.ons-browser-banner__link').attr('href')).toBe('https://cy.ons.gov.uk/help/browsers');
            });
        });
    });

    describe('GIVEN: Params: wide', () => {
        describe('WHEN: wide is set to true', () => {
            test('THEN: has container--wide class', () => {
                const $ = cheerio.load(
                    renderComponent('browser-banner', {
                        ...{},
                        wide: true,
                    }),
                );

                expect($('.ons-container').hasClass('ons-container--wide')).toBe(true);
            });
        });

        describe('WHEN: wide is not set', () => {
            test('THEN: does not have container--wide class', () => {
                const $ = cheerio.load(
                    renderComponent('browser-banner', {
                        ...{},
                    }),
                );

                expect($('.ons-container').hasClass('ons-container--wide')).toBe(false);
            });
        });
    });

    describe('GIVEN: Params: fullWidth', () => {
        describe('WHEN: fullWidth is set to true', () => {
            test('THEN: has container--full-width class', () => {
                const $ = cheerio.load(
                    renderComponent('browser-banner', {
                        ...{},
                        fullWidth: true,
                    }),
                );

                expect($('.ons-container').hasClass('ons-container--full-width')).toBe(true);
            });
        });

        describe('WHEN: fullWidth is not set', () => {
            test('THEN: does not have container--full-width class', () => {
                const $ = cheerio.load(
                    renderComponent('browser-banner', {
                        ...{},
                    }),
                );

                expect($('.ons-container').hasClass('ons-container--full-width')).toBe(false);
            });
        });
    });
});
