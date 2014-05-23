
### Table of Contents

* [Getting Started](#Getting-Started)
* [Code Organization](#Code-Organization)
* [Static Design](#Static-Design)
* [Serverside API Development](#Serverside-API-Development)
* [Clientside API Connectivity](#Clientside-API-Connectivity)
* [Dynamic Design](#Dynamic-Design)
* [Things Left To Do](#Things-Left-To-Do)
* [Potential Advancements](#Potential-Advancements)

### Getting Started

### Code Organization

The directory structure is as follows

* [.bowerrc](#bower.rc) - Establishes the location for the bower installs
* [.env](#dir-env) - Establishes and environment for the profile call
* [.gitignore](#dir-gitignore) - Sets up standard git ignores for installed packages
* [Procfile](#dir-Procfile) - Procfile for launching with foreman
* [README.md](#dir-README.md) - README.md overview of documentation
* [bower.json](#dir-bower.json) - see [bower.json configuration](http://bower.io)
* [build.js](#dir-build.js) - Establishes configuration to build frontend code into one minified file. See [r.js](https://github.com/jrburke/r.js)
* [lib/](dir-lib) - Directory containing all the important code for you app. See [lib](lib).
* [package.json](#dir-package.json) - see [package.json configuration](http://nodejs.org)
* [server.js](#dir-server.js) - used to fire up node server: `node server.js`
* [static.js](#dir-static.js) - user to fire up node server for static UI design: `node static.js`

<a href="#dir-bower.rc" name="dir-bower.rc">#</a> <b>.bower.rc</b>

This establishes the install path for when you run `bower install` (or when `bower install` is called as the post-install command for `npm install`).

The install path is set to <i>lib/public/bower_components/</i>, which is also [git ignored](#dir-gitignore)

<a href="#dir-env" name="dir-env">#</a> <b>.env</b>

The [foreman](http://foreman.io) enviroment is established here. These environments will be set when you run `foreman start`, which is what [Heroku](http://heroku.com) will do. The important environment variable sets `ENV=PRODUCTION`, which will tell the server to statically host and use the public js file created by the [build.js](#dir-build.js) file so the page loads are significantly faster.

<a href="#dir-gitignore" name="dir-gitignore">#</a> <b>gitignore</b>

Sets paths and file types to be git ignored. Primarily important to prevent the installed modules ([npm](https://npmjs.org) and [bower](#https://bower.io)) from being pushed to github.

<a href="#dir-Procfile" name="dir-Procfile">#</a> <b>Procfile</b>

Established the forman settings: `foreman start` calls `node server.js` with the [.env](#dir-env) environment set.

<a href="#dir-README.me" name="dir-README.me">#</a> <b>README.me</b>

<a href="#dir-bower.json" name="dir-bower.json">#</a> <b>bower.json</b>

<a href="#dir-build.js" name="dir-build.js">#</a> <b>build.js</b>

<a href="#dir-lib" name="dir-lib">#</a> <b>lib/</b>

To dig deeper in understanding of the boilerplate's code organization, begin digging through the [lib README.md](#lib/README.me).

<a href="#dir-package.json" name="dir-package.json">#</a> <b>package.json</b>

<a href="#dir-server.js" name="dir-server.js">#</a> <b>server.js</b>

<a href="#dir-static.js" name="dir-static.js">#</a> <b>static.js</b>

### Static Design

// TODO

### Serverside API Development

// TODO

### Clientside API Connectivity

// TODO

### Dynamic Design

// TODO


