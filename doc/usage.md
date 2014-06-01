Usage
=============

Once you have downloaded and installed the boilerplate, using it usually involved the following:

1. Understanding the basic structure of the site. [see here](#basic-structure)
2. Creating a static design.
3. Server-side API development.
4. Client-side API connectivity.
5. Create dynamic frontend that connects with live API.
6. Deploy

## Basic Structure

```
.
├── doc
├── lib/
|   ├── api/
|       ├── controller.js
|       ├── crud.js
|       ├── document.js
|       ├── index.js
|       └── models.js
|   ├── public/
|       ├── css/
|           ├── main.css
|       ├── img/
|       ├── js/
|           ├── configure.js
|           ├── router.js
|           ├── vendor/
|               ├── waves.js
|           ├── controllers/
|               ├── home.js
|           ├── views/
|               ├── home/
|                   ├── main.js
|                   ├── template.mustache
|        ├── partials/
|            ├── header.jade
|   ├── views/
|       ├── main.jade
|       ├── static/
|           ├── _include.jade
|           ├── home.jade
├── README.md
├── server.js
├── static.js
├── Procfile
├── build.js
├── bower.json
├── package.json
├── .bowerrc
├── .env
├── .git
├── .gitignore
```

Follow the directory structure overview below to 

### doc/

Contains the boilerplate documentation. You can use it, and update anything here to reflect your own documentation.

### lib/api

This is where you can use [crud](https://github.com/uhray/curd.git) (or anything else you want) to create your unique API. See [Developing an API](api.md).

### lib/public/css

This directory should contain all your app-specific css files. [About the CSS](css.md).

### lib/public/img/

Place any images used for the site here. They will be statically accessible one site at <i>/public/img/filename.extension</i>.

### lib/public/js

This directory contains all app-specific javascript. [About the JS](js.md)

### lib/views

This contains any [jade](https://github.com/visionmedia/jade) views to be rendered on the backend. [About Jade Views](views.md).

### lib/views/static

Here will contain all the static jade views for developing a static HTML/CSS design before building the app integrated with data and javascript. [Building static design](static.md).

### README.md

Contains the boilerplate README, connecting to the docs.

### server.js

This is used to fire up node server: `node server.js`. See [Deploying](deploying.md).

### static.js

This is used to fire up node server for static UI/Ux design: `node server.js`. See [Deploying](deploying.md) and [Building static design](static.md).

### Procfile

Established the forman settings: `foreman start` calls `node server.js` with the [.env](#-env) environment set. See [Deploying](deploying.md).

### build.js

With [r.js](https://github.com/jrburke/r.js) it optimizes the frontend js and partials for optimized deployment. It will be built on `npm install` post-install. See [Building](building.md).

### bower.json

Defines [bower](http://bower.io) dependencies. They will be build on an `npm install` post-install or on `bower install`. See [Building](building.md).

### package.json

Defines [npm](http://npmjs.org) dependencies. See [Building](building.md).

### .bower.rc

This establishes the install path for when you run `bower install` (or when `bower install` is called as the post-install command for `npm install`).

The install path is set to <i>lib/public/bower_components/</i>, which is also [git ignored](#gitignore).

### .env

The [foreman](https://github.com/ddollar/foreman) enviroment is established here. These environments will be set when you run `foreman start`, which is what [Heroku](http://heroku.com) will do. The important environment variable sets `ENV=PRODUCTION`, which will tell the server to statically host and use the public js file created by the [build.js](#build.js) file so the page loads are significantly faster.

### gitignore

Sets paths and file types to be git ignored. Primarily important to prevent the installed modules ([npm](https://npmjs.org) and [bower](#https://bower.io)) from being pushed to github.

