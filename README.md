Node Hue Module
---

## Discover Hue Bridges
```javascript
var hue = require('hue.js');

hue.discover(function(stations) {

  console.log(stations);
});

```