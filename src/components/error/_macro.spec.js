/** @jest-environment jsdom */

import * as cheerio from 'cheerio';

import axe from '../../tests/helpers/axe';
import { renderComponent, templateFaker } from '../../tests/helpers/rendering';

const FAKE_NESTED_CONTENT = '<span class="test--nested">Nested content...</span>';

describe('macro: error', () => {
  it('passes jest-axe checks', async () => {
    const $ = cheerio.load(
      renderComponent(
        'error',
        {
          text: 'Example error text.',
          id: 'example-error',
        },
        FAKE_NESTED_CONTENT,
      ),
    );

    const results = await axe($.html());
    expect(results).toHaveNoViolations();
  });

  it('has the provided `text` text', () => {
    const $ = cheerio.load(
      renderComponent(
        'error',
        {
          text: 'Example error text.',
          id: 'example-error',
        },
        FAKE_NESTED_CONTENT,
      ),
    );

    expect(
      $('.ons-panel__error')
        .text()
        .trim(),
    ).toBe('Example error text.');
  });

  it('applies the provided `attributes` to the error content paragraph', () => {
    const $ = cheerio.load(
      renderComponent(
        'error',
        {
          text: 'Example error text.',
          id: 'example-error',
          attributes: {
            'data-test-a': 'foo',
            'data-test-b': 'bar',
          },
        },
        FAKE_NESTED_CONTENT,
      ),
    );

    expect($('.ons-panel__error').attr('data-test-a')).toBe('foo');
    expect($('.ons-panel__error').attr('data-test-b')).toBe('bar');
  });

  it('renders output using a `panel` component', () => {
    const faker = templateFaker();
    const panelSpy = faker.spy('panel');

    faker.renderComponent(
      'error',
      {
        text: 'Example error text.',
        id: 'example-error',
      },
      FAKE_NESTED_CONTENT,
    );

    expect(panelSpy.occurrences[0].type).toBe('error');
    expect(panelSpy.occurrences[0].id).toBe('example-error');
  });

  it('renders output using a `panel` component with expected nested content', () => {
    const $ = cheerio.load(
      renderComponent(
        'error',
        {
          text: 'Example error text.',
          id: 'example-error',
        },
        FAKE_NESTED_CONTENT,
      ),
    );

    expect($('.ons-panel .test--nested').text()).toBe('Nested content...');
  });
});
