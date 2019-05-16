import { dom } from './dom-queries';

export default class AbstractComponent {
  /**
   * Constructor method to take dependencies
   */
  constructor(scopeEl, props) {
    this.scopeEl = scopeEl;

    /**
     * Attach all properties to this object
     */
    if (props) {
      Object.keys(props).forEach(prop => (this[prop] = props[prop]));
    }
  }

  /**
   * Lifecycle method to initialise a component - Typescript interface method candidate
   */
  init() {}

  /**
   * Lifecycle method to register component events - Typescript interface method candidate
   */
  registerEvents() {}

  /**
   * Get all elements within component context
   */
  getElements(className) {
    return dom.getElements(className, { context: this.scopeEl });
  }

  /**
   * Get first element within component context
   */
  getFirstElement(className) {
    return dom.getFirstElement(className, { context: this.scopeEl });
  }
}

export function startComponent(instance) {
  instance.init();
  instance.registerEvents();
  return instance;
}
