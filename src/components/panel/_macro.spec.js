/** @jest-environment jsdom */

import * as cheerio from 'cheerio';

import axe from '../../tests/helpers/axe';
import { renderComponent, templateFaker } from '../../tests/helpers/rendering';

const EXAMPLE_PANEL_BASIC = {
  id: 'panel',
  body: 'Some panel text',
};

describe('macro: panel', () => {
  describe.each([
    ['info', 'Important information:'],
    ['bare', 'Important information:'],
    ['error', 'Error:'],
    ['warn', 'Warning:'],
    ['warn-branded', 'Warning:'],
    ['branded', 'Important information:'],
    ['success', 'Completed:'],
    ['announcement', 'Announcement:'],
  ])('mode: %s', (panelType, accessibleText) => {
    it('passes jest-axe checks', async () => {
      const $ = cheerio.load(
        renderComponent('panel', {
          ...EXAMPLE_PANEL_BASIC,
          type: panelType,
        }),
      );
      const results = await axe($.html());
      expect(results).toHaveNoViolations();
    });

    it('has correct class', () => {
      const $ = cheerio.load(
        renderComponent('panel', {
          ...EXAMPLE_PANEL_BASIC,
          type: panelType,
        }),
      );

      expect($('.ons-panel').hasClass(`ons-panel--${panelType}`)).toBe(true);
    });

    it('has the provided `body` text', () => {
      const $ = cheerio.load(
        renderComponent('panel', {
          ...EXAMPLE_PANEL_BASIC,
          type: panelType,
        }),
      );

      expect(
        $('.ons-panel__body')
          .text()
          .trim(),
      ).toBe('Some panel text');
    });

    it('calls with content', () => {
      const $ = cheerio.load(renderComponent('panel', { EXAMPLE_PANEL_BASIC, type: panelType }, 'Example content...'));

      const content = $('.ons-panel__body')
        .text()
        .trim();
      expect(content).toBe('Example content...');
    });

    it('has the provided `id` attribute', () => {
      const $ = cheerio.load(
        renderComponent('panel', {
          ...EXAMPLE_PANEL_BASIC,
          type: panelType,
        }),
      );

      expect($('#panel').length).toBe(1);
    });

    it('has custom classes applied', () => {
      const $ = cheerio.load(
        renderComponent('panel', {
          ...EXAMPLE_PANEL_BASIC,
          type: panelType,
          classes: 'ons-custom-class',
        }),
      );

      expect($('.ons-panel').hasClass('ons-custom-class')).toBe(true);
    });

    it('has additionally provided `attributes`', () => {
      const $ = cheerio.load(
        renderComponent('panel', {
          ...EXAMPLE_PANEL_BASIC,
          type: panelType,
          attributes: {
            a: '123',
            b: '456',
          },
        }),
      );
      expect($('.ons-panel').attr('a')).toBe('123');
      expect($('.ons-panel').attr('b')).toBe('456');
    });

    it('has visually hidden accessible element', () => {
      const $ = cheerio.load(
        renderComponent('panel', {
          ...EXAMPLE_PANEL_BASIC,
          type: panelType,
        }),
      );

      expect($('.ons-panel__assistive-text').length).toBe(1);
    });

    it('has the default visually hidden accessible text', () => {
      const $ = cheerio.load(
        renderComponent('panel', {
          ...EXAMPLE_PANEL_BASIC,
          type: panelType,
        }),
      );

      expect(
        $('.ons-panel__assistive-text')
          .text()
          .trim(),
      ).toBe(accessibleText);
    });

    it('has the provided visually hidden accessible text', () => {
      const $ = cheerio.load(
        renderComponent('panel', {
          ...EXAMPLE_PANEL_BASIC,
          type: panelType,
          assistiveTextPrefix: 'Some helpful text:',
        }),
      );

      expect(
        $('.ons-panel__assistive-text')
          .text()
          .trim(),
      ).toBe('Some helpful text:');
    });
  });

  describe('mode: info', () => {
    it('has the default title tag', () => {
      const $ = cheerio.load(
        renderComponent('panel', {
          ...EXAMPLE_PANEL_BASIC,
          title: 'Panel title',
        }),
      );

      const titleTag = $('.ons-panel__title')[0].tagName;
      expect(titleTag).toBe('div');
    });

    it('has the provided `titleTag`', () => {
      const $ = cheerio.load(
        renderComponent('panel', {
          ...EXAMPLE_PANEL_BASIC,
          title: 'Panel title',
          titleTag: 'h3',
        }),
      );

      const titleTag = $('.ons-panel__title')[0].tagName;
      expect(titleTag).toBe('h3');
    });

    it('has the provided `title` text', () => {
      const $ = cheerio.load(
        renderComponent('panel', {
          ...EXAMPLE_PANEL_BASIC,
          title: 'Panel title',
        }),
      );

      const titleText = $('.ons-panel__title').text();
      expect(titleText).toBe('Panel title');
    });
  });

  describe.each([
    ['error', 'h2'],
    ['success', 'div'],
  ])('mode: %s', (panelType, tagEl) => {
    it('has the default id set', () => {
      const $ = cheerio.load(
        renderComponent('panel', {
          ...EXAMPLE_PANEL_BASIC,
          title: 'Title',
          type: panelType,
        }),
      );

      expect($('#alert').length).toBe(1);
    });

    it('has the correct default title tag', () => {
      const $ = cheerio.load(
        renderComponent('panel', {
          ...EXAMPLE_PANEL_BASIC,
          title: 'Title',
          type: panelType,
        }),
      );

      const titleTag = $('.ons-panel__title')[0].tagName;
      expect(titleTag).toBe(tagEl);
    });

    it('has aria-labelledby attribute set with default value', () => {
      const $ = cheerio.load(
        renderComponent('panel', {
          ...EXAMPLE_PANEL_BASIC,
          title: 'Title',
          type: panelType,
        }),
      );

      expect($('.ons-panel').attr('aria-labelledby')).toBe('alert');
    });

    it('has the role attribute set to alert', () => {
      const $ = cheerio.load(
        renderComponent('panel', {
          ...EXAMPLE_PANEL_BASIC,
          title: 'Title',
          type: panelType,
        }),
      );

      expect($('.ons-panel').attr('role')).toBe('alert');
    });

    it('has the tabindex attribute set to -1', () => {
      const $ = cheerio.load(
        renderComponent('panel', {
          ...EXAMPLE_PANEL_BASIC,
          title: 'Title',
          type: panelType,
        }),
      );

      expect($('.ons-panel').attr('tabindex')).toBe('-1');
    });

    it('has the autofocus attribute set to autofocus', () => {
      const $ = cheerio.load(
        renderComponent('panel', {
          ...EXAMPLE_PANEL_BASIC,
          title: 'Title',
          type: panelType,
        }),
      );

      expect($('.ons-panel').attr('autofocus')).toBe('autofocus');
    });

    it('does not have the autofocus attribute set if `isDesignSystemExample` is provided', () => {
      const isDesignSystemExample = true;

      const $ = cheerio.load(
        renderComponent(
          'panel',
          {
            ...EXAMPLE_PANEL_BASIC,
            title: 'Title',
            type: panelType,
          },
          null,
          null,
          isDesignSystemExample,
        ),
      );

      expect($('.ons-panel').attr('autofocus')).toBe(undefined);
    });
  });

  describe('mode: spacious', () => {
    it('has the correct class set', () => {
      const $ = cheerio.load(
        renderComponent('panel', {
          ...EXAMPLE_PANEL_BASIC,
          spacious: true,
        }),
      );

      expect($('.ons-panel').hasClass('ons-panel--spacious')).toBe(true);
    });
  });

  describe('mode: announcement', () => {
    it('creates containers with the correct classes', () => {
      const $ = cheerio.load(
        renderComponent('panel', {
          ...EXAMPLE_PANEL_BASIC,
          type: 'announcement',
        }),
      );

      expect($('.ons-announcement').length).toBe(1);
      expect($('.ons-container').length).toBe(1);
    });

    it('has `arrow-forward` icon', () => {
      const faker = templateFaker();
      const iconsSpy = faker.spy('icons');

      faker.renderComponent('panel', {
        ...EXAMPLE_PANEL_BASIC,
        type: 'announcement',
      });

      expect(iconsSpy.occurrences[0].iconType).toBe('arrow-forward');
    });
  });

  describe('mode: warn', () => {
    it('has a default "!" prefix', () => {
      const $ = cheerio.load(
        renderComponent('panel', {
          ...EXAMPLE_PANEL_BASIC,
          type: 'warn',
        }),
      );

      expect(
        $('.ons-panel__icon')
          .text()
          .trim(),
      ).toBe('!');
    });
  });

  describe('mode: warn-branded', () => {
    it('creates a container div', () => {
      const $ = cheerio.load(
        renderComponent('panel', {
          ...EXAMPLE_PANEL_BASIC,
          type: 'warn-branded',
        }),
      );

      expect($('.ons-branded-warning').length).toBe(1);
      expect($('.ons-container').length).toBe(1);
    });

    it('has a default "!" prefix', () => {
      const $ = cheerio.load(
        renderComponent('panel', {
          ...EXAMPLE_PANEL_BASIC,
          type: 'warn-branded',
        }),
      );

      expect(
        $('.ons-panel__icon')
          .text()
          .trim(),
      ).toBe('!');
    });
  });

  describe('mode: custom icon', () => {
    it('passes jest-axe checks', async () => {
      const $ = cheerio.load(
        renderComponent('panel', {
          ...EXAMPLE_PANEL_BASIC,
          iconType: 'check',
        }),
      );

      const results = await axe($.html());
      expect(results).toHaveNoViolations();
    });

    it('has a custom icon `iconType`', () => {
      const faker = templateFaker();
      const iconsSpy = faker.spy('icons');

      faker.renderComponent('panel', {
        ...EXAMPLE_PANEL_BASIC,
        iconType: 'check',
      });

      expect(iconsSpy.occurrences[0].iconType).toBe('check');
    });

    it('has the default icon size set', () => {
      const $ = cheerio.load(
        renderComponent('panel', {
          ...EXAMPLE_PANEL_BASIC,
          iconType: 'check',
        }),
      );

      expect($('.ons-panel__icon').hasClass('ons-u-fs-r')).toBe(true);
    });

    it.each(['r', 'm', 'l', 'xl'])('has the correct class for the provided `iconSize` override (%s)', customIconSize => {
      const $ = cheerio.load(
        renderComponent('panel', {
          ...EXAMPLE_PANEL_BASIC,
          iconType: 'check',
          iconSize: customIconSize,
        }),
      );

      expect($('.ons-panel__icon').hasClass(`ons-u-fs-${customIconSize}`)).toBe(true);
    });
  });
});
