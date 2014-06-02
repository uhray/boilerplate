About the JS
=============


Developing the javascript takes place in [lib/public/js](../lib/public/js), with the following file layout:

```
lib/public/js
├── configure.js
├── router.js
├── vendor/
|   ├── waves.js
├── controllers/
|   ├── home.js
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

## Model

## View

## Controller


