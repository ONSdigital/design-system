import * as helper from '../../tests/helpers/rendering';

describe('getComponentInfo(componentName)', () => {
  it('gets information about a component that does not have explicit configuration', () => {
    const info = helper.getComponentInfo('fake-component');

    expect(info.macroName).toBe('onsFakeComponent');
  });

  // If this test fails it likely means that the component was removed or renamed in the
  // '/config/components.json' file. To make this test pass please use the new component
  // name here or pick a different example from the configuration file.
  it('gets information about a component that has explicit configuration', () => {
    const info = helper.getComponentInfo('access-code');

    expect(info.macroName).toBe('onsUACInput');
  });
});

describe('getMacroName(componentName)', () => {
  it('gets name of a component that does not have explicit configuration', () => {
    const macroName = helper.getMacroName('fake-component');

    expect(macroName).toBe('onsFakeComponent');
  });

  // If this test fails it likely means that the component was removed or renamed in the
  // '/config/components.json' file. To make this test pass please use the new component
  // name here or pick a different example from the configuration file.
  it('gets name of a component that has explicit configuration', () => {
    const macroName = helper.getMacroName('access-code');

    expect(macroName).toBe('onsUACInput');
  });
});

describe('renderTemplate(template)', () => {
  it('renders the provided template', () => {
    const result = helper.renderTemplate(`
      {%- for value in [1, 2, 3] -%}
        {{ value }}
      {%- endfor -%}
    `);

    expect(result).toBe(`123`);
  });

  it('imports a component macro when rendering the provided template', () => {
    const result = helper.renderTemplate(`
      {% from "components/button/_macro.njk" import onsButton %}

      {{
        onsButton({
          text: 'Click me!'
        })
      }}
    `);

    expect(result).toContain('Click me!');
  });
});

describe('renderComponent(componentName, params, children)', () => {
  it('renders a named component', () => {
    const result = helper.renderComponent('panel', {
      body: 'Panel body text...',
    });

    expect(result).toContain('Panel body text...');
  });

  it('renders a named component by calling it with a nested value', () => {
    const result = helper.renderComponent('panel', {}, 'Some nested value...');

    expect(result).toContain('Some nested value...');
  });

  it('renders a named component by calling it with multiple nested values', () => {
    const result = helper.renderComponent('panel', {}, ['First nested value...', 'Second nested value...']);

    expect(result).toContain('First nested value...');
    expect(result).toContain('Second nested value...');
  });
});

describe('templateFaker()', () => {
  it('overrides macro template with a fake when rendering template', () => {
    const faker = helper.templateFaker();
    faker.setFake(
      'button',
      `
      {% macro onsButton(params) %}
        FAKE BUTTON
      {% endmacro %}
    `,
    );

    const result = faker.renderTemplate(`
      {% from "components/button/_macro.njk" import onsButton %}

      {{
        onsButton({
          text: 'Click me!'
        })
      }}
    `);

    expect(result.trim()).toBe('FAKE BUTTON');
  });

  it('overrides macro template with a fake when rendering component', () => {
    const faker = helper.templateFaker();
    faker.setFake(
      'button',
      `
      {% macro onsButton(params) %}
        FAKE BUTTON
      {% endmacro %}
    `,
    );

    const result = faker.renderComponent('button', {
      text: 'Click me!',
    });

    expect(result.trim()).toBe('FAKE BUTTON');
  });

  it('still renders component output when component is being spied on', () => {
    const faker = helper.templateFaker();

    /*const buttonSpy =*/ faker.spy('button');

    const result = faker.renderTemplate(`
      {% from "components/button/_macro.njk" import onsButton %}

      {{
        onsButton({
          text: 'Test Button A'
        })
      }}
    `);

    expect(result).toContain('Test Button A');
  });
});
