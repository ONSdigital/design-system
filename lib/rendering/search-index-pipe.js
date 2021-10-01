import through from 'through2';

import { getSiteMap } from './helpers/site-map.js';

export default through.obj((file, encoding, cb) => {
  const allPages = [...getSiteMap().routes.values()];

  const filteredPages = JSON.stringify(
    allPages.reduce(
      (result, page) =>
        filterPages(page) ? result.concat({ en: page.title, url: page.url, tags: getTags(page), category: getCategory(page) }) : result,
      [],
    ),
  );

  file.contents = Buffer.from(filteredPages, encoding);

  cb(null, file);
});

function filterPages(page) {
  const topLevelPagePattern = /^[^\/]*\/[^\/]*\/[^\/]*$/g;
  if (!page.exclude && !page.url.includes('/examples') && topLevelPagePattern.test(page.url) !== true) {
    return true;
  }
}

function getTags(page) {
  return page.synonyms ? page.synonyms.split(', ') : '';
}

function getCategory(page) {
  let category = page.url.split('/')[1].replace(/-/g, ' ');
  return category.charAt(0).toUpperCase() + category.slice(1);
}
