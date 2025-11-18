export default function runRawSearch(query, data, searchField) {
    if (!query || !query.trim()) return [];

    const q = query.toLowerCase();

    return data
        .map((item) => {
            const combined = [item[searchField] ?? '', item.formattedAddress ?? '', Array.isArray(item.tags) ? item.tags.join(' ') : '']
                .join(' ')
                .toLowerCase();

            const index = combined.indexOf(q);

            if (index === -1) return null;

            return {
                item,
                score: index, // earlier match is better
            };
        })
        .filter(Boolean)
        .sort((a, b) => a.score - b.score) // closest match first
        .map((r) => r.item);
}
