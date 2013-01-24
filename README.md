Node Hue Module
---

## To install
```
npm install hue.js
```

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

## Hue API
### Hue.createClient(opts)
`opts` being `stationIp` ip address and an `appName`. Returns a hue client.

### Hue.Discover(cb)
Discovers hue bridges on your local network.

## Client API

### client.register(opts,cb)
Attempt to register your app with the base station. `opts` has 2 properties, `interval` - the amount of time to wait in milliseconds before attempting to register again, and `attempts` the number of attempts to try before giving up. This will error out if registration was not successful.

### client.lights(cb)
Fetch the list of the lights associated with this base station

### client.light(light,cb)
Fetch the state data about 1 light, `light` being its index received from client.lights(...)

### client.on(light,cb) client.off(light,cb)
Turn on/off that light, `light` being the index received from the client.lights(...)

### client.rgb(light,R,G,B,cb)
Change the RGB colour of the light. Note 0,0,0, is not `off`.