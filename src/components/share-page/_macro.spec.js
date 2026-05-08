/** @jest-environment jsdom */

import * as cheerio from 'cheerio';

import axe from '../../tests/helpers/axe';
import { renderComponent, templateFaker } from '../../tests/helpers/rendering';

const EXAMPLE_SHARE_PAGE = {
    title: 'Share page',
    pageTitle: 'An example page',
    pageUrl: 'https://example.com/an-example-page',
    facebook: true,
    x: true,
};

describe('macro: share-page', () => {
    it('passes jest-axe checks with', async () => {
        const $ = cheerio.load(renderComponent('share-page', EXAMPLE_SHARE_PAGE));

        const results = await axe($.html());
        expect(results).toHaveNoViolations();
    });

    it('wraps title in <h2> element by default', () => {
        const $ = cheerio.load(renderComponent('share-page', EXAMPLE_SHARE_PAGE));

        expect($('h2').text().trim()).toBe('Share page');
    });

    it('wraps title in custom element when `titleTag` is provided', () => {
        const $ = cheerio.load(
            renderComponent('share-page', {
                ...EXAMPLE_SHARE_PAGE,
                headingLevel: 4,
            }),
        );

        expect($('h4').text().trim()).toBe('Share page');
    });

    it('uses the provided icon size', () => {
        const faker = templateFaker();
        const listsSpy = faker.spy('list');

        faker.renderComponent('share-page', {
            ...EXAMPLE_SHARE_PAGE,
            iconSize: 'xl',
        });

        expect(listsSpy.occurrences[0].iconSize).toBe('xl');
    });

    describe('Share on X', () => {
        it('has a link with the expected url', () => {
            const faker = templateFaker();
            const listsSpy = faker.spy('list');

            faker.renderComponent('share-page', EXAMPLE_SHARE_PAGE);

            const xItem = listsSpy.occurrences[0].itemsList.find((item) => item.text === 'X');
            expect(xItem.url).toBe(
                'https://x.com/intent/tweet?original_referer&text=An%20example%20page&url=https%3A%2F%2Fexample.com%2Fan-example-page',
            );
        });

        it('has a link which opens in a new tab', () => {
            const faker = templateFaker();
            const listsSpy = faker.spy('list');

            faker.renderComponent('share-page', EXAMPLE_SHARE_PAGE);

            const xItem = listsSpy.occurrences[0].itemsList.find((item) => item.text === 'X');
            expect(xItem.rel).toContain('noreferrer');
            expect(xItem.rel).toContain('external');
            expect(xItem.target).toBe('_blank');
        });
    });

    describe('Share on Facebook', () => {
        it('has a link with the expected url', () => {
            const faker = templateFaker();
            const listsSpy = faker.spy('list');

            faker.renderComponent('share-page', EXAMPLE_SHARE_PAGE);

            const facebookItem = listsSpy.occurrences[0].itemsList.find((item) => item.text === 'Facebook');
            expect(facebookItem.url).toBe('https://www.facebook.com/sharer/sharer.php?u=https%3A%2F%2Fexample.com%2Fan-example-page');
        });

        it('has a link which opens in a new tab', () => {
            const faker = templateFaker();
            const listsSpy = faker.spy('list');

            faker.renderComponent('share-page', EXAMPLE_SHARE_PAGE);

            const facebookItem = listsSpy.occurrences[0].itemsList.find((item) => item.text === 'Facebook');
            expect(facebookItem.rel).toContain('noreferrer');
            expect(facebookItem.rel).toContain('external');
            expect(facebookItem.target).toBe('_blank');
        });
    });
});
