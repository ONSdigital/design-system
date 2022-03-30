import nunjucks from 'nunjucks';

import createNunjucksEnvironment from '../../../lib/rendering/create-nunjucks-environment';
import componentConfig from '../../../config/components.json';
import FakeNunjucksLoader from './fake-nunjucks-loader';

const templatePaths = ['src', 'src/views'];
const realTemplateLoader = new nunjucks.FileSystemLoader(templatePaths);
realTemplateLoader.on = null;

export function getComponentInfo(componentName) {
  const info = componentConfig[componentName] ?? {};
  if (!info.templateName) {
    info.templateName = `components/${componentName}/_macro.njk`;
  }
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
  const info = getComponentInfo(componentName);
  if (!!children) {
    return renderTemplate(
      `
      {% from "${info.templateName}" import ${info.macroName} %}
      {%- call ${info.macroName}(${JSON.stringify(params, null, 2)}) -%}
        ${Array.isArray(children) ? children.join('') : children}
      {%- endcall -%}
    `,
      fakerContext,
    );
  } else {
    return renderTemplate(
      `
      {% from "${info.templateName}" import ${info.macroName} %}
      {{- ${info.macroName}(${JSON.stringify(params, null, 2)}) -}}
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

  #getSpiedOutput(componentName) {
    if (!this._spiedOutputs[componentName]) {
      this._spiedOutputs[componentName] = {
        occurrences: [],
      };
    }
    return this._spiedOutputs[componentName];
  }

  spyFilter(value, componentName) {
    const spiedOutput = this.#getSpiedOutput(componentName);
    const occurrenceIndex = spiedOutput.occurrences.length;
    spiedOutput.occurrences.push(value);
    return occurrenceIndex;
  }

  setFake(componentName, template) {
    const info = getComponentInfo(componentName);
    this._fakeTemplateMap[info.templateName] = template;
  }

  spy(componentName) {
    const info = getComponentInfo(componentName);

    const originalMacroTemplate = realTemplateLoader.getSource(info.templateName);
    if (!originalMacroTemplate) {
      throw new Error(`Cannot create macro spy because template not found '${info.templateName}'.`);
    }

    const spiedOutput = this.#getSpiedOutput(componentName);

    const pattern = /\{%\s*macro.+?%\}/;
    const replacer = match => `${match}<!--spied[${componentName},{{ params|spy('${componentName}') }}]-->`;

    const fakeMacroTemplate = originalMacroTemplate.src.replace(pattern, replacer);
    this.setFake(componentName, fakeMacroTemplate);

    return spiedOutput;
  }

  renderTemplate(template) {
    const output = renderTemplate(template, this);
    return this.cleanupSpiedOccurrences(output);
  }
  renderComponent(componentName, params, children) {
    const output = renderComponent(componentName, params, children, this);
    return this.cleanupSpiedOccurrences(output);
  }

  cleanupSpiedOccurrences(output) {
    const matchedSpies = output.match(/(?<=<!--spied\[)[^\]]+/g);
    if (!matchedSpies) {
      return output;
    }

    const renderedSpies = matchedSpies.map(entry => entry.split(','));
    for (let key of Object.keys(this._spiedOutputs)) {
      const spiedComponent = this._spiedOutputs[key];

      // Provide access to unfiltered occurrences to provide access to non-rendered macro output.
      spiedComponent.unfilteredOccurrences = [...spiedComponent.occurrences];

      // Nullify occurrences that were not in the rendered output.
      spiedComponent.occurrences = spiedComponent.occurrences.map((occurrence, i) => {
        const wasRendered = !!renderedSpies.find(entry => entry[0] === key && parseInt(entry[1]) === i);
        return wasRendered ? occurrence : undefined;
      });
    }

    return output.replace(/<!--spied[^>]+?>/g, '');
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

  await page.setContent(html, { waitUntil: 'networkidle0' });
}
