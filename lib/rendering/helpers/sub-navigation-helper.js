import * as fs from 'fs';
import lodash from 'lodash';

const sourcePath = `${process.cwd()}/src`;

export default function subNavigationHelper({ pageInfo, anchorLinks }) {
  const items = pageInfo.children || pageInfo.parent.children || [];

  const groups = [];

  if (anchorLinks) {
    const path = `${sourcePath}${pageInfo.url}/index.njk`;

    if (fs.existsSync(path)) {
      const item = items.find(item => item.url === pageInfo.url);
      const raw = fs.readFileSync(path, 'utf8');

      const matches = raw
        .match(/(?<=\n## )[A-Za-z0-9 ]*/g)
        // ignores headings matching the following strings so they won't be included when building child page anchor sub nav
        .filter(
          match =>
            !match.toLowerCase().includes('research on this') &&
            !match.toLowerCase().includes('help improve this') &&
            !match.toLowerCase().includes('when to use this') &&
            !match.toLowerCase().includes('how to use this') &&
            !match.toLowerCase().includes('variants'),
        );

      const anchors = matches.map(match => ({
        title: match,
        url: `#${match
          .trim()
          .toLowerCase()
          .replace(/\s/g, '-')}`,
      }));

      item.anchors = anchors;
    }
  }

  items.forEach(item => {
    let group = groups.find(g => g.title === item.group);

    if (!group) {
      group = {
        title: item.group,
        items: [],
      };
      groups.push(group);
    }

    group.items.push(item);
  });

  groups.forEach(group => {
    group.items = lodash.orderBy(group.items, ['sortOrder', 'title'], ['asc', 'asc']);
  });

  return groups;
}
