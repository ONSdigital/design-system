import $ from 'cheerio';

export function mapAll(cheerioNodes, selector) {
  const $nodes = cheerioNodes.map((_, node) => $(node)).toArray();
  return $nodes.map(selector);
}
