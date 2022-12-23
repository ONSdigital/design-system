/** @jest-environment jsdom */

import * as cheerio from 'cheerio';

import axe from '../../tests/helpers/axe';
import { renderComponent, templateFaker } from '../../tests/helpers/rendering';

const PAGINATION_PREV_NEXT_LABELS = {
  previous: 'Previous page',
  next: 'Next page',
};

const EXAMPLE_PAGINATION_MINIMAL = {
  ...PAGINATION_PREV_NEXT_LABELS,
  pages: [{ url: '/page/1', current: true }],
};

describe('macro: pagination', () => {
  it('has additionally provided style classes', () => {
    const $ = cheerio.load(
      renderComponent('pagination', {
        ...EXAMPLE_PAGINATION_MINIMAL,
        classes: 'extra-class another-extra-class',
      }),
    );

    expect($('.ons-pagination').hasClass('extra-class')).toBe(true);
    expect($('.ons-pagination').hasClass('another-extra-class')).toBe(true);
  });

  it('has `ons-pagination--no-indicator` style class when `hideRangeIndicator` is `true`', () => {
    const $ = cheerio.load(
      renderComponent('pagination', {
        ...EXAMPLE_PAGINATION_MINIMAL,
        hideRangeIndicator: true,
      }),
    );

    expect($('.ons-pagination').hasClass('ons-pagination--no-indicator')).toBe(true);
  });

  it('does not have `ons-pagination--no-indicator` style class when `hideRangeIndicator` is `false`', () => {
    const $ = cheerio.load(
      renderComponent('pagination', {
        ...EXAMPLE_PAGINATION_MINIMAL,
        hideRangeIndicator: false,
      }),
    );

    expect($('.ons-pagination').hasClass('ons-pagination--no-indicator')).toBe(false);
  });

  describe('one page', () => {
    const $ = cheerio.load(
      renderComponent('pagination', {
        ...PAGINATION_PREV_NEXT_LABELS,
        pages: [{ url: '/page/1', current: true }],
      }),
    );

    it('passes jest-axe checks', async () => {
      const results = await axe($.html());
      expect(results).toHaveNoViolations();
    });

    it('has `aria-label` attribute indicating position within pagination', () => {
      expect($('.ons-pagination').attr('aria-label')).toBe('Pagination (Page 1 of 1)');
    });

    it('renders element indicating position within pagination', () => {
      expect(
        $('.ons-pagination__position')
          .text()
          .trim(),
      ).toBe('Page 1 of 1');
    });

    it('has a single list item', () => {
      expect($('li').length).toBe(1);
      assertIsCurrentPage($('.ons-pagination__item'), '/page/1', 'Current page (Page 1 of 1)', '1');
    });
  });

  describe('two pages where first is the current page', () => {
    const $ = cheerio.load(
      renderComponent('pagination', {
        ...PAGINATION_PREV_NEXT_LABELS,
        pages: [{ url: '/page/1', current: true }, { url: '/page/2' }],
      }),
    );

    it('passes jest-axe checks', async () => {
      const results = await axe($.html());
      expect(results).toHaveNoViolations();
    });

    it('has `aria-label` attribute indicating position within pagination', () => {
      expect($('.ons-pagination').attr('aria-label')).toBe('Pagination (Page 1 of 2)');
    });

    it('renders element indicating position within pagination', () => {
      expect(
        $('.ons-pagination__position')
          .text()
          .trim(),
      ).toBe('Page 1 of 2');
    });

    it('has a 3 list items ("1", "2", "Next page")', () => {
      expect($('li').length).toBe(3);
      assertIsCurrentPage($('.ons-pagination__item:nth-child(1)'), '/page/1', 'Current page (Page 1 of 2)', '1');
      assertIsNextPage($('.ons-pagination__item:nth-child(2)'), '/page/2', 'Go to page 2', '2');
      assertIsNextPage($('.ons-pagination__item:nth-child(3)'), '/page/2', 'Go to the next page (Page 2)', 'Next page');
    });
  });

  describe('two pages where second is the current page', () => {
    const $ = cheerio.load(
      renderComponent('pagination', {
        ...PAGINATION_PREV_NEXT_LABELS,
        pages: [{ url: '/page/1' }, { url: '/page/2', current: true }],
      }),
    );

    it('passes jest-axe checks', async () => {
      const results = await axe($.html());
      expect(results).toHaveNoViolations();
    });

    it('has `aria-label` attribute indicating position within pagination', () => {
      expect($('.ons-pagination').attr('aria-label')).toBe('Pagination (Page 2 of 2)');
    });

    it('renders element indicating position within pagination', () => {
      expect(
        $('.ons-pagination__position')
          .text()
          .trim(),
      ).toBe('Page 2 of 2');
    });

    it('has a 3 list items ("Previous page", "1", "2")', () => {
      expect($('li').length).toBe(3);
      assertIsPreviousPage($('.ons-pagination__item:nth-child(1)'), '/page/1', 'Go to the previous page (Page 1)', 'Previous page');
      assertIsPreviousPage($('.ons-pagination__item:nth-child(2)'), '/page/1', 'Go to page 1', '1');
      assertIsCurrentPage($('.ons-pagination__item:nth-child(3)'), '/page/2', 'Current page (Page 2 of 2)', '2');
    });
  });

  describe('three pages where second is the current page', () => {
    const $ = cheerio.load(
      renderComponent('pagination', {
        ...PAGINATION_PREV_NEXT_LABELS,
        pages: [{ url: '/page/1' }, { url: '/page/2', current: true }, { url: '/page/3' }],
      }),
    );

    it('passes jest-axe checks', async () => {
      const results = await axe($.html());
      expect(results).toHaveNoViolations();
    });

    it('has `aria-label` attribute indicating position within pagination', () => {
      expect($('.ons-pagination').attr('aria-label')).toBe('Pagination (Page 2 of 3)');
    });

    it('renders element indicating position within pagination', () => {
      expect(
        $('.ons-pagination__position')
          .text()
          .trim(),
      ).toBe('Page 2 of 3');
    });

    it('has a 5 list items ("Previous page", "1", "2", "3", "Next page")', () => {
      expect($('li').length).toBe(5);
      assertIsPreviousPage($('.ons-pagination__item:nth-child(1)'), '/page/1', 'Go to the previous page (Page 1)', 'Previous page');
      assertIsPreviousPage($('.ons-pagination__item:nth-child(2)'), '/page/1', 'Go to page 1', '1');
      assertIsCurrentPage($('.ons-pagination__item:nth-child(3)'), '/page/2', 'Current page (Page 2 of 3)', '2');
      assertIsNextPage($('.ons-pagination__item:nth-child(4)'), '/page/3', 'Go to page 3', '3');
      assertIsNextPage($('.ons-pagination__item:nth-child(5)'), '/page/3', 'Go to the next page (Page 3)', 'Next page');
    });
  });

  describe('five pages where second is the current page', () => {
    const $ = cheerio.load(
      renderComponent('pagination', {
        ...PAGINATION_PREV_NEXT_LABELS,
        pages: [{ url: '/page/1' }, { url: '/page/2', current: true }, { url: '/page/3' }, { url: '/page/4' }, { url: '/page/5' }],
      }),
    );

    it('passes jest-axe checks', async () => {
      const results = await axe($.html());
      expect(results).toHaveNoViolations();
    });

    it('has `aria-label` attribute indicating position within pagination', () => {
      expect($('.ons-pagination').attr('aria-label')).toBe('Pagination (Page 2 of 5)');
    });

    it('renders element indicating position within pagination', () => {
      expect(
        $('.ons-pagination__position')
          .text()
          .trim(),
      ).toBe('Page 2 of 5');
    });

    it('has a 7 list items ("Previous page", "1", "2", "3", "4", "5", "Next page")', () => {
      expect($('li').length).toBe(7);
      assertIsPreviousPage($('.ons-pagination__item:nth-child(1)'), '/page/1', 'Go to the previous page (Page 1)', 'Previous page');
      assertIsPreviousPage($('.ons-pagination__item:nth-child(2)'), '/page/1', 'Go to page 1', '1');
      assertIsCurrentPage($('.ons-pagination__item:nth-child(3)'), '/page/2', 'Current page (Page 2 of 5)', '2');
      assertIsNextPage($('.ons-pagination__item:nth-child(4)'), '/page/3', 'Go to page 3', '3');
      assertIsOtherPage($('.ons-pagination__item:nth-child(5)'), '/page/4', 'Go to page 4', '4');
      assertIsOtherPage($('.ons-pagination__item:nth-child(6)'), '/page/5', 'Go to the last page (Page 5)', '5');
      assertIsNextPage($('.ons-pagination__item:nth-child(7)'), '/page/3', 'Go to the next page (Page 3)', 'Next page');
    });
  });

  describe('six pages where second is the current page', () => {
    const $ = cheerio.load(
      renderComponent('pagination', {
        ...PAGINATION_PREV_NEXT_LABELS,
        pages: [
          { url: '/page/1' },
          { url: '/page/2', current: true },
          { url: '/page/3' },
          { url: '/page/4' },
          { url: '/page/5' },
          { url: '/page/6' },
        ],
      }),
    );

    it('passes jest-axe checks', async () => {
      const results = await axe($.html());
      expect(results).toHaveNoViolations();
    });

    it('has `aria-label` attribute indicating position within pagination', () => {
      expect($('.ons-pagination').attr('aria-label')).toBe('Pagination (Page 2 of 6)');
    });

    it('renders element indicating position within pagination', () => {
      expect(
        $('.ons-pagination__position')
          .text()
          .trim(),
      ).toBe('Page 2 of 6');
    });

    it('has 7 list items ("Previous page", "1", "2", "3", "...", "6", "Next page")', () => {
      expect($('li').length).toBe(7);
      assertIsPreviousPage($('.ons-pagination__item:nth-child(1)'), '/page/1', 'Go to the previous page (Page 1)', 'Previous page');
      assertIsPreviousPage($('.ons-pagination__item:nth-child(2)'), '/page/1', 'Go to page 1', '1');
      assertIsCurrentPage($('.ons-pagination__item:nth-child(3)'), '/page/2', 'Current page (Page 2 of 6)', '2');
      assertIsNextPage($('.ons-pagination__item:nth-child(4)'), '/page/3', 'Go to page 3', '3');
      assertIsGap($('.ons-pagination__item:nth-child(5)'));
      assertIsOtherPage($('.ons-pagination__item:nth-child(6)'), '/page/6', 'Go to the last page (Page 6)', '6');
      assertIsNextPage($('.ons-pagination__item:nth-child(7)'), '/page/3', 'Go to the next page (Page 3)', 'Next page');
    });
  });

  describe('eleven pages where fifth is the current page', () => {
    const $ = cheerio.load(
      renderComponent('pagination', {
        ...PAGINATION_PREV_NEXT_LABELS,
        pages: [
          { url: '/page/1' },
          { url: '/page/2' },
          { url: '/page/3' },
          { url: '/page/4' },
          { url: '/page/5', current: true },
          { url: '/page/6' },
          { url: '/page/7' },
          { url: '/page/8' },
          { url: '/page/9' },
          { url: '/page/10' },
          { url: '/page/11' },
        ],
      }),
    );

    it('passes jest-axe checks', async () => {
      const results = await axe($.html());
      expect(results).toHaveNoViolations();
    });

    it('has `aria-label` attribute indicating position within pagination', () => {
      expect($('.ons-pagination').attr('aria-label')).toBe('Pagination (Page 5 of 11)');
    });

    it('renders element indicating position within pagination', () => {
      expect(
        $('.ons-pagination__position')
          .text()
          .trim(),
      ).toBe('Page 5 of 11');
    });

    it('has a 9 list items ("Previous page", "1", "...", "4", "5", "6", "...", "11", "Next page")', () => {
      expect($('li').length).toBe(9);
      assertIsPreviousPage($('.ons-pagination__item:nth-child(1)'), '/page/4', 'Go to the previous page (Page 4)', 'Previous page');
      assertIsOtherPage($('.ons-pagination__item:nth-child(2)'), '/page/1', 'Go to the first page (Page 1)', '1');
      assertIsGap($('.ons-pagination__item:nth-child(3)'));
      assertIsPreviousPage($('.ons-pagination__item:nth-child(4)'), '/page/4', 'Go to page 4', '4');
      assertIsCurrentPage($('.ons-pagination__item:nth-child(5)'), '/page/5', 'Current page (Page 5 of 11)', '5');
      assertIsNextPage($('.ons-pagination__item:nth-child(6)'), '/page/6', 'Go to page 6', '6');
      assertIsGap($('.ons-pagination__item:nth-child(7)'));
      assertIsOtherPage($('.ons-pagination__item:nth-child(8)'), '/page/11', 'Go to the last page (Page 11)', '11');
      assertIsNextPage($('.ons-pagination__item:nth-child(9)'), '/page/6', 'Go to the next page (Page 6)', 'Next page');
    });
  });

  describe('eleven pages where tenth is the current page', () => {
    const $ = cheerio.load(
      renderComponent('pagination', {
        ...PAGINATION_PREV_NEXT_LABELS,
        pages: [
          { url: '/page/1' },
          { url: '/page/2' },
          { url: '/page/3' },
          { url: '/page/4' },
          { url: '/page/5' },
          { url: '/page/6' },
          { url: '/page/7' },
          { url: '/page/8' },
          { url: '/page/9' },
          { url: '/page/10', current: true },
          { url: '/page/11' },
        ],
      }),
    );

    it('passes jest-axe checks', async () => {
      const results = await axe($.html());
      expect(results).toHaveNoViolations();
    });

    it('has `aria-label` attribute indicating position within pagination', () => {
      expect($('.ons-pagination').attr('aria-label')).toBe('Pagination (Page 10 of 11)');
    });

    it('renders element indicating position within pagination', () => {
      expect(
        $('.ons-pagination__position')
          .text()
          .trim(),
      ).toBe('Page 10 of 11');
    });

    it('has a 7 list items ("Previous page", "1", "...", "9", "10", "11", "Next page")', () => {
      expect($('li').length).toBe(7);
      assertIsPreviousPage($('.ons-pagination__item:nth-child(1)'), '/page/9', 'Go to the previous page (Page 9)', 'Previous page');
      assertIsOtherPage($('.ons-pagination__item:nth-child(2)'), '/page/1', 'Go to the first page (Page 1)', '1');
      assertIsGap($('.ons-pagination__item:nth-child(3)'));
      assertIsPreviousPage($('.ons-pagination__item:nth-child(4)'), '/page/9', 'Go to page 9', '9');
      assertIsCurrentPage($('.ons-pagination__item:nth-child(5)'), '/page/10', 'Current page (Page 10 of 11)', '10');
      assertIsNextPage($('.ons-pagination__item:nth-child(6)'), '/page/11', 'Go to page 11', '11');
      assertIsNextPage($('.ons-pagination__item:nth-child(7)'), '/page/11', 'Go to the next page (Page 11)', 'Next page');
    });
  });
});

