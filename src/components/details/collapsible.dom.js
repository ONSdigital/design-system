import domReady from 'js/domready';
import collapsibleModule from './collapsible.module';
import collapsibleGroupModule from './collapsible-group.module';

domReady(() => {
  collapsibleModule();
  collapsibleGroupModule();
});
