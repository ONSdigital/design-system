import * as fs from 'fs';

export default function subNavigationHelper({ pageInfo, anchorLinks }) {
  const rootPage = pageInfo.depth === 0 ? pageInfo : pageInfo.parent;

  const items = rootPage.children.filter(item => !!item.templatePath).map(item => ({ ...item }));

  if (anchorLinks) {
    if (fs.existsSync(pageInfo.templatePath)) {
      const item = items.find(item => item.url === pageInfo.url);
      const raw = fs.readFileSync(pageInfo.templatePath, 'utf8');

      const matches = raw
        .match(/\n## ([.,A-Za-z0-9 ]*)/g)
        .map(match => match.substr(4))
        // ignores headings matching the following strings so they won't be included when building child page anchor sub nav
        .filter(
          match =>
            !match.toLowerCase().includes('research on this') &&
            !match.toLowerCase().includes('help improve this') &&
            !match.toLowerCase().includes('when to use this') &&
            !match.toLowerCase().includes('how to use this') &&
            !match.toLowerCase().includes('variants') &&
            !match.toLowerCase().includes('ask for help'),
        );

      const anchors = matches.map(match => ({
        title: match,
        url: `#${match
          .trim()
          .toLowerCase()
          .replace(/\s/g, '-')
          .replace('.', '')
          .replace(',', '')}`,
      }));

      item.anchors = anchors;
    }
  }

  if (pageInfo.group) {
    return pageInfo.group.rootPage.groups;
  } else if (pageInfo.groups.length !== 0) {
    return pageInfo.groups;
  } else {
    return [
      {
        items,
      },
    ];
  }
}
