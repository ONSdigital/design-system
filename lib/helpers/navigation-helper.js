export function navigationHelper({ pages, ignorePaths }) {
  if (ignorePaths) {
    pages = pages.filter(page => !ignorePaths.includes(page.path));
  }
  return pages;
}
