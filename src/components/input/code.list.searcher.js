import * as Fuse from 'fuse.js';

export default function queryJson(query, data, searchFields) {
  const options = {
    shouldSort: true,
    threshold: 0.3,
    location: 0,
    distance: 0,
    keys: [searchFields],
  };

  const fuse = new Fuse(data, options);
  const result = fuse.search(query);
  return result;
}
