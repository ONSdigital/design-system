import through from 'through2';

import createNunjucksEnvironment from './create-nunjucks-environment.js';
import { getPageInfo } from './helpers/site-map';
import renderPage from './render-page.js';

export default through.obj((file, enc, cb) => {
  const pageInfo = getPageInfo(file.path);
  const nunjucksEnvironment = createNunjucksEnvironment();
  const output = renderPage(file.path, nunjucksEnvironment);
  file.path = pageInfo.outputPath;
  file.contents = Buffer.from(output, enc);
  cb(null, file);
});
