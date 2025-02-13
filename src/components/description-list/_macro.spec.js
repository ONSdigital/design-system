/** @jest-environment jsdom */

import * as cheerio from 'cheerio';
import axe from '../../tests/helpers/axe';
import { renderComponent } from '../../tests/helpers/rendering';

const EXAMPLE_DESCRIPTION_LIST_FULL = {
    id: 'example-id',
    classes: 'ons-u-mb-no',
    descriptionListLabel: 'This is an example of the description list component',
    termCol: 2,
    descriptionCol: 10,
    itemsList: [
        {
            term: 'Survey:',
            descriptions: [
                {
                    id: 'description-1',
                    description: 'Bricks & Blocks',
                },
            ],
        },
        {
            term: 'RU Refs:',
            descriptions: [
                {
                    id: 'description-2',
                    description: '49900000118',
                },
                {
                    id: 'description-3',
                    description: '49300005832',
                    url: '#',
                },
            ],
        },
    ],
};

const EXAMPLE_DESCRIPTION_LIST_MINIMAL = {
    itemsList: [
        {
            term: 'Survey:',
            descriptions: [
                {
                    description: 'Bricks & Blocks',
                },
            ],
        },
        {
            term: 'RU Refs:',
            descriptions: [
                {
                    description: '49900000118',
                },
                {
                    description: '49300005832',
                },
            ],
        },
    ],
};

describe('macro: description-list', () => {
    it('passes jest-axe checks when all parameters are provided', async () => {
        const $ = cheerio.load(renderComponent('description-list', EXAMPLE_DESCRIPTION_LIST_FULL));

        const results = await axe($.html());
        expect(results).toHaveNoViolations();
    });

    it('passes jest-axe checks when minimal parameters are provided', async () => {
        const $ = cheerio.load(renderComponent('description-list', EXAMPLE_DESCRIPTION_LIST_MINIMAL));

        const results = await axe($.html());
        expect(results).toHaveNoViolations();
    });

    it('has the provided `id` attribute', () => {
        const $ = cheerio.load(
            renderComponent('description-list', {
                ...EXAMPLE_DESCRIPTION_LIST_MINIMAL,
                id: 'example-id',
            }),
        );

        expect($('#example-id').length).toBe(1);
    });

    it('has the provided variant style class when variant is provided', () => {
        const $ = cheerio.load(
            renderComponent('description-list', {
                ...EXAMPLE_DESCRIPTION_LIST_MINIMAL,
                variant: 'inline',
            }),
        );

        expect($('.ons-description-list').hasClass('ons-description-list--inline')).toBe(true);
    });

    it('has additionally provided style classes', () => {
        const $ = cheerio.load(
            renderComponent('description-list', {
                ...EXAMPLE_DESCRIPTION_LIST_MINIMAL,
                classes: 'extra-class another-extra-class',
            }),
        );

        expect($('.ons-description-list').hasClass('extra-class')).toBe(true);
        expect($('.ons-description-list').hasClass('another-extra-class')).toBe(true);
    });

    it('outputs `title` and `aria-label` attributes when `descriptionListLabel` is provided', () => {
        const $ = cheerio.load(
            renderComponent('description-list', {
                ...EXAMPLE_DESCRIPTION_LIST_MINIMAL,
                descriptionListLabel: 'This is an example of the description list component',
            }),
        );

        expect($('.ons-description-list').attr('title')).toBe('This is an example of the description list component');
        expect($('.ons-description-list').attr('aria-label')).toBe('This is an example of the description list component');
    });

    it('outputs list items as expected', () => {
        const $ = cheerio.load(renderComponent('description-list', EXAMPLE_DESCRIPTION_LIST_FULL));

        const $listElements = $('.ons-description-list__term, .ons-description-list__value');

        expect($listElements[0].tagName).toBe('dt');
        expect($($listElements[0]).text()).toBe('Survey:');

        expect($listElements[1].tagName).toBe('dd');
        expect($($listElements[1]).attr('id')).toBe('description-1');
        expect($($listElements[1]).text()).toBe('Bricks & Blocks');

        expect($listElements[2].tagName).toBe('dt');
        expect($($listElements[2]).text()).toBe('RU Refs:');

        expect($listElements[3].tagName).toBe('dd');
        expect($($listElements[3]).attr('id')).toBe('description-2');
        expect($($listElements[3]).text()).toBe('49900000118');

        expect($listElements[4].tagName).toBe('dd');
        expect($($listElements[4]).attr('id')).toBe('description-3');
        const $link = $($listElements[4]).find('a');
        expect($link.attr('href')).toBe('#');
        expect($link.text()).toBe('49300005832');
    });

    it.each([
        [1, 'ons-col-1\\@m'],
        [4, 'ons-col-4\\@m'],
    ])('applies class for the provided `termCol` (%i -> %s)', (termCol, expectedClass) => {
        const $ = cheerio.load(
            renderComponent('description-list', {
                ...EXAMPLE_DESCRIPTION_LIST_MINIMAL,
                termCol,
            }),
        );

        const $termElements = $(`.ons-description-list__term.${expectedClass}`);
        expect($termElements.length).toBe(2);
    });

    it.each([
        [1, 'ons-col-1\\@m'],
        [4, 'ons-col-4\\@m'],
    ])('applies class for the provided `descriptionCol` (%i -> %s)', (descriptionCol, expectedClass) => {
        const $ = cheerio.load(
            renderComponent('description-list', {
                ...EXAMPLE_DESCRIPTION_LIST_MINIMAL,
                descriptionCol,
            }),
        );

        const $valueElements = $(`.ons-description-list__value.${expectedClass}`);
        expect($valueElements.length).toBe(3);
    });
});
