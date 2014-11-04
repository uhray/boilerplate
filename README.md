Uhray Boilerplate
===============

The Uhray boilerplate is a starting point for web application development projects. It was originally inspired by [html5-boilerplate](https://github.com/h5bp/html5-boilerplate), but we shifted the focus to creating dynamic web applications that needed more than the basics of an HTML5 site. We set out to build a collection of tech tools, both internally developed and externally leveraged, that would allow developers to easily and efficiently create modern web applications. We wanted to organize the codebase according to how we typically think about web applications (page-centric, complete separation of frontend and backend, etc). Lastly, we wanted to create a framework with complete transparency and no magic. This gives the developer complete flexibility to do virtually anything he desires, however he chooses, without being pigeonholed or restricted to the confines of typical development frameworks. The end result is the Uhray Boilerplate.

## Features

* Uses [Require.js](http://requirejs.org) for frontend javascript organization.
* Uses [r.js](https://github.com/jrburke/r.js) for frontend optimization in production.
* Hosted using [expressjs](http://expressjs.com), pre-configured with some [middleware](http://expressjs.com/4x/api.html#middleware).
* API ready to be built using [crud](https://github.com/uhray/crud.git).
* Ready for [mustache](https://www.npmjs.org/package/mustache-express) for the backend rendering.
* Uses [ractivejs](https://ractivejs.org) for frontend view rendering.
* Includes [normalize.css](http://necolas.github.com/normalize.css/) for CSS normalizations and common bug fixes.
* Built in (but removable) CSS element reset. (see [main.css](app/frontend/styles/main.scss)).
* Frontend JavaScript dependencies managed with [bower](http://bower.io).
* Built ready for [heroku](https://heroku.com) deployment.
* Easily extendable to new modules [npm](http://npmjs.org) and [bower](http://bower.io).
* Uses [gulp](https://github.com/gulpjs/gulp) build system.
* Uses [Sass/SCSS](http://sass-lang.com/) as CSS Extension library hosted with [sourcemaps](http://blog.teamtreehouse.com/introduction-source-maps) and [Autoprefixer](http://css-tricks.com/autoprefixer/) for easy css prefix handling.
* Ready for [mongodb](http://www.mongodb.org/) connectivity via [mongoosejs](http://mongoosejs.com/).
* Linting with [JSCS](https://www.npmjs.org/package/jscs).

## Documentation

Take a look at the [Uhray Boilerplate Docs](docs/boilerplate.md). This documentation is bundled with the project, which makes it readily available for offline reading and provides a useful starting point for any documentation you want to write about your project.

## Browser Compatibility

This boilerplate should be ready to go for all evergreen browsers.














