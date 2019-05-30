import { startComponent } from 'js/component';
import Collapsible, { scopeClass } from './collapsible';

export default function collapsibleModule() {
  Collapsible.instances = [...document.querySelectorAll(`.${scopeClass}`)].map(scopeEl => startComponent(Collapsible.create({ scopeEl })));
}
