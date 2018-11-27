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

  return groups;
}