function assertIsCurrentPage(pageItem, url, label, text) {
  expect(pageItem.hasClass('ons-pagination__item--current')).toBe(true);
  expect(pageItem.find('.ons-pagination__link').attr('href')).toBe(url);
  expect(pageItem.find('.ons-pagination__link').attr('aria-current')).toBe('true');
  expect(pageItem.find('.ons-pagination__link').attr('aria-label')).toBe(label);
  expect(
    pageItem
      .find('.ons-pagination__link')
      .text()
      .trim(),
  ).toBe(text);
}

function assertIsOtherPage(pageItem, url, label, text) {
  expect(pageItem.hasClass('ons-pagination__item--current')).toBe(false);
  expect(pageItem.find('.ons-pagination__link').attr('href')).toBe(url);
  expect(pageItem.find('.ons-pagination__link').attr('aria-current')).toBeUndefined();
  expect(pageItem.find('.ons-pagination__link').attr('aria-label')).toBe(label);
  expect(
    pageItem
      .find('.ons-pagination__link')
      .text()
      .trim(),
  ).toBe(text);
}

function assertIsPreviousPage(pageItem, url, label, text) {
  assertIsOtherPage(pageItem, url, label, text);
  expect(pageItem.find('.ons-pagination__link').attr('rel')).toBe('prev');
}

function assertIsNextPage(pageItem, url, label, text) {
  assertIsOtherPage(pageItem, url, label, text);
  expect(pageItem.find('.ons-pagination__link').attr('rel')).toBe('next');
}

function assertIsGap(pageItem) {
  expect(pageItem.hasClass('ons-pagination__item--gap')).toBe(true);
  expect(pageItem.text().trim()).toBe('…');
}
