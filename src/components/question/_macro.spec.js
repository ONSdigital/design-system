/** @jest-environment jsdom */

import * as cheerio from 'cheerio';

import axe from '../../tests/helpers/axe';
import { renderComponent, templateFaker } from '../../tests/helpers/rendering';

const EXAMPLE_QUESTION_BASIC = {
  id: 'example-question',
  title: 'Question title',
  description: 'Question description',
};

const EXAMPLE_QUESTION_DEFINITION = {
  ...EXAMPLE_QUESTION_BASIC,
  definition: {
    id: 'definition-id',
    title: 'Definition title',
    content: '<p>Definition content</p>',
  },
};

const EXAMPLE_QUESTION_GUIDANCE = {
  ...EXAMPLE_QUESTION_BASIC,
  guidance: {
    content: '<span class="fake-content">Guidance content</span>',
    lists: [
      {
        listHeading: 'List heading 1',
        listLeadingLine: 'List leading line 1',
        itemsList: [{ text: 'Test item 1' }, { text: 'Test item 2' }],
      },
    ],
  },
};

const EXAMPLE_QUESTION_JUSTIFICATION = {
  ...EXAMPLE_QUESTION_BASIC,
  justification: {
    id: 'justification-id',
    title: 'Justification title',
    content: '<p>Justification content</p>',
  },
};

const EXAMPLE_QUESTION_BUTTON = {
  ...EXAMPLE_QUESTION_BASIC,
  submitButton: {
    id: 'button-id',
    variants: 'timer',
    text: 'Button text',
  },
};

const EXAMPLE_QUESTION_INSTRUCTION = {
  ...EXAMPLE_QUESTION_BASIC,
  instruction: 'Instruction text',
};

const EXAMPLE_QUESTION_LEGENDISQUESTIONTITLE = {
  ...EXAMPLE_QUESTION_BASIC,
  legendIsQuestionTitle: true,
};

const EXAMPLE_QUESTION_DESCRIPTION_FIRST = {
  ...EXAMPLE_QUESTION_BASIC,
  readDescriptionFirst: true,
};

