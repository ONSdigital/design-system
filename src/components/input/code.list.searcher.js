import * as Fuse from 'fuse.js';

export default function queryJson(query, data, searchFields) {
  const options = {
    shouldSort: true,
    threshold: 0.2,
    location: 0,
    distance: 1000,
    keys: [searchFields],
  };

  const fuse = new Fuse(data, options);
  let result = fuse.search(query);
  //limit the results to a maximum of 10
  if (result.length > 10) {
    result = result.slice(0, 10);
  }
  return result;
}
