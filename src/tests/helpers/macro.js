import * as cheerio from 'cheerio';

import createNunjucksEnvironment from '../../../lib/rendering/create-nunjucks-environment';

const nunjucksEnvironment = createNunjucksEnvironment();

export function getComponentMacroName(componentName) {
  return 'ons' + componentName.replace(/(^|-)([a-z])/g, (_1, _2, char) => char.toUpperCase());
}

export function render(template) {
  const html = nunjucksEnvironment.renderString(template);
  return cheerio.load(html);
}

export function renderComponent(componentName, params = {}, children = null) {
  const macroName = getComponentMacroName(componentName);
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