describe('macro: question', () => {
  describe.each([
    ['with basic parameters', EXAMPLE_QUESTION_BASIC],
    ['with definition', EXAMPLE_QUESTION_DEFINITION],
    ['with guidance', EXAMPLE_QUESTION_GUIDANCE],
    ['with justification', EXAMPLE_QUESTION_JUSTIFICATION],
    ['with button', EXAMPLE_QUESTION_BUTTON],
    ['with instruction', EXAMPLE_QUESTION_INSTRUCTION],
    ['with `legendIsQuestionTitle`', EXAMPLE_QUESTION_LEGENDISQUESTIONTITLE],
    ['with `readDescriptionFirst`', EXAMPLE_QUESTION_DESCRIPTION_FIRST],
    [
      'with all options combined',
      {
        ...EXAMPLE_QUESTION_DEFINITION,
        ...EXAMPLE_QUESTION_GUIDANCE,
        ...EXAMPLE_QUESTION_JUSTIFICATION,
        ...EXAMPLE_QUESTION_BUTTON,
        ...EXAMPLE_QUESTION_INSTRUCTION,
        ...EXAMPLE_QUESTION_LEGENDISQUESTIONTITLE,
        ...EXAMPLE_QUESTION_DESCRIPTION_FIRST,
      },
    ],
  ])('mode: %s', (_, params) => {
    it('passes jest-axe checks with', async () => {
      const $ = cheerio.load(renderComponent('question', params));

      const results = await axe($.html());
      expect(results).toHaveNoViolations();
    });
  });

  describe('mode: with basic parameters', () => {
    it('has the `title` text', () => {
      const $ = cheerio.load(renderComponent('question', EXAMPLE_QUESTION_BASIC));

      expect(
        $('.ons-question__title')
          .text()
          .trim(),
      ).toBe('Question title');
    });

    it('has the provided `id` attribute', () => {
      const $ = cheerio.load(renderComponent('question', EXAMPLE_QUESTION_BASIC));

      expect($('.ons-question').attr('id')).toBe('example-question');
    });

    it('has additionally provided `attributes`', () => {
      const $ = cheerio.load(
        renderComponent('question', {
          ...EXAMPLE_QUESTION_BASIC,
          attributes: {
            a: 123,
            b: 456,
          },
        }),
      );

      expect($('.ons-question').attr('a')).toBe('123');
      expect($('.ons-question').attr('b')).toBe('456');
    });

    it('has additionally provided style classes', () => {
      const $ = cheerio.load(
        renderComponent('question', {
          ...EXAMPLE_QUESTION_BASIC,
          classes: 'extra-class another-extra-class',
        }),
      );

      expect($('.ons-question').hasClass('extra-class')).toBe(true);
      expect($('.ons-question').hasClass('another-extra-class')).toBe(true);
    });

    it('has the `description` text', () => {
      const $ = cheerio.load(renderComponent('question', EXAMPLE_QUESTION_BASIC));

      expect(
        $('.ons-question__description')
          .text()
          .trim(),
      ).toBe('Question description');
    });

    it('calls with content', () => {
      const $ = cheerio.load(renderComponent('question', { EXAMPLE_QUESTION_BASIC }, 'Example content...'));

      const content = $('.ons-question__answer')
        .text()
        .trim();
      expect(content).toEqual(expect.stringContaining('Example content...'));
    });
  });

  describe('mode: with definition', () => {
    it('outputs the expected details', () => {
      const faker = templateFaker();
      const detailsSpy = faker.spy('details');

      faker.renderComponent('question', EXAMPLE_QUESTION_DEFINITION);

      expect(detailsSpy.occurrences[0]).toHaveProperty('classes', 'ons-u-mb-m');
      expect(detailsSpy.occurrences[0]).toHaveProperty('id', 'definition-id');
      expect(detailsSpy.occurrences[0]).toHaveProperty('title', 'Definition title');
    });

    it('outputs the expected details call content', () => {
      const $ = cheerio.load(renderComponent('question', EXAMPLE_QUESTION_DEFINITION));

      expect($('.ons-details__content > p').text()).toBe('Definition content');
    });
  });

  describe('mode: with guidance', () => {
    it('outputs the expected panel', () => {
      const faker = templateFaker();
      const panelSpy = faker.spy('panel');

      faker.renderComponent('question', EXAMPLE_QUESTION_GUIDANCE);

      expect(panelSpy.occurrences[0]).toHaveProperty('classes', 'ons-question-guidance ons-u-mb-m');
    });

    it('outputs the expected panel call content', () => {
      const $ = cheerio.load(renderComponent('question', EXAMPLE_QUESTION_GUIDANCE));

      expect($('.ons-panel__body .fake-content').text()).toBe('Guidance content');
    });

    it('outputs the expected `listHeading`', () => {
      const $ = cheerio.load(renderComponent('question', EXAMPLE_QUESTION_GUIDANCE));

      expect($('.ons-question-guidance__list-heading').text()).toBe('List heading 1');
    });

    it('outputs the expected `listLeadingLine`', () => {
      const $ = cheerio.load(renderComponent('question', EXAMPLE_QUESTION_GUIDANCE));

      expect($('.ons-question-guidance__list-leading-line').text()).toBe('List leading line 1');
    });

    it('outputs the expected list', () => {
      const faker = templateFaker();
      const listSpy = faker.spy('lists');

      faker.renderComponent('question', EXAMPLE_QUESTION_GUIDANCE);

      expect(listSpy.occurrences[0].itemsList).toEqual([
        {
          text: 'Test item 1',
        },
        {
          text: 'Test item 2',
        },
      ]);
    });
  });

  describe('mode: with justification', () => {
    it('outputs the expected details', () => {
      const faker = templateFaker();
      const detailsSpy = faker.spy('details');

      faker.renderComponent('question', EXAMPLE_QUESTION_JUSTIFICATION);

      expect(detailsSpy.occurrences[0]).toHaveProperty('classes', 'ons-u-mb-m');
      expect(detailsSpy.occurrences[0]).toHaveProperty('id', 'justification-id');
      expect(detailsSpy.occurrences[0]).toHaveProperty('title', 'Justification title');
    });

    it('outputs the expected details call content', () => {
      const $ = cheerio.load(renderComponent('question', EXAMPLE_QUESTION_JUSTIFICATION));

      expect($('.ons-details__content > p').text()).toBe('Justification content');
    });
  });

  describe('mode: with button', () => {
    it('outputs the expected button', () => {
      const faker = templateFaker();
      const buttonSpy = faker.spy('button');

      faker.renderComponent('question', EXAMPLE_QUESTION_BUTTON);

      expect(buttonSpy.occurrences[0]).toHaveProperty('variants', 'timer');
      expect(buttonSpy.occurrences[0]).toHaveProperty('id', 'button-id');
      expect(buttonSpy.occurrences[0]).toHaveProperty('text', 'Button text');
    });
  });

  describe('mode: with instruction', () => {
    it('has the instruction text', () => {
      const $ = cheerio.load(renderComponent('question', EXAMPLE_QUESTION_INSTRUCTION));

      expect($('.ons-question__instruction').text()).toBe('Instruction text');
    });
  });

  describe('mode: with `legendIsQuestionTitle`', () => {
    it('has the expected `fieldset` output', () => {
      const faker = templateFaker();
      const fieldsetSpy = faker.spy('fieldset');

      faker.renderComponent('question', EXAMPLE_QUESTION_LEGENDISQUESTIONTITLE);

      expect(fieldsetSpy.occurrences[0]).toEqual({
        legendIsQuestionTitle: true,
        legend: 'Question title',
        description: 'Question description',
        legendClasses: undefined,
        legendTitleClasses: undefined,
      });
    });

    it('does not add the description style class', () => {
      const $ = cheerio.load(renderComponent('question', EXAMPLE_QUESTION_LEGENDISQUESTIONTITLE));

      expect($('.ons-question__description').length).toBe(0);
    });
  });

  describe('mode: with `readDescriptionFirst`', () => {
    it('has a description element visually hidden before the title', () => {
      const $ = cheerio.load(renderComponent('question', EXAMPLE_QUESTION_DESCRIPTION_FIRST));

      expect(
        $('.ons-question__title')
          .text()
          .trim(),
      ).toBe('Question description Question title');
    });

    it('has the visible description element with aria-hidden attribute', () => {
      const $ = cheerio.load(renderComponent('question', EXAMPLE_QUESTION_DESCRIPTION_FIRST));

      expect($('.ons-question__description--aria-hidden').attr('aria-hidden')).toBe('true');
    });
  });
});
