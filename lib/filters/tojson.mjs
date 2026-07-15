import nunjucks from 'nunjucks';

/**
 * Implement Jinja2's `tojson` filter, and should be used where possible over `| dump`.
 *
 * The returned string is safe to render in HTML documents and <script> tags.
 *
 * See also: https://jinja.palletsprojects.com/en/stable/templates/#jinja-filters.tojson
 *
 * Upstream issue: https://github.com/mozilla/nunjucks/issues/1483.
 */
export default function tojson(data) {
    return new nunjucks.runtime.SafeString(
        JSON.stringify(data).replaceAll('<', '\\u003c').replaceAll('>', '\\u003e').replaceAll('&', '\\u0026').replaceAll("'", '\\u0027'),
    );
}
