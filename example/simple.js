var Hue = require('../index.js');

var appName = "My App";
var util = require('util')

Hue.discover(function(stations) {

  stations.forEach(fetchLights);
});

function fetchLights(station) {

 var client = Hue.createClient({
    stationIp:station,
    appName:appName
  });

  client.lights(function(err,lights) {

    if (err && err.type === 1) {
      // App has not been registered

      console.log("Please go and press the link button on your base station(s)");
      client.register(function(err) {

        if (err) {
          // Could not register
        } else {
          // Registered, carry on
        }
      });
    } else {
      console.log(lights);
    }
  });
};


// hue.lights(function(lights) {
//     Object.keys(lights).forEach(function(l) {
//         hue.on()
//         // hue.rgb(l,20,150,66);
//     });
// });