import { dom } from 'js/dom-queries';
import { startComponent } from 'js/component';
import CollapsibleGroup, {
  scopeClass as collapsibleGroupClass
} from './collapsible-group';
import Collapsible from './collapsible';

export default function collapsibleGroupModule() {
  dom.getElements(collapsibleGroupClass).forEach(scopeEl => {
    const groupId = scopeEl.getAttribute('id');

    const instance = CollapsibleGroup.create({
      scopeEl,
      props: {
        collapsibles: Collapsible.instances.filter(
          collapsible => collapsible.group === groupId
        )
      }
    });

    startComponent(instance);
  });
}
