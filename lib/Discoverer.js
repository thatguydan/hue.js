var dgram = require('dgram');
var async = require('async');
var request = require('request');

var packet = [
  'M-SEARCH * HTTP/1.1',
  'HOST:239.255.255.250:1900',
  'MAN:"ssdp:discover"',
  'ST:ssdp:all',
  'MX:1',
  ''
].join('\r\n');

var multicast = '239.255.255.250';

module.exports = function(opts, cb) {
  if (typeof opts === 'function') {
    cb = opts;
    opts = {};
  }
  opts = opts || {};
  opts.timeout = opts.timeout || 3000;

  var client = dgram.createSocket('udp4');
  var message = new Buffer(packet);

  client.bind(function() {
    client.addMembership(multicast);

    var found = [];
    client.on('message', function (msg, rinfo) {
      if (found.indexOf(rinfo.address) === -1) {
        found.push(rinfo.address);
      }
    });

    client.send(message, 0, message.length, 1900, multicast);

    setTimeout(function(){
      client.close();
      async.filter(found, hueFinder, cb);
    }, opts.timeout);
  });
};

function hueFinder(server, cb) {
  request('http://'+server+'/description.xml', function(e,r,b) {
    cb(/Philips hue bridge/g.test(b));
  });
}
