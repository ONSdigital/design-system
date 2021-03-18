const setAttribute = require('./lib/filters/set-attribute').default;

module.exports = function(done) {
  setTimeout(function() {
    done('[setAttribute] ' + setAttribute);
  }, 1000);
};
module.exports.async = true;
