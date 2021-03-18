module.exports = function(input, done) {
  setTimeout(function() {
    done('[nunjucksFilters] ' + input);
  }, 1000);
};
module.exports.async = true;
