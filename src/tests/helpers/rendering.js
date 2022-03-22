import nunjucks from 'nunjucks';

import createNunjucksEnvironment from '../../../lib/rendering/create-nunjucks-environment';
import componentConfig from '../../../config/components.json';
import FakeNunjucksLoader from './fake-nunjucks-loader';

const templatePaths = ['src', 'src/views'];
const realTemplateLoader = new nunjucks.FileSystemLoader(templatePaths);
realTemplateLoader.on = null;

export function getComponentInfo(componentName) {
  const info = componentConfig[componentName] ?? {};
  if (!info.macroName) {
    info.macroName = 'ons' + componentName.replace(/(^|-)([a-z])/g, (_1, _2, char) => char.toUpperCase());
  }
  return info;
}

export function getMacroName(componentName) {
  return getComponentInfo(componentName).macroName;
}

export function renderTemplate(template, fakerContext = null) {
  const fakeNunjucksLoader = new FakeNunjucksLoader();
  fakeNunjucksLoader.fakeTemplateMap = fakerContext?._fakeTemplateMap;

  const nunjucksEnvironment = createNunjucksEnvironment([fakeNunjucksLoader, realTemplateLoader]);

  if (!!fakerContext) {
    nunjucksEnvironment.addFilter('spy', fakerContext.spyFilter.bind(fakerContext));
  }

  return nunjucksEnvironment.renderString(template);
}

export function renderComponent(componentName, params = {}, children = null, fakerContext = null) {
  const macroName = getMacroName(componentName);
  if (!!children) {
    return renderTemplate(
      `
      {% from "components/${componentName}/_macro.njk" import ${macroName} %}
      {%- call ${macroName}(${JSON.stringify(params, null, 2)}) -%}
        ${Array.isArray(children) ? children.join('') : children}
      {%- endcall -%}
    `,
      fakerContext,
    );
  } else {
    return renderTemplate(
      `
      {% from "components/${componentName}/_macro.njk" import ${macroName} %}
      {{- ${macroName}(${JSON.stringify(params, null, 2)}) -}}
    `,
      fakerContext,
    );
  }
}

export function templateFaker() {
  return new TemplateFakerContext();
}

export class TemplateFakerContext {
  constructor() {
    this._fakeTemplateMap = {};
    this._spiedOutputs = {};
  }

  spyFilter(value, componentName) {
    if (this._spiedOutputs[componentName]) {
      this._spiedOutputs[componentName].occurrences.push(value);
    }
    return value;
  }

  setFake(componentName, template) {
    const macroTemplatePath = `components/${componentName}/_macro.njk`;
    this._fakeTemplateMap[macroTemplatePath] = template;
  }
  spy(componentName) {
    const macroTemplatePath = `components/${componentName}/_macro.njk`;
    const originalMacroTemplate = realTemplateLoader.getSource(macroTemplatePath).src;

    const spy = `{% set __SPY__ = params|spy('${componentName}') %}`;
    const fakeMacroTemplate = originalMacroTemplate.replace(/\{%\s*macro.+?%\}/, match => `${match}${spy}`);
    this.setFake(componentName, fakeMacroTemplate);

    if (!this._spiedOutputs[componentName]) {
      this._spiedOutputs[componentName] = {
        occurrences: [],
      };
    }
    return this._spiedOutputs[componentName];
  }
  renderTemplate(template) {
    return renderTemplate(template, this);
  }
  renderComponent(componentName, params, children) {
    return renderComponent(componentName, params, children, this);
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
