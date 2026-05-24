import FlexSearch from 'flexsearch';

export default function runFlexSearchIndex(query, data, searchField) {
    const index = new FlexSearch.Index({
        preset: 'match', // enables raw substring scanning
        tokenize: 'forward', // needed for substring matching
        cache: true,
        encode: false,
        depth: 3, // improves substring matching window
    });

    const documents = [];

    // Add documents
    data.forEach((item, id) => {
        const text =
            (item[searchField] || '') + ' ' + (item.formattedAddress || '') + ' ' + (Array.isArray(item.tags) ? item.tags.join(' ') : '');

        index.add(id, text);
        documents[id] = item;
    });

    // Perform substring search
    const resultIds = index.search(query);

    return resultIds.map((id) => documents[id]);
}
