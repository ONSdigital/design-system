/** @jest-environment jsdom */
import * as cheerio from 'cheerio';
import axe from '../../tests/helpers/axe';
import { renderComponent } from '../../tests/helpers/rendering';
import { EXAMPLE_DETAILS_PANEL } from './_test-examples';

describe('FOR: Macro: Details Panel', () => {
    describe('GIVEN: Params: title', () => {
        describe('WHEN: title param is provided', () => {
            const $ = cheerio.load(renderComponent('details-panel', EXAMPLE_DETAILS_PANEL));
            test('THEN: banner has the correct title', () => {
                const contentTitle = $('.ons-details-panel__banner-title').text().replace(/\s+/g, ' ').trim();
                expect(contentTitle).toBe('Correction and Notice');
            });
        });
    });

    describe('GIVEN: Params: headingLevel', () => {
        describe('WHEN: headingLevel is provided', () => {
            const customParams = {
                ...EXAMPLE_DETAILS_PANEL,
                headingLevel: 3,
            };
            const $ = cheerio.load(renderComponent('details-panel', customParams));
            test('THEN: banner title uses the correct heading level', () => {
                const bannerTitle = $('.ons-details-panel__banner-title');
                expect(bannerTitle.prop('tagName')).toBe('H3');
            });
        });

        describe('WHEN: headingLevel is not provided', () => {
            const $ = cheerio.load(renderComponent('details-panel', EXAMPLE_DETAILS_PANEL));
            test('THEN: banner title uses default heading level (h2)', () => {
                const bannerTitle = $('.ons-details-panel__banner-title');
                expect(bannerTitle.prop('tagName')).toBe('H2');
            });
        });
    });

    describe('GIVEN: Params: detailsItems', () => {
        describe('WHEN: detailsItems is provided', () => {
            const $ = cheerio.load(renderComponent('details-panel', EXAMPLE_DETAILS_PANEL));
            test('THEN: jest-axe tests pass', async () => {
                const results = await axe($.html());
                expect(results).toHaveNoViolations();
            });
            test('THEN: items have correct titles', () => {
                const contentTitle0 = $('.ons-details-panel__content-heading').eq(0).text().trim();
                const contentTitle1 = $('.ons-details-panel__content-heading').eq(1).text().trim();
                expect(contentTitle0).toBe('Correction');
                expect(contentTitle1).toBe('Notice');
            });
            test('THEN: items have correct dates', () => {
                const dateText0 = $('.ons-details-panel__content-date').eq(0).text().trim();
                const dateText1 = $('.ons-details-panel__content-date').eq(1).text().trim();

                expect(dateText0).toBe('22nd January 2025, 4:30PM');
                expect(dateText1).toBe('22nd January 2025');
            });
            test('THEN: items have correct description text', () => {
                const contentdescriptionText0 = $('.ons-details-panel__content-text').eq(0).text().trim();
                const contentdescriptionText1 = $('.ons-details-panel__content-text').eq(1).text().trim();

                expect(contentdescriptionText0).toBe('description1');
                expect(contentdescriptionText1).toBe('description2');
            });
            test('THEN: correction item has a valid link and text', () => {
                const correctionLinkText = $('.ons-details-panel__content-url').eq(0).text().trim();
                const correctionLinkUrl = $('.ons-details-panel__content-url').eq(0).attr('href');

                expect(correctionLinkText).toBe('View superseded version');
                expect(correctionLinkUrl).toBe('#0');
            });
            test('THEN: item with urlAriaLabel has custom aria label', () => {
                const customParams = {
                    ...EXAMPLE_DETAILS_PANEL,
                    detailsItems: [
                        {
                            ...EXAMPLE_DETAILS_PANEL.detailsItems[0],
                            urlAriaLabel: 'View superseded version from January 2025',
                        },
                        ...EXAMPLE_DETAILS_PANEL.detailsItems.slice(1),
                    ],
                };
                const $ = cheerio.load(renderComponent('details-panel', customParams));
                const linkWithAriaLabel = $('.ons-details-panel__content-url').eq(0);

                expect(linkWithAriaLabel.attr('aria-label')).toBe('View superseded version from January 2025');
                expect(linkWithAriaLabel.text().trim()).toBe('View superseded version');
            });
        });
    });
});
