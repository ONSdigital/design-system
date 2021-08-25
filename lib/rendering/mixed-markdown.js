import marked from 'marked';

const PATTERN_NUNJUCKS_BODY = /\+\+\+(.+?)\+\+\+/gs;
const PATTERN_NUNJUCKS_BRACES = /\+(\{.+?\})\+/gs;
const PATTERN_NUNJUCKS_PLACEHOLDER = /(\{\{.+?\}\})/gs;

const PATTERNS_ORDERED = [PATTERN_NUNJUCKS_BODY, PATTERN_NUNJUCKS_BRACES, PATTERN_NUNJUCKS_PLACEHOLDER];

function simplify(content) {
  const templateFragments = [];

  let markdown = content;

  for (let pattern of PATTERNS_ORDERED) {
    markdown = markdown.replace(pattern, (_, p1) => {
      const index = templateFragments.length;
      templateFragments.push(p1);
      return `$${index}$`;
    });
  }

  return { markdown, templateFragments };
}

/**
 * Renders markdown content within a Nunjucks template by temporarily removing template
 * syntax whilst the markdown formatted content is being rendered.
 *
 * Special syntax for marking an area of markdown as Nunjucks:
 * ```md
 * +++
 * {% if abc %}
 *   <p>A</p>
 * {% elif def %}
 *   <p>B</p>
 * {% endif %}
 * +++
 * ```
 *
 * This is also useful for outputting large blocks of raw HTML:
 * ```md
 * +++
 * <ul>
 *   <li><a href="#a">A</a></li>
 *   <li><a href="#b">B</a></li>
 *   <li><a href="#c">C</a></li>
 * </ul>
 * +++
 * ```
 *
 * Individual components can be marked as follows:
 * ```md
 * +++
 * {% from "components/button/_macro.njk" import onsButton %}
 * +++
 *
 * Here is a button:
 * {{
 *     onsButton({
 *        "text": "Save and continue"
 *     })
 * }}
 * ```
 *
 * @param {string} content
 * @returns Nunjucks template with rendered markdown content.
 */
export default function render(content) {
  const simplifiedContent = simplify(content);

  const renderedMarkdown = marked(simplifiedContent.markdown, {
    pedantic: false,
    smartypants: true,
  });

  return renderedMarkdown.replace(/\$(\d+)\$|<p>\$(\d+)\$<\/p>/g, (_, key1, key2) => simplifiedContent.templateFragments[key1 ?? key2]);
}
