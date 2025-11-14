import FlexSearch from 'flexsearch';

export default function runFlexSearch(query, data, searchField) {
    // FlexSearch requires unique IDs
    const indexedData = data.map((item, index) => ({
        id: index,
        ...item,
    }));

    // Correct FlexSearch Document index config
    const index = new FlexSearch.Document({
        document: {
            id: 'id',
            index: [searchField, 'formattedAddress', 'tags'],
            store: [searchField, 'formattedAddress', 'tags'],
        },
        tokenize: 'forward', // supports substring-like matching
        context: false, // disable contextual scoring (safer)
    });

    // Insert documents
    for (const doc of indexedData) {
        index.add(doc);
    }

    // Perform search on all indexed fields
    const resultGroups = index.search(query);

    // Flatten results
    const flatResults = [];
    for (const group of resultGroups) {
        for (const id of group.result) {
            flatResults.push(indexedData[id]);
        }
    }

    return flatResults;
}
