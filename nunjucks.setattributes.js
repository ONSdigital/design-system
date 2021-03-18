const setAttributes = require('./lib/filters/set-attributes').default;

module.exports = function(done) {
  setTimeout(function() {
    done('[setAttributes] ' + setAttributes);
  }, 1000);
};
module.exports.async = true;
