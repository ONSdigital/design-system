/** @jest-environment jsdom */

import * as cheerio from 'cheerio';

import axe from '../../tests/helpers/axe';
import { renderComponent, templateFaker } from '../../tests/helpers/rendering';

const EXAMPLE_TIMELINE = {
    timelineItems: [
        {
            heading: 'January 2020',
            content: 'Timeline entry 1',
        },
        {
            heading: 'March 2020',
            content: 'Timeline entry 2',
        },
        {
            heading: 'December 2020',
            itemsList: [
                {
                    text: 'Timeline entry 3 item 1',
                },
                {
                    text: 'Timeline entry 3 item 2',
                },
            ],
        },
    ],
};

describe('macro: timeline', () => {
    it('passes jest-axe checks', async () => {
        const $ = cheerio.load(renderComponent('timeline', EXAMPLE_TIMELINE));

        const results = await axe($.html());
        expect(results).toHaveNoViolations();
    });

    it('has additionally provided style classes', () => {
        const $ = cheerio.load(
            renderComponent('timeline', {
                ...EXAMPLE_TIMELINE,
                classes: 'extra-class another-extra-class',
            }),
        );

        expect($('.ons-timeline').hasClass('extra-class')).toBe(true);
        expect($('.ons-timeline').hasClass('another-extra-class')).toBe(true);
    });

    it('has the provided timeline items', () => {
        const $ = cheerio.load(renderComponent('timeline', EXAMPLE_TIMELINE));

        const $firstItem = $('.ons-timeline__item:nth-child(1)');
        const $firstItemHeading = $firstItem.find('.ons-timeline__heading');
        const $secondItem = $('.ons-timeline__item:nth-child(2)');
        const $secondItemHeading = $secondItem.find('.ons-timeline__heading');

        expect($firstItemHeading.text().trim()).toBe('January 2020');
        expect($firstItem.text()).toContain('Timeline entry 1');
        expect($secondItemHeading.text().trim()).toBe('March 2020');
        expect($secondItem.text()).toContain('Timeline entry 2');
    });

    it('renders a heading based upon `headingLevel` parameter', () => {
        const EXAMPLE_TIMELINE_WITH_TITLE_TAG = {
            ...EXAMPLE_TIMELINE,
            headingLevel: 3,
        };
        const $ = cheerio.load(renderComponent('timeline', EXAMPLE_TIMELINE_WITH_TITLE_TAG));
        const $firstItem = $('.ons-timeline__item:nth-child(1)');
        expect($firstItem.html().includes('h3')).toBe(true);
    });

    it('has a provided ons-timeline__content class, wrapping the content', () => {
        const $ = cheerio.load(renderComponent('timeline', EXAMPLE_TIMELINE));

        const $content = $('.ons-timeline__content');

        expect($content.length).toBe(3);
    });

    it('has the provided inner item list', () => {
        const faker = templateFaker();
        const listSpy = faker.spy('list');

        faker.renderComponent('timeline', EXAMPLE_TIMELINE);

        expect(listSpy.occurrences[0].itemsList).toEqual([
            {
                text: 'Timeline entry 3 item 1',
            },
            {
                text: 'Timeline entry 3 item 2',
            },
        ]);
    });
});
