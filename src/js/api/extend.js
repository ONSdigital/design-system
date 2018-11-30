import {get, replace} from './_sdcModules';

window.sdcAPI = window.sdcAPI || {};

/**
 * Extend or overwrite an existing module
 */
window.sdcAPI.extend = function (name, methodName, newMethod, opts = {replace: false}) {

  const existingMethod = get(name)[methodName];

  if (opts.replace) {
    replace(name, methodName, newMethod);
  }

  newMethod(existingMethod);
};
