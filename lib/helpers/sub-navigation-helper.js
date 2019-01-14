import { orderBy } from 'lodash';

export function subNavigationHelper({ pageInfo }) {
  const startPath = `/${pageInfo.path.slice(1).split('/')[0]}`;
  const items = pageInfo.siteMap.find(page => page.path === startPath).children || [];

  const groups = [];

  items.forEach(item => {
    let group = groups.find(g => g.title === item.group);

    if (!group) {
      group = {
        title: item.group,
        items: []
      };
      groups.push(group);
    }

    group.items.push(item);
  });

  groups.forEach(group => {
    group.items = orderBy(group.items, ['sortOrder', 'title'], ['asc', 'asc']);

    group.items.forEach(item => {
      if (item.children) {
        item.children = orderBy(item.children, ['sortOrder', 'title'], ['asc', 'asc']);
      }
    });
  });

  return groups;
}
