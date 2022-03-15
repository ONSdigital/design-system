import createNunjucksEnvironment from '../../../lib/rendering/create-nunjucks-environment';

const nunjucksEnvironment = createNunjucksEnvironment();

export function getMacroName(componentName) {
  return 'ons' + componentName.replace(/(^|-)([a-z])/g, (_1, _2, char) => char.toUpperCase());
}

export function renderTemplate(template) {
  return nunjucksEnvironment.renderString(template);
}

export function renderComponent(componentName, params = {}, children = null) {
  const macroName = getMacroName(componentName);
  if (!!children) {
    return renderTemplate(`
      {% from "components/${componentName}/_macro.njk" import ${macroName} %}
      {%- call ${macroName}(${JSON.stringify(params, null, 2)}) -%}
        ${Array.isArray(children) ? children.join('') : children}
      {%- endcall -%}
    `);
  } else {
    return renderTemplate(`
      {% from "components/${componentName}/_macro.njk" import ${macroName} %}
      {{- ${macroName}(${JSON.stringify(params, null, 2)}) -}}
    `);
  }
}

export async function setTestPage(path, template) {
  await page.goto(`http://localhost:${process.env.TEST_PORT}${path}`);

  const compositedTemplate = `
    {% extends 'layout/_template.njk' %}

    {% block body %}
      ${template}
    {% endblock %}
  `;

  const html = renderTemplate(compositedTemplate);

  await page.setContent(html, { waitUntil: 'domcontentloaded' });
}
