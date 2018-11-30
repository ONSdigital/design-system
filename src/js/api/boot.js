import {getAllToRun, get} from './_sdcModules';
import domready from '../domready';

const domreadyModule = get('domready');

window.sdcAPI = window.sdcAPI || {};

/**
 * Manually boot pattern library scripts from the application
 */
window.sdcAPI.boot = function () {
  getAllToRun().forEach(domreadyModule.domready);
};
