/** @jest-environment jsdom */

import * as cheerio from 'cheerio';

import axe from '../../tests/helpers/axe';
import { renderComponent, templateFaker } from '../../tests/helpers/rendering';

const EXAMPLE_MODAL_BASIC = {
  title: 'Modal title',
  body: 'Modal body text',
  btnText: 'Modal button',
};

describe('macro: modal', () => {
  it('passes jest-axe checks with', async () => {
    const $ = cheerio.load(renderComponent('modal', EXAMPLE_MODAL_BASIC));

    const results = await axe($.html());
    expect(results).toHaveNoViolations();
  });

  it('has expected `title`', () => {
    const $ = cheerio.load(renderComponent('modal', EXAMPLE_MODAL_BASIC));

    const title = $('.ons-modal__title')
      .html()
      .trim();
    expect(title).toBe('Modal title');
  });

  it('has expected `body`', () => {
    const $ = cheerio.load(renderComponent('modal', EXAMPLE_MODAL_BASIC));

    const title = $('.ons-modal__body')
      .html()
      .trim();
    expect(title).toBe('Modal body text');
  });

  it('has the default ID', () => {
    const $ = cheerio.load(renderComponent('modal', EXAMPLE_MODAL_BASIC));
    expect($('#dialog').length).toBe(1);
  });

  it('has the provided `id`', () => {
    const $ = cheerio.load(renderComponent('modal', { ...EXAMPLE_MODAL_BASIC, id: 'modal-id' }));
    expect($('#modal-id').length).toBe(1);
  });

  it('has the provided `classes`', () => {
    const $ = cheerio.load(renderComponent('modal', { ...EXAMPLE_MODAL_BASIC, classes: 'modal-class' }));
    expect($('.modal-class').length).toBe(1);
  });

  it('outputs the expected button', () => {
    const faker = templateFaker();
    const buttonSpy = faker.spy('button');

    faker.renderComponent('modal', EXAMPLE_MODAL_BASIC);

    expect(buttonSpy.occurrences[0]).toHaveProperty('text', 'Modal button');
  });

  it('calls with content', () => {
    const $ = cheerio.load(renderComponent('modal', { EXAMPLE_MODAL_BASIC }, 'Example content...'));

    const content = $('.ons-modal__body')
      .text()
      .trim();
    expect(content).toBe('Example content...');
  });

  it('has additionally provided `attributes`', () => {
    const $ = cheerio.load(
      renderComponent('modal', {
        ...EXAMPLE_MODAL_BASIC,
        attributes: {
          a: 123,
          b: 456,
        },
      }),
    );

    expect($('.ons-modal').attr('a')).toBe('123');
    expect($('.ons-modal').attr('b')).toBe('456');
  });
});
