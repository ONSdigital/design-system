/** @jest-environment jsdom */

import * as cheerio from 'cheerio';

import axe from '../../tests/helpers/axe';
import { renderComponent, templateFaker } from '../../tests/helpers/rendering';

const EXAMPLE_RELATIONSHIPS = {
  playback: "Amanda Bloggs is Joe Bloggs' <em>…</em>",
  name: 'relationship',
  dontWrap: true,
  legendIsQuestionTitle: true,
  radios: [
    {
      id: 'grandparent',
      value: 'grandparent',
      label: {
        text: 'Grandparent',
      },
      attributes: {
        'data-title': 'Thinking of Joe Bloggs, Amanda Bloggs is their <em>grandparents</em>',
        'data-playback': "Amanda Bloggs is Joe Bloggs' <em>grandparents</em>",
      },
    },
    {
      id: 'other-relation',
      value: 'other-relation',
      label: {
        text: 'Other relation',
      },
      attributes: {
        'data-title': 'Thinking of Joe Bloggs, Amanda Bloggs is their <em>other relation</em>',
        'data-playback': "Amanda Bloggs is Joe Bloggs' <em>other relation</em>",
      },
    },
    {
      id: 'unrelated',
      value: 'unrelated',
      label: {
        text: 'Unrelated',
        description: 'Including foster child',
      },
      attributes: {
        'data-title': 'Thinking of Joe Bloggs, Amanda Bloggs is <em>unrelated</em> to Joe Bloggs',
        'data-playback': 'Amanda Bloggs is <em>unrelated</em> to Joe Bloggs',
      },
    },
  ],
};

describe('macro: relationships', () => {
  it('passes jest-axe checks', async () => {
    const $ = cheerio.load(renderComponent('relationships', EXAMPLE_RELATIONSHIPS));

    const results = await axe($.html());
    expect(results).toHaveNoViolations();
  });

  it('has the expected `id` attribute', () => {
    const $ = cheerio.load(
      renderComponent('relationships', {
        ...EXAMPLE_RELATIONSHIPS,
        id: 'example-relationships',
      }),
    );

    expect($('.ons-relationships').attr('id')).toBe('example-relationships');
  });

  it('has additionally provided style classes', () => {
    const $ = cheerio.load(
      renderComponent('relationships', {
        ...EXAMPLE_RELATIONSHIPS,
        classes: 'extra-class another-extra-class',
      }),
    );

    expect($('.ons-relationships').hasClass('extra-class')).toBe(true);
    expect($('.ons-relationships').hasClass('another-extra-class')).toBe(true);
  });

  it('has the provided `playback` text', () => {
    const $ = cheerio.load(renderComponent('relationships', EXAMPLE_RELATIONSHIPS));

    const playbackContent = $('.ons-relationships__playback')
      .html()
      .trim();
    expect(playbackContent).toBe("Amanda Bloggs is Joe Bloggs' <em>…</em>");
  });

  it('has playback paragraph hidden initially', async () => {
    const $ = cheerio.load(renderComponent('relationships', EXAMPLE_RELATIONSHIPS));

    expect($('.ons-relationships__playback').hasClass('ons-u-d-no')).toBe(true);
  });

  it('renders the expected radio items the radios macro', () => {
    const faker = templateFaker();
    const radiosSpy = faker.spy('radios');

    faker.renderComponent('relationships', EXAMPLE_RELATIONSHIPS);

    expect(radiosSpy.occurrences[0]).toHaveProperty('name', 'relationship');
    expect(radiosSpy.occurrences[0]).toHaveProperty('dontWrap', true);
    expect(radiosSpy.occurrences[0]).toHaveProperty('legendIsQuestionTitle', true);
    expect(radiosSpy.occurrences[0]).toHaveProperty('radios', EXAMPLE_RELATIONSHIPS.radios);
  });
});
