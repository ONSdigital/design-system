const setAttribute = require('./lib/filters/set-attribute').default;
const setAttributes = require('./lib/filters/set-attributes').default;

module.exports = function(environment) {
  environment.addFilter('setAttribute', setAttribute);
  environment.addFilter('setAttributes', setAttributes);
};
