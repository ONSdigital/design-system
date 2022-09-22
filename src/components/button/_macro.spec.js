/** @jest-environment jsdom */

import * as cheerio from 'cheerio';

import axe from '../../tests/helpers/axe';
import { renderComponent, templateFaker } from '../../tests/helpers/rendering';

describe('macro: button', () => {
  it('has the provided `id` attribute', () => {
    const $ = cheerio.load(
      renderComponent('button', {
        id: 'example-id',
      }),
    );

    expect($('#example-id').length).toBe(1);
  });

  it('has additionally provided `attributes`', () => {
    const $ = cheerio.load(
      renderComponent('button', {
        attributes: {
          a: 123,
          b: 456,
        },
      }),
    );

    expect($('button').attr('a')).toBe('123');
    expect($('button').attr('b')).toBe('456');
  });

  it('has expected style classes', () => {
    const $ = cheerio.load(renderComponent('button'));

    expect($('.ons-btn .ons-btn__inner').length).toBe(1);
  });

  it('has provided variant style classes', () => {
    const $ = cheerio.load(
      renderComponent('button', {
        variants: ['variant-a', 'variant-b'],
      }),
    );

    expect($('.ons-btn').hasClass('ons-btn--variant-a')).toBe(true);
    expect($('.ons-btn').hasClass('ons-btn--variant-b')).toBe(true);
  });

  it('has download variant style class when `variants` contains `download`', () => {
    const $ = cheerio.load(
      renderComponent('button', {
        url: 'http://example.com',
        variants: 'download',
      }),
    );

    expect($('.ons-btn').hasClass('ons-btn--download')).toBe(true);
  });

  it('has `download` icon when `variants` contains "download"', () => {
    const faker = templateFaker();
    const iconsSpy = faker.spy('icons');

    faker.renderComponent('button', {
      url: 'http://example.com',
      variants: 'download',
    });

    expect(iconsSpy.occurrences[0].iconType).toBe('download');
  });

  it('has provided variant style classes when `variants` contains "print"', () => {
    const $ = cheerio.load(
      renderComponent('button', {
        variants: 'print',
      }),
    );

    expect($('.ons-btn').hasClass('ons-btn--print')).toBe(true);
    expect($('.ons-btn').hasClass('ons-u-d-no')).toBe(true);
    expect($('.ons-btn').hasClass('ons-js-print-btn')).toBe(true);
  });

  it('has `print` icon when `variants` contains "print"', () => {
    const faker = templateFaker();
    const iconsSpy = faker.spy('icons');

    faker.renderComponent('button', {
      url: 'http://example.com',
      variants: 'print',
    });

    expect(iconsSpy.occurrences[0].iconType).toBe('print');
  });

  it('has provided variant style classes when `variants` contains "loader"', () => {
    const $ = cheerio.load(
      renderComponent('button', {
        variants: 'loader',
      }),
    );

    expect($('.ons-btn').hasClass('ons-btn--loader')).toBe(true);
    expect($('.ons-btn').hasClass('ons-js-loader')).toBe(true);
    expect($('.ons-btn').hasClass('ons-js-submit-btn')).toBe(true);
  });

  it('has `loader` icon when `variants` contains "loader"', () => {
    const faker = templateFaker();
    const iconsSpy = faker.spy('icons');

    faker.renderComponent('button', {
      variants: 'loader',
    });

    expect(iconsSpy.occurrences[0].iconType).toBe('loader');
  });

  it('has `chevron` icon when `variants` contains "mobile"', () => {
    const faker = templateFaker();
    const iconsSpy = faker.spy('icons');

    faker.renderComponent('button', {
      variants: 'mobile',
    });

    expect(iconsSpy.occurrences[0].iconType).toBe('chevron');
  });

  it('has provided variant style classes when `variants` contains "timer"', () => {
    const $ = cheerio.load(
      renderComponent('button', {
        variants: 'timer',
      }),
    );

    expect($('.ons-btn').hasClass('ons-js-timer')).toBe(true);
    expect($('.ons-btn').hasClass('ons-js-submit-btn')).toBe(true);
  });

  it('has additionally provided style classes', () => {
    const $ = cheerio.load(
      renderComponent('button', {
        classes: 'extra-class another-extra-class',
      }),
    );

    expect($('.ons-btn').hasClass('extra-class')).toBe(true);
    expect($('.ons-btn').hasClass('another-extra-class')).toBe(true);
  });

  it('has additionally provided inner style classes', () => {
    const $ = cheerio.load(
      renderComponent('button', {
        innerClasses: 'extra-inner-class another-extra-inner-class',
      }),
    );

    expect($('.ons-btn__inner').hasClass('extra-inner-class')).toBe(true);
    expect($('.ons-btn__inner').hasClass('another-extra-inner-class')).toBe(true);
  });

  it('has label text when `text` is provided', () => {
    const $ = cheerio.load(
      renderComponent('button', {
        text: 'Click > me!',
      }),
    );

    expect($('.ons-btn__text').html()).toBe('Click &gt; me!');
  });

  it('has label text when `html` is provided', () => {
    const $ = cheerio.load(
      renderComponent('button', {
        html: 'Click <strong>me</strong>!',
      }),
    );

    expect($('.ons-btn__text').html()).toBe('Click <strong>me</strong>!');
  });

  it('has button context text when `buttonContext` is provided', () => {
    const $ = cheerio.load(
      renderComponent('button', {
        buttonContext: 'button context text',
      }),
    );

    expect($('.ons-btn__context').text()).toBe('button context text');
  });

  it('has custom icon before button text', () => {
    const $ = cheerio.load(
      renderComponent('button', {
        text: 'Click me!',
        iconPosition: 'before',
        iconType: 'exit',
      }),
    );

    expect($('.ons-svg-icon + .ons-btn__text').text()).toBe('Click me!');
  });

  it('has custom icon after button text', () => {
    const $ = cheerio.load(
      renderComponent('button', {
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

  describe('mode: standard', () => {
    it('passes jest-axe checks', async () => {
      const $ = cheerio.load(
        renderComponent('button', {
          text: 'Example button',
          name: 'example',
          value: 'example-value',
        }),
      );

      const results = await axe($.html());
      expect(results).toHaveNoViolations();
    });

    it('is an `button` element', () => {
      const $ = cheerio.load(renderComponent('button'));

      expect($('button').length).toBe(1);
    });

    it('has the provided `type` attribute', () => {
      const $ = cheerio.load(
        renderComponent('button', {
          type: 'special-type',
        }),
      );

      expect($('button').attr('type')).toBe('special-type');
    });

    it('has the provided `type` attribute even if print variant is provided', () => {
      const $ = cheerio.load(
        renderComponent('button', {
          type: 'special-type',
          variants: 'print',
        }),
      );

      expect($('button').attr('type')).toBe('special-type');
    });

    it('defaults to being a "submit" button when `type` is not provided', () => {
      const $ = cheerio.load(renderComponent('button'));

      expect($('button').attr('type')).toBe('submit');
    });

    it('defaults to being a "button" when `type` is not provided and `variants` contains "print"', () => {
      const $ = cheerio.load(
        renderComponent('button', {
          variants: 'print',
        }),
      );

      expect($('button').attr('type')).toBe('button');
    });

    it('has the provided `value` attribute', () => {
      const $ = cheerio.load(
        renderComponent('button', {
          value: 'special-value',
        }),
      );

      expect($('button').attr('value')).toBe('special-value');
    });

    it('has the provided `name` attribute', () => {
      const $ = cheerio.load(
        renderComponent('button', {
          name: 'special-name',
        }),
      );

      expect($('button').attr('name')).toBe('special-name');
    });
  });

  describe('mode: link', () => {
    it('passes jest-axe checks', async () => {
      const $ = cheerio.load(
        renderComponent('button', {
          text: 'Example button',
          name: 'example',
          value: 'example-value',
          url: 'http://example.com',
        }),
      );

      const results = await axe($.html());
      expect(results).toHaveNoViolations();
    });

    it('is an `a` element', () => {
      const $ = cheerio.load(
        renderComponent('button', {
          url: 'http://example.com',
        }),
      );

      expect($('a').length).toBe(1);
    });

    it('has expected style classes', () => {
      const $ = cheerio.load(
        renderComponent('button', {
          url: 'http://example.com',
        }),
      );

      expect($('a').hasClass('ons-btn')).toBe(true);
      expect($('.ons-btn').hasClass('ons-btn--link')).toBe(true);
      expect($('.ons-btn').hasClass('ons-js-submit-btn')).toBe(true);
    });

    it('has the provided link', () => {
      const $ = cheerio.load(
        renderComponent('button', {
          url: 'http://example.com',
        }),
      );

      expect($('a').attr('href')).toBe('http://example.com');
    });

    it('has `arrow-next` icon by default', () => {
      const faker = templateFaker();
      const iconsSpy = faker.spy('icons');

      faker.renderComponent('button', {
        url: 'http://example.com',
      });

      expect(iconsSpy.occurrences[0].iconType).toBe('arrow-next');
    });

    it('opens in a new window when `newWindow` is `true`', () => {
      const $ = cheerio.load(
        renderComponent('button', {
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

      faker.renderComponent('button', {
        url: 'http://example.com',
        newWindow: true,
      });

      expect(iconsSpy.occurrences[0].iconType).toBe('external-link');
    });

    it('has the `button` role', () => {
      const $ = cheerio.load(
        renderComponent('button', {
          url: 'http://example.com',
        }),
      );

      expect($('.ons-btn').attr('role')).toBe('button');
    });

    it('has a default new window description when `newWindow` is `true`', () => {
      const $ = cheerio.load(
        renderComponent('button', {
          url: 'http://example.com',
          newWindow: true,
        }),
      );

      expect($('.ons-btn__new-window-description').text()).toBe(' (opens in a new tab)');
    });

    it('has a custom new window description when `newWindow` is `true` and `newWindowDescription` is provided', () => {
      const $ = cheerio.load(
        renderComponent('button', {
          url: 'http://example.com',
          newWindow: true,
          newWindowDescription: 'custom opens in a new window text',
        }),
      );

      expect($('.ons-btn__new-window-description').text()).toBe(' (custom opens in a new window text)');
    });

    it('has the `download` attribute when `variants` contains "download"', () => {
      const $ = cheerio.load(
        renderComponent('button', {
          variants: 'download',
        }),
      );

      expect($('.ons-btn').attr('download')).toBeDefined();
    });

    it('does not have the `download` attribute when `variants` contains "download" and `removeDownloadAttribute` is `true`', () => {
      const $ = cheerio.load(
        renderComponent('button', {
          variants: 'download',
          removeDownloadAttribute: true,
        }),
      );

      expect($('.ons-btn').attr('download')).toBeUndefined();
    });
  });
});
