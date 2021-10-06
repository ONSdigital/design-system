import generateExampleParams from './helpers/generate-example-params.js';
import navigationHelper from './helpers/navigation-helper.js';
import subNavigationHelper from './helpers/sub-navigation-helper.js';

export default function installRenderHelpers(nunjucksEnvironment) {
  nunjucksEnvironment.addGlobal('helpers', {
    generateExampleParams: params => generateExampleParams(params, nunjucksEnvironment),
    navigationHelper,
    subNavigationHelper,
  });
}
