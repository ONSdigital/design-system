import Fuse from 'fuse.js';

export default function runFuse(query, data, searchFields, threshold, distance) {
    const options = {
        shouldSort: true,
        threshold: threshold,
        distance: distance,
        keys: [
            {
                name: searchFields,
                weight: 0.9,
            },
            {
                name: 'formattedAddress',
                weight: 0.9,
            },
            {
                name: 'tags',
                weight: 0.1,
            },
        ],
    };

    const fuse = new Fuse(data, options);
    let result = fuse.search(query);
    return result;
}
