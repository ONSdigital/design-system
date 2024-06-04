/** @jest-environment jsdom */

import * as cheerio from 'cheerio';

import axe from '../../tests/helpers/axe';
import { renderComponent } from '../../tests/helpers/rendering';

describe('macro: skip-to-content', () => {
    it('passes jest-axe checks', async () => {
        const $ = cheerio.load(
            renderComponent('skip-to-content', {
                url: '#example-anchor',
                text: 'Skip to the content',
            }),
        );

        const results = await axe($.html());
        expect(results).toHaveNoViolations();
    });

    it('has a hyperlink element', async () => {
        const $ = cheerio.load(
            renderComponent('skip-to-content', {
                url: '#example-anchor',
                text: 'Skip to the content',
            }),
        );

        expect($('.ons-skip-to-content')[0].tagName).toBe('a');
    });

    it('has skip link with the provided `url`', async () => {
        const $ = cheerio.load(
            renderComponent('skip-to-content', {
                url: '#example-anchor',
                text: 'Skip to the content',
            }),
        );

        expect($('.ons-skip-to-content').attr('href')).toBe('#example-anchor');
    });

    it('has skip link with the provided `text`', async () => {
        const $ = cheerio.load(
            renderComponent('skip-to-content', {
                url: '#example-anchor',
                text: 'Skip to the content',
            }),
        );

        expect($('.ons-skip-to-content').text().trim()).toBe('Skip to the content');
    });

    it('has skip link with the default text if no text provided`', async () => {
        const $ = cheerio.load(
            renderComponent('skip-to-content', {
                url: '#example-anchor',
            }),
        );

        expect($('.ons-skip-to-content').text().trim()).toBe('Skip to content');
    });
});
