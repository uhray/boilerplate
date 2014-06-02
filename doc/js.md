About the JS
=============


Developing the javascript takes place in [lib/public/js](../lib/public/js), with the following file layout:

```
lib/public/js
├── router.js
├── configure.js
├── controllers/
|   ├── home.js
├── vendor/
|   ├── waves.js
├── views/
|   ├── home/
|       ├── main.js
|       ├── template.mustache
```

This is where the bulk of the web development takes place. The js folder structure the "dynamic frontend design" with the following sections:

* [Configuration](#configuration) - establishing paths for javascript
* [Router](#router) - initializes pages and directs to a controller based on the url
* [Model](#model) - connects to the API
* [View](#view) - establises the visual interface
* [Controller](#controller) - queries the model to provide data to-and-from the view.

## Configuration

The configuration is located in [lib/public/js/configure.js](../lib/public/js/configure.js).

The configuration file sets up any [requirejs](http://requirejs.org) configuration paths.i

### 3rd party modules

By default, the following modules are installed with [bower](http://bower.io) (see [building](building.md#bower-installation)) or manually added to the repository in the [lib/public/js/vendor](../lib/public/js/vendor).

* [Emitter](https://github.com/jhermsmeier/emitter.js) - event emitter class
* [Lodash](http://lodash.com/) - consistent, cross-browser utility library
* [Modernizr](http://modernizr.com/) - feature detection library
* [Page](http://visionmedia.github.io/page.js/) - Micro client-side router inspired by the Express router
* [Require-Text](https://github.com/requirejs/text) - Text loader for requirejs
* [Utools](https://github.com/uhray/utools) - Uhray tools library
* [Waves](https://github.com/ripplejs/waves) - Compiled [ripplejs](https://github.com/ripplejs/ripple) module

### Boilerplate Modules

The boilerplate configures certain local modules using requirejs [packages](http://requirejs.org/docs/api.html#packages). They are listed here:

* Controllers - modules relative to the [lib/public/js/controllers](../lib/public/js/controllers) directory.
* Views - modules relative to the [lib/pulic/js/views](../lib/public/js/views) directory.
* JS - modules relative to the [lib/public/js](../lib/public/js) directory. This means any controller could also be required by `define([ 'js/controllers/controller_name.js' ], Function())` as well.

### Using Modules

To use any of them, require them in the `define` section of requirejs on a file. For example, to use lodash, you can have your file structured like this:

```js
define([ 'lodash' ], function(_) {

  console.log('I can now use lodash');
  console.log('Here is lodash: ', _)

})
```

## Adding More Modules

If you wish to install anymore 3rd party modules, you can do so two ways:

1. Using Bower - [Bower installation](building.md#bower-installation).

2. Manually - Placing the file in [lib/public/js/vendor](../lib/public/js/vendor), if it's a 3rd party module, or in [lib/public/js](../lib/public/js) if a project specific module, and adding the path to the requirejs configuration in [lib/public/js/configure.js](../lib/public/js/configure.js). This should only be done for 3rd party modules when a bower module is not available. We had to do this for waves.

## Router

The router, [router.js](../lib/public/js/router.js), is the page that's loaded up on each request. Here you will establish which controller gets called depending on the url grequest. Boilerplate expects you to use [page](http://visionmedia.github.io/page.js/) to handle routing, though I suppose you could use whatever you wish.

Example:

```js

define( [ 'page', 'controllers/home' ], function(page, c$home) {

  page('/*', c$home);
  page();

});

```

This page can also be used to establish any javscript configurations or polyfills you may want to implement. You can also load up [Modernizr](http://modernizr.com/) here if you want.

## Model

There is not really a "model" in the traditional sense. I put this here because it fits in with the Model-View-Controller conversation. The frotend model is established via [crud]((https://github.com/uhray/utools.git) in the API. See [Developing an API](api.md).

## View

The views are located in [lib/public/js/views](../lib/public/js/views).

Views are predefined templates that, given a data object, create the HTML to be placed in the page. They can also have predefined event handling or emit things (think [emitter](https://github.com/jhermsmeier/emitter.js)).

### Creating a view

In boilerplate, views are expected to be folders in the [view directory](../lib/public/js/views). Each folder fits the following format:

```
lib/public/js/views/example
├── template.mustache
├── main.js
```

#### main.js

The `main.js` file is whats required from a view. You can do anything you want here, as long as you return a function that follows some expected behavior. To keep things consistent, we use [ripplejs](https://github.com/ripplejs/ripple) for frontend view rendering (by way of [waves](https://github.com/ripplejs/waves)) for view rendering.

Ripplejs allows you to define an html template and pass data to create a new view. You can use the view object to dynamically update data. You can also have specific events emitted so view users (controllers) can do things on events.

Example:

```js
define([ 'waves', 'text!./template.mustache' ], function(waves, template) {
  var view = waves(template);  // Create ripplesjs view. More on templates below

  // An event example. Template would need an on-click event
  view.prototype.h1click = function(event) {
    console.log('You have clicked the h1');

    // Emitting something for the view's controller to listen for
    this.emit('h1click');
  }

  return view;
});
```

#### template.mustache

This is a text template for the rippeljs view. It allows you to define the template in a separate file (not deal with concatinating mult-line strings). See [ripplejs](https://github.com/ripplejs/ripple) for how to define templates.

Example:

```html
<h1 on-click="{{ this.h1click }}">{{ title }}</h1>
```

### Using a view

Views are used in the controllers. An example is below:

```js
define([ 'views/home/main' ], function(view) {
  var home = new view({ data: { title: 'Welcome Home' } })

  // Append the created element to the body
  home.appendTo(document.body);

  // Listen for an event
  home.on('h1click', function() {
    console.log('Action `h1click` was emitted');

    // This would update the rendered view in the page
    home.set('title', 'New title post click');
  });
})
```

## Controller




