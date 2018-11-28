import { orderBy } from 'lodash';

export function subNavigationHelper({ pageInfo }) {
  const items = pageInfo.children || pageInfo.parent.children || [];

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

  groups.forEach(group =>{
    group.items = orderBy(group.items, ['sortOrder', 'title'], ['asc', 'asc']);
  });

  return groups;
}
