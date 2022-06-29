/** @jest-environment jsdom */

import * as cheerio from 'cheerio';

import axe from '../../tests/helpers/axe';
import { renderComponent, templateFaker } from '../../tests/helpers/rendering';

const EXAMPLE_UPLOAD = {
  id: 'example-upload',
  accept: '.xls,.xlsx,.pdf',
  name: 'example-upload-name',
  label: {
    description: 'File types accepted are XLS and XLSX or PDF',
    text: 'Upload a file',
  },
  dontWrap: true,
  fieldId: 'example-upload-field',
  fieldClasses: 'extra-field-class',
  attributes: { a: 42 },
  listeners: { test: 'console.log(42)' },
};

const EXAMPLE_UPLOAD_WITH_ERROR = {
  ...EXAMPLE_UPLOAD,
  error: {
    id: 'file-error',
    text: 'Select a file that is an XLS, XLSX or PDF',
  },
};

describe('macro: upload', () => {
  describe.each([
    ['without error', EXAMPLE_UPLOAD, 'ons-input--upload'],
    ['with error', EXAMPLE_UPLOAD_WITH_ERROR, 'ons-input--upload ons-input--error'],
  ])('%s', (_, params, expectedInputClasses) => {
    it('passes jest-axe checks', async () => {
      const $ = cheerio.load(renderComponent('upload', params));

      const results = await axe($.html());
      expect(results).toHaveNoViolations();
    });

    it('renders `field` component with the expected parameters', () => {
      const faker = templateFaker();
      const fieldSpy = faker.spy('field');

      faker.renderComponent('upload', params);

      expect(fieldSpy.occurrences).toContainEqual({
        id: 'example-upload-field',
        classes: 'extra-field-class',
        dontWrap: true,
        error: params.error,
      });
    });

    it('renders `input` component with the expected parameters', () => {
      const faker = templateFaker();
      const inputSpy = faker.spy('input');

      faker.renderComponent('upload', params);

      expect(inputSpy.occurrences).toContainEqual({
        id: 'example-upload',
        type: 'file',
        label: params.label,
        classes: expectedInputClasses,
        accept: '.xls,.xlsx,.pdf',
        name: 'example-upload-name',
        attributes: { a: 42 },
        listeners: params.listeners,
      });
    });
  });
});
