var Hue = require('../index.js');

var appName = "My App";

var hue = Hue.createClient({
    stationIp:'10.0.1.106',
    appName:appName
});

hue.lights(function(lights) {
    Object.keys(lights).forEach(function(l) {
        hue.rgb(l,20,150,66);
    });
});