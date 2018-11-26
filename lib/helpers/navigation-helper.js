import { orderBy } from 'lodash';

export function navigationHelper({ pages, ignorePaths }) {
  if (ignorePaths) {
    pages = pages.filter(page => !ignorePaths.includes(page.path));
  }

  pages = orderBy(pages, 'sortOrder');
  return pages;
}
