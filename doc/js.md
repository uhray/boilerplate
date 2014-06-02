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
* [Model] - connects to the API
* [View] - establises the visual interface
* [Controller] - queries the model to provide data to-and-from the view.

## Configuration

The configuration is located in [lib/public/js/configure.js](../lib/public/js/configure.js).

## Router

## Model

## View

## Controller


