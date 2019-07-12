import nunjucks from 'nunjucks';
import marked from 'marked';

export class MarkdownExtension {
  constructor() {
    this.tags = ['md'];
  }

  parse(parser, nodes, lexer) {
    const start = parser.tokens.index;
    const token = parser.nextToken();
    const args = parser.parseSignature(null, true);
    const current = parser.tokens.index;

    // fast backup to where we started
    parser.tokens.backN(current - start);

    // slow backup to before block open
    while (parser.tokens.current() !== '{') {
      parser.tokens.back();
    }

    // clear saved peek
    parser.peeked = null;

    // peek up to block end
    let peek;
    while ((peek = parser.peekToken())) {
      if (peek.type === lexer.TOKEN_BLOCK_END) {
        break;
      }

      parser.nextToken();
    }

    // the length of the block end
    parser.tokens.backN(2);
    // fake token to fool advanceAfterBlockEnd name detection in parseRaw
    parser.peeked = token;
    // we are right up to the edge of end-block, so we are "in_code"
    parser.tokens.in_code = true;
    // get the raw body
    const body = parser.parseRaw('md');

    return new nodes.CallExtension(this, 'run', args, [body]);
  }

  run(context, ...args) {
    const body = args.pop();

    const markdown = marked(body(), {
      smartypants: true,
    });

    return new nunjucks.runtime.SafeString(markdown);
  }
}
