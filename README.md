Node Hue Module
---

## To use
```javascript
var Hue = require('hue.js');
```

## Discover Hue Bridges
```javascript

Hue.discover(function(stations) {

  console.log(stations);
});

```

## Register your app
```javascript

var client = Hue.createClient({
  stationIp:station, // Retrieved from the previous step
  appName:appName // Any alpha numeric name for your app
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
```