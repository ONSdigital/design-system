import * as cheerio from 'cheerio';

import createNunjucksEnvironment from '../../../lib/rendering/create-nunjucks-environment';

const nunjucksEnvironment = createNunjucksEnvironment();

function render(template) {
  const html = nunjucksEnvironment.renderString(template);
  return cheerio.load(html);
}

function renderComponent(componentName, params = {}, children = null) {
  const macroName = 'ons' + componentName.replace(/(^|-)([a-z])/g, (_1, _2, char) => char.toUpperCase());
  if (!!children) {
    return render(`
      {% from "components/${componentName}/_macro.njk" import ${macroName} %}
      {%- call ${macroName}(${JSON.stringify(params, null, 2)}) -%}
        ${children}
      {%- endcall -%}
    `);
  } else {
    return render(`
      {% from "components/${componentName}/_macro.njk" import ${macroName} %}
      {{- ${macroName}(${JSON.stringify(params, null, 2)}) -}}
    `);
  }
}

describe('component macro: button', () => {
  it('has the provided `id` attribute', () => {
    const $ = renderComponent('button', {
      id: 'example-id',
    });

    expect($('#example-id').length).toBe(1);
  });

  it('is an `a` element when `dsExample` is truthy', () => {
    const $ = renderComponent('button', {
      dsExample: true,
    });

    expect($('a').length).toBe(1);
  });

  it('has additionally provided `attributes`', () => {
    const $ = renderComponent('button', {
      attributes: {
        a: 123,
        b: 456,
      },
    });

    expect($('button').attr('a')).toBe('123');
    expect($('button').attr('b')).toBe('456');
  });

  it('has expected style classes', () => {
    const $ = renderComponent('button');

    expect($('.ons-btn .ons-btn__inner').length).toBe(1);
  });

  it('has provided variant style classes', () => {
    const $ = renderComponent('button', {
      variants: ['variant-a', 'variant-b'],
    });

    expect($('.ons-btn').hasClass('ons-btn--variant-a')).toBe(true);
    expect($('.ons-btn').hasClass('ons-btn--variant-b')).toBe(true);
  });

  it('has provided variant style classes when `buttonStyle` is "print"', () => {
    const $ = renderComponent('button', {
      buttonStyle: 'print',
    });

    expect($('.ons-btn').hasClass('ons-btn--print')).toBe(true);
    expect($('.ons-btn').hasClass('ons-u-d-no')).toBe(true);
    expect($('.ons-btn').hasClass('ons-js-print-btn')).toBe(true);
  });

  it('has provided variant style classes when `submitType` is "loader"', () => {
    const $ = renderComponent('button', {
      submitType: 'loader',
    });

    expect($('.ons-btn').hasClass('ons-btn--loader')).toBe(true);
    expect($('.ons-btn').hasClass('ons-js-loader')).toBe(true);
    expect($('.ons-btn').hasClass('ons-js-submit-btn')).toBe(true);
  });

  it('has provided variant style classes when `submitType` is "timer"', () => {
    const $ = renderComponent('button', {
      submitType: 'timer',
    });

    expect($('.ons-btn').hasClass('ons-js-timer')).toBe(true);
    expect($('.ons-btn').hasClass('ons-js-submit-btn')).toBe(true);
  });

  it('has additionally provided style classes', () => {
    const $ = renderComponent('button', {
      classes: 'extra-class another-extra-class',
    });

    expect($('.ons-btn').hasClass('extra-class')).toBe(true);
    expect($('.ons-btn').hasClass('another-extra-class')).toBe(true);
  });

  it('has additionally provided inner style classes', () => {
    const $ = renderComponent('button', {
      innerClasses: 'extra-inner-class another-extra-inner-class',
    });

    expect($('.ons-btn__inner').hasClass('extra-inner-class')).toBe(true);
    expect($('.ons-btn__inner').hasClass('another-extra-inner-class')).toBe(true);
  });

  it('has label text when `text` is provided', () => {
    const $ = renderComponent('button', {
      text: 'Click > me!',
    });

    expect($('.ons-btn__text').html()).toBe('Click &gt; me!');
  });

  it('has label text when `html` is provided', () => {
    const $ = renderComponent('button', {
      html: 'Click <strong>me</strong>!',
    });

    expect($('.ons-btn__text').html()).toBe('Click <strong>me</strong>!');
  });

  it('has button context text when `buttonContext` is provided', () => {
    const $ = renderComponent('button', {
      buttonContext: 'button context text',
    });

    expect($('.ons-btn__context').text()).toBe('button context text');
  });

  it('has custom icon before button text', () => {
    const $ = renderComponent('button', {
      text: 'Click me!',
      iconPosition: 'before',
      iconType: 'exit',
    });

    expect($('.ons-svg-icon + .ons-btn__text').text()).toBe('Click me!');
  });

  it('has custom icon after button text', () => {
    const $ = renderComponent('button', {
      text: 'Click me!',
      iconPosition: 'after',
      iconType: 'exit',
    });

    expect(
      $('.ons-btn__text + .ons-svg-icon')
        .prev()
        .text(),
    ).toBe('Click me!');
  });

  describe('mode: standard', () => {
    it('is an `button` element', () => {
      const $ = renderComponent('button');

      expect($('button').length).toBe(1);
    });

    it('has the provided `type` attribute', () => {
      const $ = renderComponent('button', {
        type: 'special-type',
      });

      expect($('button').attr('type')).toBe('special-type');
    });

    it('has the provided `type` attribute even if `buttonStyle` is provided', () => {
      const $ = renderComponent('button', {
        type: 'special-type',
        buttonStyle: 'print',
      });

      expect($('button').attr('type')).toBe('special-type');
    });

    it('defaults to being a "submit" button when `type` is not provided', () => {
      const $ = renderComponent('button');

      expect($('button').attr('type')).toBe('submit');
    });

    it('defaults to being a "button" when `type` is not provided and `buttonStyle` is set to "print"', () => {
      const $ = renderComponent('button', {
        buttonStyle: 'print',
      });

      expect($('button').attr('type')).toBe('button');
    });

    it('has the provided `value` attribute', () => {
      const $ = renderComponent('button', {
        value: 'special-value',
      });

      expect($('button').attr('value')).toBe('special-value');
    });

    it('has the provided `name` attribute', () => {
      const $ = renderComponent('button', {
        name: 'special-name',
      });

      expect($('button').attr('name')).toBe('special-name');
    });
  });

  describe('mode: link', () => {
    it('is an `a` element', () => {
      const $ = renderComponent('button', {
        url: 'http://example.com',
      });

      expect($('a').length).toBe(1);
    });

    it('has expected style classes', () => {
      const $ = renderComponent('button', {
        url: 'http://example.com',
      });

      expect($('a').hasClass('ons-btn')).toBe(true);
      expect($('.ons-btn').hasClass('ons-btn--link')).toBe(true);
      expect($('.ons-btn').hasClass('ons-js-submit-btn')).toBe(true);
    });

    it('has download variant style class', () => {
      const $ = renderComponent('button', {
        url: 'http://example.com',
        buttonStyle: 'download',
      });

      expect($('.ons-btn').hasClass('ons-btn--download')).toBe(true);
    });

    it('has the provided link', () => {
      const $ = renderComponent('button', {
        url: 'http://example.com',
      });

      expect($('a').attr('href')).toBe('http://example.com');
    });

    it('opens in a new window when `newWindow` is `true`', () => {
      const $ = renderComponent('button', {
        url: 'http://example.com',
        newWindow: true,
      });

      expect($('a').attr('target')).toBe('_blank');
      expect($('a').attr('rel')).toBe('noopener');
    });

    it('has the `button` role', () => {
      const $ = renderComponent('button', {
        url: 'http://example.com',
      });

      expect($('.ons-btn').attr('role')).toBe('button');
    });

    it('has a default new window description when `newWindow` is `true`', () => {
      const $ = renderComponent('button', {
        url: 'http://example.com',
        newWindow: true,
      });

      expect($('.ons-btn__new-window-description').text()).toBe('opens in a new window');
    });

    it('has a custom new window description when `newWindow` is `true` and `newWindowDescription` is provided', () => {
      const $ = renderComponent('button', {
        url: 'http://example.com',
        newWindow: true,
        newWindowDescription: 'custom opens in a new window text',
      });

      expect($('.ons-btn__new-window-description').text()).toBe('custom opens in a new window text');
    });

    it('has the `download` attribute when `buttonStyle` is "download"', () => {
      const $ = renderComponent('button', {
        buttonStyle: 'download',
      });

      expect($('.ons-btn').attr('download')).toBeDefined();
    });

    it('does not have the `download` attribute when `buttonStyle` is "download" and `removeDownloadAttribute` is `true`', () => {
      const $ = renderComponent('button', {
        buttonStyle: 'download',
        removeDownloadAttribute: true,
      });

      expect($('.ons-btn').attr('download')).toBeUndefined();
    });
  });
});
