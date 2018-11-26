export function subNavigationHelper({ pageInfo }) {
  const items = pageInfo.children || pageInfo.parent.children;

  return items;
}
