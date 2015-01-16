
Place custom Ractive Extensions here. An extension is anything that extends the basic functionality of Ractive that is not just a decorator, event, component, adaptor, or transition. It can have one or more of these. Or just listen for events. Or whatever. Just make you do the following:

```js

var extension = Ractive.extend({
  // Add custom extension stuff here using the extend API
  // --> http://docs.ractivejs.org/latest/ractive-extend
});


// This makes sure that Ractive now has the extension globally
Ractive.prototype = extension.prototype;
```

