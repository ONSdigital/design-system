import through from 'through2';

import { getPageListing } from './helpers/site-map.js';

export default through.obj((file, enc, cb) => {
  const allPages = getPageListing();

  const filteredPages = JSON.stringify(
    allPages.reduce(
      (result, page) =>
        !page.exclude && !page.url.includes('/examples')
          ? result.concat({ en: page.title, url: page.url, tags: page.synonyms ? page.synonyms.split(', ') : '' })
          : result,
      [],
    ),
  );

  file.contents = Buffer.from(filteredPages, enc);

  cb(null, file);
});
