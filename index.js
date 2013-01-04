var Hue = require('./lib/Hue');

exports.createClient = function(config) {
  return new Hue(config);
};
