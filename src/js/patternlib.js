import hljs from 'highlight.js/lib/highlight';
import javascript from 'highlight.js/lib/languages/javascript';
import xml from 'highlight.js/lib/languages/xml';

hljs.configure({ tabReplace: '  ' });
hljs.registerLanguage('javascript', javascript);
hljs.registerLanguage('html', xml);
hljs.initHighlightingOnLoad();
