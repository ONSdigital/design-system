import { getAllToRun, get } from './_sdcModules';
import domready from 'js/domready';

window.sdcAPI = window.sdcAPI || {};

/**
 * Manually boot pattern library scripts from the application
 */
window.sdcAPI.boot = function() {
  getAllToRun().forEach(domready);
};
