var util         = require('util');
var Crypto       = require('crypto');
var request      = require('request');
var EventEmitter = require('events').EventEmitter;
var Helpers      = require('./helpers.js');

module.exports = Hue;
util.inherits(Hue,EventEmitter);

function Hue(config) {
  EventEmitter.call(this);

  if (!config.stationIp) throw new Error('Base station IP is required');
  if (!config.appName) throw new Error('Application name is required');

  this._station = config.stationIp;
  this._app = config.appName;
  this._key = Crypto.createHash('md5').update(config.appName).digest("hex");
  this._authenticated = false;
};

Hue.prototype.lights = function(cb) {

  var opts = {
    url:'http://'+this._station+'/api/'+this._key+'/lights',
    json:true,
    timeout:30000
  };

  request(opts,function(e,r,b) {
    if (typeof cb === "function") cb(b);
  });
  return this;
};

Hue.prototype.on = function(light,cb) {
  var opts = {
    method:'PUT',
    url:'http://'+this._station+'/api/'+this._key+'/lights/'+light+'/state',
    json:{on:true},
    timeout:30000
  };

  request(opts,function(e,r,b) {

    if (typeof cb === "function") cb(b);
  });
  return this;
};

Hue.prototype.off = function(light,cb) {
  var opts = {
    method:'PUT',
    url:'http://'+this._station+'/api/'+this._key+'/lights/'+light+'/state',
    json:{on:false},
    timeout:30000
  };

  request(opts,function(e,r,b) {
    if (typeof cb === "function") cb(b);
  });
  return this;
};

Hue.prototype.rgb = function(light,r,g,b,cb) {

  var hsv = Helpers.rgb2hsv(r,g,b);
  var params = {
    hue:182*hsv[0],
    sat:Math.ceil(254*hsv[1]),
    bri:Math.ceil(254*hsv[2])
  }

  console.log(params)
  var opts = {
    method:'PUT',
    url:'http://'+this._station+'/api/'+this._key+'/lights/'+light+'/state',
    json:params,
    timeout:30000
  };

  request(opts,function(e,r,b) {
    if (typeof cb === "function") cb(b);
  });
  return this;
};