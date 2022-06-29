/** @jest-environment jsdom */

import * as cheerio from 'cheerio';

import axe from '../../tests/helpers/axe';
import { renderComponent } from '../../tests/helpers/rendering';

describe('macro: access-code', () => {
  it('passes jest-axe checks', async () => {
    const $ = cheerio.load(
      renderComponent('access-code', {
        id: 'example-access-code',
        label: {
          text: 'Enter your 16-character access code',
          description: 'Keep this code safe. You will need to enter it every time you access your study',
        },
      }),
    );

    const results = await axe($.html());
    expect(results).toHaveNoViolations();
  });

  it('has the provided `id` attribute', () => {
    const $ = cheerio.load(
      renderComponent('access-code', {
        id: 'example-id',
      }),
    );

    expect($('#example-id').length).toBe(1);
  });

  it('has the provided `name` attribute', () => {
    const $ = cheerio.load(
      renderComponent('access-code', {
        name: 'special-name',
      }),
    );

    expect($('input').attr('name')).toBe('special-name');
  });

  it('has a default `type` of "text"', () => {
    const $ = cheerio.load(renderComponent('access-code'));

    expect($('input').attr('type')).toBe('text');
  });

  it('has the provided `type` attribute', () => {
    const $ = cheerio.load(
      renderComponent('access-code', {
        type: 'number',
      }),
    );

    expect($('input').attr('inputmode')).toBe('numeric');
  });

  it('has additionally provided style classes', () => {
    const $ = cheerio.load(
      renderComponent('access-code', {
        classes: 'extra-class another-extra-class',
      }),
    );

    expect($('.ons-panel--info').hasClass('extra-class')).toBe(true);
    expect($('.ons-panel--info').hasClass('another-extra-class')).toBe(true);
  });

  it('has provided label text and description', () => {
    const $ = cheerio.load(
      renderComponent('access-code', {
        label: {
          text: 'Enter your 16-character access code',
          description: 'Keep this code safe. You will need to enter it every time you access your study',
        },
      }),
    );

    expect($('.ons-label--with-description').text()).toBe('Enter your 16-character access code');
    expect($('.ons-input--with-description').text()).toBe(
      'Keep this code safe. You will need to enter it every time you access your study',
    );
  });

  it('has provided maximum length attribute including spaces required for groupSize', () => {
    const $ = cheerio.load(
      renderComponent('access-code', {
        maxlength: 6,
        groupSize: 3,
      }),
    );

    expect($('input').attr('maxlength')).toBe('7');
  });

  it('has provided group size attribute', () => {
    const $ = cheerio.load(
      renderComponent('access-code', {
        groupSize: 2,
      }),
    );

    expect($('input').attr('data-group-size')).toBe('2');
  });

  it('has autocomplete disabled on its text input', () => {
    const $ = cheerio.load(renderComponent('access-code'));

    expect($('input').attr('autocomplete')).toBe('off');
  });

  it('has automatic capitalization on its text input', () => {
    const $ = cheerio.load(renderComponent('access-code'));

    expect($('input').attr('autocapitalize')).toBe('characters');
  });

  it('has provided security message text', () => {
    const $ = cheerio.load(
      renderComponent('access-code', {
        securityMessage: 'Example security message.',
      }),
    );

    expect(
      $('.ons-panel__body')
        .text()
        .trim(),
    ).toBe('Example security message.');
  });

  it('has provided `postTextBoxLinkText` and `postTextBoxLinkUrl`', () => {
    const $ = cheerio.load(
      renderComponent('access-code', {
        postTextboxLinkText: 'Example link text',
        postTextboxLinkUrl: '#3',
      }),
    );

    expect(
      $('a[href="#3"]')
        .text()
        .trim(),
    ).toBe('Example link text');
  });

  it('has provided `error` output', () => {
    const $ = cheerio.load(
      renderComponent('access-code', {
        error: {
          id: 'uac-error',
          text: 'Enter an access code',
        },
      }),
    );

    expect($('#uac-error').length).toBe(1);
    expect($('.ons-panel__error > strong').text()).toBe('Enter an access code');
  });
});
