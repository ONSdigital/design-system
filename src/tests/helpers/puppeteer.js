export async function getNodeAttributes(page, selector) {
  return await page.$eval(selector, node => {
    const reducer = (map, attr) => {
      map[attr.name] = attr.value;
      return map;
    };
    return [...node.attributes].reduce(reducer, {});
  });
}
