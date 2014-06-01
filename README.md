## Uhray Node JS Boilerplate

We have created a simple boilerplate to get projects up and running quickly and to set the stage for easy development without restricting freedom.

## Quick Start

Run the following:

```sh
git clone https://github.com/uhray/boilerplate.git  # clone repo
cd boilerplate  # cd into directory
npm install     # install node modules and bower modules on the post-install
node server.js  # fire up server
```

Then go go <a>http://localhost:3000</a>.

To host the static site: `node static.js`.

To host the optimized site: `foreman start`. See [foreman](http://foreman.io)

## Features

* Uses [Require.js](http://requirejs.org) for frontend javascript organization.
* Uses [r.js](https://github.com/jrburke/r.js) for frontend optimization in production.
* Hosted using [expressjs](http://expressjs.com), configured with some [middleware](http://expressjs.com/4x/api.html#middleware).
* API ready to be built on [crud](https://github.com/uhray/utools.git).
* Ready for [jade](https://github.com/visionmedia/jade) for the backend rendering.
* Uses [ripplejs](https://github.com/ripplejs/ripple) for frontend view rendering (by way of [waves](https://github.com/ripplejs/waves)).
* Includes Normalize.css(http://necolas.github.com/normalize.css/) for CSS normalizations and common bug fixes.
* The latest [Modernizr](http://modernizr.com/) build for feature detection.
* Built in (but removable) CSS element reset. (see [main.css](lib/public/css/main.css)).
* Build ready to use the frontend js ([bower](http://bower.io)) modules [page.js](https://github.com/visionmedia/page.js.git), [async.js](https://github.com/caolan/async), [lodash](http://lodash.com/), [utools](https://github.com/uhray/utools.git), and [jquery](https://github.com/jquery/jquery). (Note: you can choose not to use these).
* Build ready to use the server-side js ([npm](http://npmjs.org)) modules
[utools](https://github.com/uhray/utools.git), and [cbax](https://github.com/uhray/cbax.git), [mongoose](http://mongoosejs.com/), and others.
* Built ready for [heroku](https://heroku.com) deployment.
* Easily extendable to new modules [npm](http://npmjs.org) and [bower](http://bower.io).

## Usage

Take a look at the [usage documentation](doc/usage.md) to learn how to use the boilerplate.

## Things Left To Do

We are not yet complete with a first version of the boilerplate.

Things on the "todo" list:

* Establishing API Authentication and Protection
* Authentication on frontend with page
* Frontend API connectivity - LOAD crud for frontend use too???

## Potential Future Advancements

More advanced tools that could be incorporated:

* Integrate [cbax](https://github.com/uhray/cbax.git) with bower
* Client side logging/debugging
* Google Analytics Usage Tracking
* Advanced Usage tracking - potentially creating a method for tracking stuff in relation to the specific app for algorithmic processing and personalization.
* AB Testing framework
* Testing framework
* TODO framework
* CHECK framework
* Protection against any stray console.log causing JavaScript errors in older browsers.
* Browser compatability polyfills?
