import Fuse from 'fuse.js';

export default function queryJson(query, data) {
  const options = {
    shouldSort: true,
    threshold: 0.2,
    location: 0,
    distance: 1000,
  };

  const fuse = new Fuse(data, options);
  let result = fuse.search(query);
  console.log(result);
  return result;
}
