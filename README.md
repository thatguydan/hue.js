Node Hue Module
---
This library aims to provide a simple interface to a Philips Hue bridge (http://www.meethue.com/).

A Hue bridge requires your 'app' to register with the bridge. This process involves a user pressing the link button on the hue, and your app making a request to its API to complete the process.

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
  stationIp:station, // 'x.x.x.x', retrieved from the previous step
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
`opts` being `stationIp` ip address and an `appName`. Returns a hue `client`.

### Hue.Discover(cb)
Discovers hue bridges on your local network.

## Client API

### client.register(opts,cb)
Attempt to register your app with the base station. `opts` has 4 optional properties.

* `username` - the username to register. Default to a md5 hash based upon the value of the `appName` configured when calling `createClient`
* `deviceType` - the device type to register. Defaults to the value of the `appName` that was set when calling `createClient`. 
* `interval` - the amount of time to wait in milliseconds before attempting to register again. Defaults to 3000.
* `attempts` - the number of retry attempts before giving up. This will error out if registration was not successful. Defaults to 0.

### client.unregister([username],cb)
Ungregisters (unpair) your app. All future calls will be unauthorised by the base station until your app is reregistered.

With the optional `username` parameter the username of the application that should be unregistered can be specified. This value defaults to the username of the current application that was determined when calling `createClient`.

### client.config([opts],cb)
Fetch or if `opts` is specified update, the configuration of this base station. [See here](http://burgestrand.github.com/hue-api/api/config/#updating-bridge-configuration) for a station's properties.

### client.lights(cb)
Fetch the list of the lights associated with this base station

### client.light(light,cb)
Fetch the state data about 1 light, `light` being its index received from client.lights(...)

### client.state(light,state,cb)
Update the state of a light, `light` being its index received from client.lights(...) and `state` being an object with properties [defined here](http://burgestrand.github.com/hue-api/api/lights/#changing-light-color-and-turning-them-onoff)

### client.on(light,cb) client.off(light,cb)
Turn on/off that light, `light` being the index received from the client.lights(...)

### client.rgb(light,R,G,B,cb)
Change the RGB colour of the light. Note 0,0,0, is not `off`.

### client.rename(light,name,cb)
Change the light's name to the string `name`, where `light` is the index received from `client.clients()`.

### client.brightness(light, birghtnessValue,cb)
Control the brightness of a single light, where `light` is the index received from `client.clients()` and `birghtnessValue` is in range 0 - 255. At value 0 the light will switch off.
