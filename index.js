var Hue = require('./lib/Hue');

exports.discover = require('./lib/Discoverer');

exports.createClient = function(config) {
  return new Hue(config);
};