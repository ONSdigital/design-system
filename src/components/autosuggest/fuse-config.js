import MiniSearch from 'minisearch';

export default function runMiniSearch(query, data, searchField) {
    // MiniSearch needs unique IDs, so we generate them if missing
    const indexedData = data.map((item, index) => ({
        id: index,
        ...item,
    }));

    const miniSearch = new MiniSearch({
        fields: [searchField, 'formattedAddress', 'tags'], // searchable fields
        storeFields: [searchField, 'formattedAddress', 'tags'], // returned fields
        searchOptions: {
            fuzzy: false, // exact + prefix + substring (no fuzzy threshold)
            prefix: true, // allows "South Sa" to match full long strings
            combineWith: 'AND', // all search tokens must match (same as fuse)
        },
    });

    miniSearch.addAll(indexedData);

    return miniSearch.search(query);
}
