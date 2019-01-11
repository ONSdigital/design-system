import domReady from 'js/domready';
import './dialog';
import './submitter';
import 'components/mutually-exclusive/src/mutually-exclusive';
import './inpagelink';
import 'components/textarea/src/character-limit';
import 'components/password/src/password';

import Timeout from 'components/timeout/src/timeout';

domReady(() => new Timeout());

// import '../components/collapsible/collapsible.js';
// import '../components/04-navigation/main-nav.js';
// import '../components/04-navigation/section-nav.js';
