import { orderBy } from 'lodash';

export function navigationHelper({ pages, ignoreURLs }) {
  if (ignoreURLs) {
    pages = pages.filter(page => !ignoreURLs.includes(page.url));
  }

  pages = orderBy(pages, 'sortOrder');
  return pages;
}
