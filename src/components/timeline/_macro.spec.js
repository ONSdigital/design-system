/** @jest-environment jsdom */

import * as cheerio from 'cheerio';

import axe from '../../tests/helpers/axe';
import { renderComponent, templateFaker } from '../../tests/helpers/rendering';

const EXAMPLE_TIMELINE = {
  items: [
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

  it('has the provided inner item list', () => {
    const faker = templateFaker();
    const listSpy = faker.spy('lists');

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
