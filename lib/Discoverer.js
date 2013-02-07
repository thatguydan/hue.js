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

module.exports = function(cb) {

  var client = dgram.createSocket("udp4");
  var message = new Buffer(packet);

  client.bind();
  createServer(client.address().port,cb);

  client.send(message, 0, message.length, 1900, "239.255.255.250",function() {
    client.close();
  });
};

function createServer(port,cb) {

  var server = dgram.createSocket("udp4");
  var found = [];

  server.on("message", function (msg, rinfo) {

    if (found.indexOf(rinfo.address)===-1) {
      found.push(rinfo.address);
    }
  });
  server.bind(port);

  setTimeout(function(){

    server.close();
    async.filter(found,hueFinder,cb);
  },2000);
};

function hueFinder(server,cb) {

  request('http://'+server+'/description.xml',function(e,r,b) {

    cb(/Philips hue bridge/g.test(b))
  });
};