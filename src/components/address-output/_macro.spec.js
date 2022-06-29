/** @jest-environment jsdom */

import * as cheerio from 'cheerio';

import axe from '../../tests/helpers/axe';
import { renderComponent } from '../../tests/helpers/rendering';

const EXAMPLE_ADDRESS_OUTPUT_FULL = {
  unit: 'Unit 5',
  organisation: 'Trescos',
  line1: 'Abingdon Road',
  line2: 'Goathill',
  town: 'Barry',
  postcode: 'AB12 6UH',
};

const EXAMPLE_ADDRESS_OUTPUT_NONE = {};

describe('macro: address-output', () => {
  it('passes jest-axe checks', async () => {
    const $ = cheerio.load(renderComponent('address-output', EXAMPLE_ADDRESS_OUTPUT_FULL));

    const results = await axe($.html());
    expect(results).toHaveNoViolations();
  });

  it('has additionally provided container style classes', () => {
    const $ = cheerio.load(
      renderComponent('address-output', {
        ...EXAMPLE_ADDRESS_OUTPUT_FULL,
        classes: 'extra-class another-extra-class',
      }),
    );

    expect($('.ons-address-output').hasClass('extra-class')).toBe(true);
    expect($('.ons-address-output').hasClass('another-extra-class')).toBe(true);
  });

  it('renders no lines when no parameters are provided', () => {
    const $ = cheerio.load(renderComponent('address-output', EXAMPLE_ADDRESS_OUTPUT_NONE));

    expect($('.ons-address-output__lines *').length).toBe(0);
  });

  it.each([
    ['all address lines', EXAMPLE_ADDRESS_OUTPUT_FULL],
    ['single line', { unit: 'Unit 5' }],
  ])('renders `unit` with %s', (_, params) => {
    const $ = cheerio.load(renderComponent('address-output', params));

    expect(
      $('.ons-address-output__unit')
        .text()
        .trim(),
    ).toBe('Unit 5');
  });

  it.each([
    ['all address lines', EXAMPLE_ADDRESS_OUTPUT_FULL],
    ['single line', { organisation: 'Trescos' }],
  ])('renders `organisation` with %s', (_, params) => {
    const $ = cheerio.load(renderComponent('address-output', params));

    expect(
      $('.ons-address-output__organisation')
        .text()
        .trim(),
    ).toBe('Trescos');
  });

  it.each([
    ['all address lines', EXAMPLE_ADDRESS_OUTPUT_FULL],
    ['single line', { line1: 'Abingdon Road' }],
  ])('renders `line1` with %s', (_, params) => {
    const $ = cheerio.load(renderComponent('address-output', params));

    expect(
      $('.ons-address-output__line1')
        .text()
        .trim(),
    ).toBe('Abingdon Road');
  });

  it.each([
    ['all address lines', EXAMPLE_ADDRESS_OUTPUT_FULL],
    ['single line', { line2: 'Goathill' }],
  ])('renders `line2` with %s', (_, params) => {
    const $ = cheerio.load(renderComponent('address-output', params));

    expect(
      $('.ons-address-output__line2')
        .text()
        .trim(),
    ).toBe('Goathill');
  });

  it.each([
    ['all address lines', EXAMPLE_ADDRESS_OUTPUT_FULL],
    ['single line', { town: 'Barry' }],
  ])('renders `town` with %s', (_, params) => {
    const $ = cheerio.load(renderComponent('address-output', params));

    expect(
      $('.ons-address-output__town')
        .text()
        .trim(),
    ).toBe('Barry');
  });

  it.each([
    ['all address lines', EXAMPLE_ADDRESS_OUTPUT_FULL],
    ['single line', { postcode: 'AB12 6UH' }],
  ])('renders `postcode` with %s', (_, params) => {
    const $ = cheerio.load(renderComponent('address-output', params));

    expect(
      $('.ons-address-output__postcode')
        .text()
        .trim(),
    ).toBe('AB12 6UH');
  });
});
