/**
 * Append an item to an array.
 *
 * This could be achieved in Nunjucks with array.push(item), and in Jinja2
 * with array.append(item), but not with any syntax that is available in both.
 *
 * Use:
 *     {% do extend(series, seriesItem) %}
 */
export default function extend(value, element) {
    if (!Array.isArray(value)) {
        throw new Error('extend() expects an array');
    }

    value.push(element);
    return
}
