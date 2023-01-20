/** @jest-environment jsdom */

import * as cheerio from 'cheerio';

import axe from '../../tests/helpers/axe';
import { renderComponent, templateFaker } from '../../tests/helpers/rendering';

describe('macro: link-button', () => {
  it('passes jest-axe checks', async () => {
    const $ = cheerio.load(
      renderComponent('button-link', {
        text: 'Example button',
        url: 'http://example.com',
      }),
    );

    const results = await axe($.html());
    expect(results).toHaveNoViolations();
  });

  it('has the provided link', () => {
    const $ = cheerio.load(
      renderComponent('button-link', {
        url: 'http://example.com',
      }),
    );

    expect($('a').attr('href')).toBe('http://example.com');
  });

  it('has the provided `id` attribute', () => {
    const $ = cheerio.load(
      renderComponent('button-link', {
        url: 'http://example.com',
        id: 'example-id',
      }),
    );

    expect($('#example-id').length).toBe(1);
  });

  it('has additionally provided `attributes`', () => {
    const $ = cheerio.load(
      renderComponent('button-link', {
        url: 'http://example.com',
        attributes: {
          a: 123,
          b: 456,
        },
      }),
    );

    expect($('.ons-btn--link').attr('a')).toBe('123');
    expect($('.ons-btn--link').attr('b')).toBe('456');
  });

  it('has provided variant style classes', () => {
    const $ = cheerio.load(
      renderComponent('button-link', {
        variants: ['variant-a', 'variant-b'],
      }),
    );

    expect($('.ons-btn').hasClass('ons-btn--variant-a')).toBe(true);
    expect($('.ons-btn').hasClass('ons-btn--variant-b')).toBe(true);
  });

  it('has download variant style class when `variants` contains `download`', () => {
    const $ = cheerio.load(
      renderComponent('button-link', {
        url: 'http://example.com',
        variants: 'download',
      }),
    );

    expect($('.ons-btn').hasClass('ons-btn--download')).toBe(true);
  });

  it('has `download` icon when `variants` contains "download"', () => {
    const faker = templateFaker();
    const iconsSpy = faker.spy('icons');

    faker.renderComponent('button-link', {
      url: 'http://example.com',
      variants: 'download',
    });

    expect(iconsSpy.occurrences[0].iconType).toBe('download');
  });

  it('has additionally provided style classes', () => {
    const $ = cheerio.load(
      renderComponent('button-link', {
        classes: 'extra-class another-extra-class',
      }),
    );

    expect($('.ons-btn').hasClass('extra-class')).toBe(true);
    expect($('.ons-btn').hasClass('another-extra-class')).toBe(true);
  });

  it('has additionally provided inner style classes', () => {
    const $ = cheerio.load(
      renderComponent('button-link', {
        innerClasses: 'extra-inner-class another-extra-inner-class',
      }),
    );

    expect($('.ons-btn__inner').hasClass('extra-inner-class')).toBe(true);
    expect($('.ons-btn__inner').hasClass('another-extra-inner-class')).toBe(true);
  });

  it('has label text when `text` is provided', () => {
    const $ = cheerio.load(
      renderComponent('button-link', {
        text: 'Click > me!',
      }),
    );

    expect($('.ons-btn__text').html()).toBe('Click &gt; me!');
  });

  it('has label text when `html` is provided', () => {
    const $ = cheerio.load(
      renderComponent('button-link', {
        html: 'Click <strong>me</strong>!',
      }),
    );

    expect($('.ons-btn__text').html()).toBe('Click <strong>me</strong>!');
  });

  it('has button context text when `buttonContext` is provided', () => {
    const $ = cheerio.load(
      renderComponent('button-link', {
        buttonContext: 'button context text',
      }),
    );

    expect($('.ons-btn__context').text()).toBe('button context text');
  });

  it('has custom icon before button text', () => {
    const $ = cheerio.load(
      renderComponent('button-link', {
        text: 'Click me!',
        iconPosition: 'before',
        iconType: 'exit',
      }),
    );

    expect($('.ons-svg-icon + .ons-btn__text').text()).toBe('Click me!');
  });

  it('has custom icon after button text', () => {
    const $ = cheerio.load(
      renderComponent('button-link', {
        text: 'Click me!',
        iconPosition: 'after',
        iconType: 'exit',
      }),
    );

    expect(
      $('.ons-btn__text + .ons-svg-icon')
        .prev()
        .text(),
    ).toBe('Click me!');
  });

  it('has `arrow-next` icon by default', () => {
    const faker = templateFaker();
    const iconsSpy = faker.spy('icons');

    faker.renderComponent('button-link', {
      url: 'http://example.com',
    });

    expect(iconsSpy.occurrences[0].iconType).toBe('arrow-next');
  });

  it('opens in a new window when `newWindow` is `true`', () => {
    const $ = cheerio.load(
      renderComponent('button-link', {
        url: 'http://example.com',
        newWindow: true,
      }),
    );

    expect($('a').attr('target')).toBe('_blank');
    expect($('a').attr('rel')).toBe('noopener');
  });

  it('has `external-link` icon when `newWindow` is `true`', () => {
    const faker = templateFaker();
    const iconsSpy = faker.spy('icons');

    faker.renderComponent('button-link', {
      url: 'http://example.com',
      newWindow: true,
    });

    expect(iconsSpy.occurrences[0].iconType).toBe('external-link');
  });

  it('has a default new window description when `newWindow` is `true`', () => {
    const $ = cheerio.load(
      renderComponent('button-link', {
        url: 'http://example.com',
        newWindow: true,
      }),
    );

    expect($('.ons-btn__new-window-description').text()).toBe(' (opens in a new tab)');
  });

  it('has a custom new window description when `newWindow` is `true` and `newWindowDescription` is provided', () => {
    const $ = cheerio.load(
      renderComponent('button-link', {
        url: 'http://example.com',
        newWindow: true,
        newWindowDescription: 'custom opens in a new window text',
      }),
    );

    expect($('.ons-btn__new-window-description').text()).toBe(' (custom opens in a new window text)');
  });

  it('does not have the `download` attribute when `variants` contains "download" and `removeDownloadAttribute` is `true`', () => {
    const $ = cheerio.load(
      renderComponent('button-link', {
        variants: 'download',
        removeDownloadAttribute: true,
      }),
    );

    expect($('.ons-btn').attr('download')).toBeUndefined();
  });
});
