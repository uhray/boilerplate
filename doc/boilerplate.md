# UHRAY BOILERPLATE DOCS

**Intro**
* [Quick Start](#quick-start)
* [Codebase Organization](#codebase-organization)

**Backend Docs**
* [Server Configuration](#server-configuration)
* [API](#api)
* [Shells](#shells)


**Frontend Docs**
* [Static Development](#static-development)
* [Configuring Frontend](#configuring-frontend)
* [Pages](#pages)
* [Routing](#routing)
* [Styles](#styles)
* [Images](#images)
* [Ractive-Plugins](#ractive-plugins)
* [Modules](#modules)

**Other Docs**
* [Package Management](#package-management)
* [Linting](#linting)
* [Build Options](#build-options)
* [Heroku Deployment](#heroku-deployment)




<br>
# INTRO


## Quick Start

Dependencies:
* [node](http://nodejs.org/)
* [npm](https://www.npmjs.org/) (now comes with node)
* [bower](http://bower.io/)
* [gulp](https://github.com/gulpjs/gulp/blob/master/docs/getting-started.md#getting-started)

```bash
git clone git@github.com:uhray/boilerplate.git
cd boilerplate
npm install
gulp dev
# Application is now running at http://localhost:5000
```

## Codebase Organization

The Uhray Boilerplate [root directory](https://github.com/uhray/boilerplate) contains many files and directories related to the application server, configurations, build commands, etc. We'll get into many of these specifics later. The primary file of importance is [server.js](https://github.com/uhray/boilerplate/blob/master/server.js) which is the application server. The real meat of the Uhray Boilerplate is within the [app](https://github.com/uhray/boilerplate/tree/master/app) directory, more specifically within its [backend](https://github.com/uhray/boilerplate/tree/master/app/backend) and [frontend](https://github.com/uhray/boilerplate/tree/master/app/frontend) subdirectories.

```
app/
	backend/
	frontend/
server.js
```

#### Backend Organization

The backend directory houses two important parts of a web application, the API and what we call *shells*.

```
backend/
	api/
		resources/
		index.js
	shells/
```

API

By default, the Uhray Boilerplate is set up for use with a [MongoDB](http://www.mongodb.org/) database and [Mongoose](http://mongoosejs.com/) for database connectivity and querying. It also comes ready for the creation of a REST API built on top of [crud](https://github.com/uhray/crud#backend) and [crud-mongoose](https://github.com/uhray/crud-mongoose), modules developed by Uhray that allow a developer to easily setup database resources for interactivity within the application. Each resource directory establishes the schema, instantiates a model, and defines the API routes for interacting with that resource.

Shells

The application server is setup to respond to specific requests with a shell. A shell is simply a skeleton of HTML/CSS that is sent to the client-side and immediately displayed before the frontend takes care of loading the remaining elements/data into the main body of the page. The advantage to using shells is that you can update data on the frontend when a user navigates between pages without re-requesting the content or re-rendering the entire view. The end result is a faster, more seamless user experience and lighter server load. 

#### Frontend Organization

The frontend directory all starts with the [router.js](https://github.com/uhray/boilerplate/blob/master/app/frontend/router.js) file. After the server sends over a shell to the frontend, the *router.js* file handles which application page should be loaded based on the URL. Each page can utilize images, modules, styles, plugins, bower modules, etc. More on this later.

```
frontend/
	images/
	modules/
		tools.js
	pages/
		home/
			template.html
			main.js
	ractive-plugins/
	styles/
	configure.js
	router.js
```

The frontend is intentionally designed to be page-centric, meaning that code is organized and structured around each page in the web application. Inside the [pages directory](https://github.com/uhray/boilerplate/tree/master/app/frontend/pages), each page is defined as a directory itself containing 2 files (see *home* above):

 1. Ractive Template
 2. Ractive JavaScript File

For more information, check out the [pages documentation](#pages).





<br>
# BACKEND DOCS



## Server Configuration

#### Server Setup
The Uhray Boilerplate was designed for applications running a *Node.js* server with *express.js* as a web application framework. Everything about the server starts with the [server.js](https://github.com/uhray/boilerplate/blob/master/server.js) file. At a high level, this file is responsible for the execution of several tasks:

 1. Sets up server-side logging via [winston](https://www.npmjs.org/package/winston), some default [express](http://expressjs.com/4x/api.html#application) app configurations, and middleware.
 2. Starts up the application server.
 3. Configures the API (establishing database connectivity, schemas, API routes to listen for, etc.).
 4. Configures non-API server routes for shells.

You are free to add, modify, or remove pretty much anything you want from *server.js* to suit your needs.

#### Config Variables
There are a number of ways to set configuration variables within your application. 

In the [loadConfigs](https://github.com/uhray/boilerplate/blob/master/server.js#L78-L87) function of *server.js*, you will see the following code snippet:

```
nconf
    .argv()
    .env()
    .file({ file: __dirname + '/config/settings.json' });
nconf.set('lib', __dirname + '/app');
nconf.set('PORT', '5000');
nconf.set('HOST', '127.0.0.1');
```

It is important to note that there is a hierarchical precedence for how these variables are set. You must be aware of this ordering to avoid conflicts where variables could be overwritten. Config variables, as defined in the code above, are set in the following order:

 1. Command line arguments (process.argv)
Ex: ``` node server.js --PORT 9123```
 2. Environment variables (process.env)
Ex: ``` PORT=9123 node server.js```
 3. JSON file of key value pairs
Ex: ``` { "PORT": 9123 } ``` 
 4. Variables set directly with nconf
Ex: ``` nconf.set('PORT', '9123')```

This means that command-line arguments will override all other similarly named config variables. Environment variables will be overwritten by command-line arguments but will overwrite everything else. So on and so forth.

## API

#### API Basics

The backend API directory consists of an [index.js](https://github.com/uhray/boilerplate/blob/master/app/backend/api/index.js) file and a directory of [resources](https://github.com/uhray/boilerplate/tree/master/app/backend/api/resources).

```
api/
	index.js
	resources/
```

 When *server.js* is run, it makes a call to [configure the API](https://github.com/uhray/boilerplate/blob/master/server.js#L49). This executes the API's *index.js* file which, by default, does a number of useful things to get applications up and running quickly.

 1. Establishes basic authentication with forgot password functionality for users via [turnkey](https://github.com/uhray/turnkey).
 2. Launches REST API built via [crud](https://github.com/uhray/crud#backend) based on your resources.
 3. Connects to your MongoDB if the [config variable](#config-variables) 'MONGOHQ_URL' is set to the URL where your MongoDB instance is hosted.

#### Resources

In [REST APIs](http://en.wikipedia.org/wiki/Representational_state_transfer), a resource is defined as "an object with a type, associated data, relationships to other resources, and a set of methods that operate on it." Therefore, a resource is basically an *instance* of a [Mongoose Model](http://mongoosejs.com/docs/models.html) which is defined by a [Mongoose Schema](http://mongoosejs.com/docs/guide.html) along with its associated API entities/routes which are defined using [crud](https://github.com/uhray/crud#backend). 

As an example from the [users.js](https://github.com/uhray/boilerplate/blob/master/app/backend/api/resources/users.js) resource file, we first define the Mongoose Schema for our users.

```js
Schema = exports.Schema = new mongoose.Schema({
  firstName: { type: String, required: true },
  lastName:  { type: String, required: true },
  username: { type: String, index: true, unique: true },
  info: {
    gender: { type: String, enum: ['M', 'F'] },
    age: Number
  },
  dates: {
    created: { type: Date, default: Date.now },
    updated: { type: Date, default: Date.now },
    deleted: { type: Date }
  }
});
```

Next, we create the users model as an instantiation of that mongoose schema.

```js
Model = exports.Model = mongoose.model('users', Schema);
```

Lastly, we define API routes via [crud](https://github.com/uhray/crud#backend) where we also specify what exactly should happen with the resource when performing activities like create (C), read (R), update (U), and delete (D). We quickly discovered that regardless of the API resource, there are many common database operations that were repeatedly performed, especially when creating, reading, updating, or deleting data. For this reason, we created [crud-mongoose](https://github.com/uhray/crud-mongoose) which is middleware that connects crud to mongoose and provides many convenient and configurable calls to save you time and energy.

```js
crud.entity('/users').Create()
  .use(turnkey.createPassword())
  .pipe(cm.createNew(Model));
```

#### Creating a New Resource

To create a new resource, simple create a new JavaScript file in the API's [resources](https://github.com/uhray/boilerplate/tree/master/app/backend/api/resources) directory. The file will need to define a [Mongoose Schema](http://mongoosejs.com/docs/guide.html), instantiate a [Mongoose Model](http://mongoosejs.com/docs/models.html), and define the [crud](https://github.com/uhray/crud#backend) API calls associated with that resource. If you're just getting started, check out the [users.js](https://github.com/uhray/boilerplate/blob/master/app/backend/api/resources/users.js) resource as an example.

## Shells

#### Basics

When the server receives a request for a particular route, it responds with a rendered shell. A shell is simply a skeleton of static HTML & CSS that is sent to the client-side and immediately displayed before the frontend takes care of loading the remainder of the elements and data into the main body of the page. 

The advantage to using shells is that you can update data on the frontend as a user navigates between pages without re-requesting the shell content from the application server or re-rendering the entire view. This creates a smoother user experience without the constant feel of page refreshes. It can also significantly lighten the load on your application server since parts of your HTML template and stylesheets don't need to be repeatedly served. The application server will just respond to API requests after a shell is sent to the frontend (unless you request a new shell for a different part of your web application).

#### Setup

Shells are configured in the [*server.js*](https://github.com/uhray/boilerplate/blob/master/server.js#L52-L60) file. The actual HTML shells are stored in the backend's [shells directory](https://github.com/uhray/boilerplate/tree/master/app/backend/shells). 

By default, the Uhray Boilerplace comes with one shell ([*main.html*](https://github.com/uhray/boilerplate/blob/master/app/backend/shells/main.html)) that sets up some basic meta tags, links 3 stylesheets, provides a container for the frontend content to be embedded, and loads the frontend JavaScript code.

#### Adding a New Shell

In order to add a new shell, you need to do 2 things:

 1. Create a new HTML template in the backend's [shells](https://github.com/uhray/boilerplate/tree/master/app/backend/shells) directory. This html file is a template that's computed using [mustache](https://www.npmjs.org/package/mustache-express).
 2. Add a new route in [*server.js*](https://github.com/uhray/boilerplate/blob/master/server.js) that renders the template you created in step 1.

> Note: The server.js file first configures the API routes which by default will be ```/api/*```. Next, the server configures the routes for shells specified in the [*server.js*](https://github.com/uhray/boilerplate/blob/master/server.js) file. By default, we just have one route ```/*``` that will catch anything that doesn't match the API routes and render the [main.html](https://github.com/uhray/boilerplate/blob/master/app/backend/shells/main.html) shell. If you add a new shell, you must either define it before our default route, or change our default route  to something that doesn't interfere with your new shell's route.
 

<br><br>
# FRONTEND DOCS

## Static Development

#### Basics
When developing web applications, we find it easiest to implement static front-end pages with hard-coded data to establish the look and feel of the web app's pages without worrying about any backend development. The Uhray Boilerplate provides an easy way to code and host these frontend pages during static development. If this approach does not fit your workflow, feel free to disregard this entire section -- it's exclusively for convenience.

#### Static Page Organization

In addition to the backend and frontend parts of the Boilerplate's app directory, there is also a [static](https://github.com/uhray/boilerplate/tree/master/app/static) directory.

```bash
app/
	backend/
	frontend/
	static/
		_layout.html
		home.html
```

The *_layout.html* file is an HTML skeleton that has some basic meta tag information and several CSS links. By default, every other HTML page in the static directory, like home.html, will extend the *_layout.html* file. 

#### Static Page Styling (CSS/SCSS)

By default, the _layout.html has 3 CSS links. 

 1. Normalize.css (common fixes for consistent browser compatibility)
 2. HTML5 Boilerplate's main.css (cross-browser styling)
 3. Uhray Boilerplate's main.css (starting place for your styling rules)

You can extend the base CSS by adding CSS/SCSS rules to the [main.scss](https://github.com/uhray/boilerplate/blob/master/app/frontend/styles/main.scss) file in the frontend styles directory. 

>Note: The difference in file extensions (*.css from _layout.html* vs *.scss from frontend styles directory*) will be resolved during the application's build process. By default, all SCSS files are converted to CSS files with the same base filename. These converted CSS files will be placed within a /css directory within the /styles directory. See [Build Options](#build-options) for additional information.

The best part about doing static development this way is that when you're ready to build an interactive application, your templates and styling are pretty much complete.

#### Viewing Static Pages

In the root directory of the Uhray Boilerplate, there is a [*static.js*](https://github.com/uhray/boilerplate/blob/master/static.js) file. This is very similar to the *server.js* file that runs your actual web application, only without any server-side debugging and without some of the express middleware. It's setup to display a list of all your static pages. You can launch the static server by running the following command from the Uhray Boilerplate root directory:

``` gulp static```

Once started, the server should log something like:

```21:48:47 static.1 | App listening on port 5200```

Open your browser to the localhost on the specified port (i.e. ```localhost:5200```). You'll be able to see updates to any newly saved static file code simply by refreshing your browser.

## Configuring Frontend

Configuration is located in [app/frontend/configure.js](../app/frontend/configure.js).

The frontend is configured via [requirejs](http://requirejs.org/) and is set up nicely to use the [requirejs-loader-plugin](https://github.com/uhray/requirejs-loader-plugin). If there are any questions on how to add new modules, consult either of those two links. Requirejs is very powerful and consequently very complicated, but the loader plugin is supposed to help ease some things.

Also, because of the line in the configure.js file that sets the shim: `router:   ['loader!']`, all things configured with the [requirejs-loader-plugin](https://github.com/uhray/requirejs-loader-plugin) are loaded up before anything starts. This is important for things like extending Ractive.

## Pages

Each page of the web application is defined as a directory of 2 files within the frontend [pages](https://github.com/uhray/boilerplate/tree/master/app/frontend/pages) directory:

1. Ractive Template
2. Ractive JavaScript File

The page that is loaded and displayed to the user depends on the URL. See [Routing](#routing) for additional information.

#### Ractive Template

The Ractive template is simply a snippet of HTML that will be embedded into the shell on the frontend to display the application's page to the user. Ractive templates allow some cool stuff like Mustaches to facilitate data binding, proxy event directives for event-binding, and element transitions. Click [here](http://docs.ractivejs.org/latest/templates) for more information.

#### Ractive JavaScript File

There are three primary parts to this Ractive JavaScript file.

 1. Defining the Ractive Template.
 2. Defining the HTML element from the shell where the template should be embedded.
 3. Defining the data to bind to the template.

Additionally, you can also define [computed properties](http://docs.ractivejs.org/latest/computed-properties) and [components](http://docs.ractivejs.org/latest/components) to be used within the page. You can also set up [events](http://docs.ractivejs.org/latest/events-overview) or [observers](http://docs.ractivejs.org/latest/observers) in this file. There are many other things you can do by checking out the [Ractive Documentation](http://docs.ractivejs.org/latest/get-started).

#### Creating a New Page

To create a new page, you need to do several things:

 1. If the new page will need a new shell, see [Adding a New Shell](#adding-a-new-shell) for instructions.
 2. Create a new directory in the frontend [pages](https://github.com/uhray/boilerplate/tree/master/app/frontend/pages) directory.
 2. In this directory, create an Ractive Template (example: [*template.html*](https://github.com/uhray/boilerplate/blob/master/app/frontend/pages/home/template.html)).
 3. In this directory, create an Ractive JavaScript file (example: [*main.js*](https://github.com/uhray/boilerplate/blob/master/app/frontend/pages/home/main.js)).
 4. Update your [frontend routes](#routing) to define which URLs should load the new page.

#### Integrating MongoDB Data

When defining the data for your pages in the Ractive JavaScript file, you'll likely want to include real data from your MongoDB. When talking about the API, we referenced the use of [crud](https://github.com/uhray/crud), a module we created to assist with building APIs on the backend. We extended this module with some frontend capabilities that allow you to easily interact with and retrieve data from your REST API. Check out the [frontend crud documentation](https://github.com/uhray/crud#frontend) for more info.

Below is an example of how crud's backend and frontend code work together in your application.

First, in the backend API you recall that we setup resources which included crud entities/routes that defined what should be done given a particular API call. Here was one of them from the [*users.js*](https://github.com/uhray/boilerplate/blob/master/app/backend/api/resources/users.js) resource file. 

```js
// backend
crud.entity('/users/:_id').Read()
  .pipe(cm.findOne(Model, ['-turnkey']));
```

This backend API call finds the user with the specified ```_id``` and pipes the results to crud mongoose's [findOne function](https://github.com/uhray/crud-mongoose#findOne) which will remove the turnkey (password) information from the user's data before calling a callback with 2 arguments:  error and data. 

Now, since we have that backend API route, we can use crud on the frontend, as follows, to actually retrieve the user data of interest.

```js
// frontend
crud('/users', '53b705826000a64d08ae5f94');
  .read(function(e, d) {
    console.log('user info', e || d);
  }); 
```

The above code will call the appropriate API route and it's callback function will be called where ```e``` is any error that occurred and ```d``` will contain the user's data (user with _id of ```53b705826000a64d08ae5f94```) that can then be used in your application.

If your page requires a lot of data up-front before you instantiate an Ractive object,  we strongly recommend using [asyc](https://github.com/caolan/async). Async provides several operations for easily working with asynchronous JavaScript without needing to create a web of nested callback functions. After using async to retrieve all the data you need, you can then instantiate an Ractive object that uses the retrieved data.



## Routing

After the server has packaged up a backend shell and sent it over to the frontend, the [*router.js*](../app/frontend/router.js) file determines what frontend page should be loaded into the shell based on the URL. These routes are setup using [director](https://github.com/flatiron/director). 

> Note: We use [requirejs-loader-plugin](https://github.com/uhray/requirejs-loader-plugin) to load all the pages. See [Configuring Frontend](#configuring-frontend) for more info.

Below is a barebones example of the *router.js* file.
```js
define(
['director', 'loader!pages'],
function(Director, pages) {
	var routes = {
	    '/': pages.home
	},
        router = new Director(routes);

	router.init('/');
});
```

By default, this *router.js* file only has one route set up. It shows that given the ```'/'``` route, the home page *page.home* should be loaded. You can see [Configuring Frontend](#configuring-frontend) for more info on why `pages.home` is the home "page." the As you know from the [Pages](#Pages) documentation, loading a page's Ractive file will load up and render that page's *template.html* file with the appropriate data within the shell. 

## Styles

The [styles](https://github.com/uhray/boilerplate/tree/master/app/frontend/styles) directory is meant to house all of your application's custom styling rules. In addition to regular CSS files, Uhray Boilerplate allows you to put SCSS files in this directory. SCSS allows you to do [really cool things](http://sass-lang.com/guide) like use variables in CSS. By default, the [*main.scss*](https://github.com/uhray/boilerplate/blob/master/app/frontend/styles/main.scss) file is linked to all of your frontend pages and static templates, so you can simply extend this file with new CSS or SCSS styling rules. 

>Note: During the build process, all SCSS files are converted to CSS files with the same base filename. Also, all CSS files are run through [autoprefixer](https://github.com/postcss/autoprefixer) which automatically adds in any missing vender prefixes (-webit, -moz, -ms). These converted CSS files will be placed within a /css directory within the /styles directory. See [Build Options](#build-options) for additional information.

#### Adding a New Stylesheet

If you wish to create a new stylesheet for modularity or any other reason, simply add a new CSS or SCSS file in the frontend styles directory. 

```
styles/
	main.scss
	new_stylesheet.scss
```	

Next, you'll have to add a corresponding link tag to the base [_layout.html](https://github.com/uhray/boilerplate/blob/master/app/static/_layout.html) file for static development or the [backend shell](https://github.com/uhray/boilerplate/blob/master/app/backend/shells/main.html) for regular application development.

```
<link rel="stylesheet" href="/public/styles/css/new_stylesheet.css">
```

#### Editing CSS/SCSS Directly from Chrome DevTools

If you're like us, you love using Chrome DevTools to inspect HTML elements and easily change the styling of different elements in Chrome with immediate visual feedback. Uhray Boilerplate supports sourcemaps with its stylesheets allowing you to edit style rules directly in Chrome. This saves A LOT of time by preventing you from repeatedly switching between your stylesheets and Chrome DevTools throughout your design/development workflow.

Here's an introduction to source maps and a tutorial for setting everything up with Chrome: http://www.sitepoint.com/using-source-maps-debug-sass-chrome/

## Images

The [images](https://github.com/uhray/boilerplate/tree/master/app/frontend/images) directory is where you can put all of the images used within your application. By default, we've only included a favicon (*favicon.ico*) which is served via middleware in the [*server.js*](https://github.com/uhray/boilerplate/blob/master/server.js#L30-L31) file.

>Note: All images in this directory will be publicly hosted with your application.

## Ractive-plugins

The [ractive-plugins](../app/frontend/ractive-plugins) directory is broken down into the different types of plugins. Pay attention to the information in each type of plugin's README.md and follow the [ractive documentation](http://docs.ractivejs.org/latest/plugins) on plugins.

## Modules

The frontend [modules](https://github.com/uhray/boilerplate/tree/master/app/frontend/modules) directory is simply a place to put reusable JavaScript code. The use cases are virtually endless, and by default there are a bunch of useful [tools](../app/frontend/modules/tools.js) but here's a simple example.

#### Example

Let's say you are storing a user's title (Mr, Mrs, etc.), first name, and last name separately in MongoDB. You want a simple function that creates a display name for that user, combining their title, first, and last name. You plan to reuse this function all throughout your application's frontend code.

First you create a JavaScript file in the modules directory, say *tools.js* because you anticipate you'll create many other useful abstractions throughout development and put them in this same file.

```js 
// tools.js
define([], function() {
	var tools = {};
	tools.display_name = function(title, firstname, lastname) {
		return title + " " + firstname + " " + lastname;
	};
	return tools;
});
```

Now, on any frontend JavaScript page, you can require this *tools.js* file via require.js and utilize your display_name function as follows:

```js
define(['crud','modules/tools'], 
function(crud, tools) {
	crud('/users', '53b705826000a64d08ae5f94').read(function(e, user) {
		var name = tools.display_name(user.title, user.first, user.last);
		// do whatever you want with name
	});
});
```

This example is pretty trivial, but it really does help to abstract larger chunks of code for things like complex computations, algorithms, etc. in order to keep the rest of your frontend code clean and readable.

We also place code that interacts with the shell in this modules directory. We do this to prevent needing to play such code in all of your frontend pages.



<br>
# OTHER DOCS

## Package Management

#### Backend Package Management

Uhray Boilerplate uses [npm](https://www.npmjs.org/) as a backend package manager. As of now, npm comes bundled with [node](http://nodejs.org/). To add an npm package to your application, all you need to do is add it to the [package.json](https://github.com/uhray/boilerplate/blob/master/package.json) file in the root Uhray Boilerplate directory. You can do this 1 of 2 ways:

 1. Manually edit *package.json* and re-build your application server.
 2. Run ```npm install <package-name> [--save|--save-dev]``` from the command line and re-build your application.

>Note: The npm packages under *devDependencies* in the *package.json* file will only be installed when the dev server is run. Therefore, these packages will not be installed or available in production. See [Build Options](#build-options) for more information.

#### Frontend Package Management

Uhray Boilerplate uses [bower](http://bower.io/) as a frontend package manager. To add a bower package to your application, all you need to do is add it to the [*bower.json*](https://github.com/uhray/boilerplate/blob/master/bower.json) file. You can do this 1 of 2 ways:

 1. Manually edit *bower.json* and re-build your application.
 2. Run ```bower install <package-name> [--save|--save-dev]``` from the command line and re-build your application.

>Note: If you wish to include a GitHub module in your application, but it's not on bower, you can still include it by providing the Github HTTPS URL (with ```https://``` replaced with ```git://```) for the desired GitHub repository in the *bower.json* file as shown [here](https://github.com/uhray/boilerplate/blob/master/bower.json#L10).

#### Require.js

We use *require.js* as a file and module loader on the frontend. The frontend's [configure.js](https://github.com/uhray/boilerplate/blob/master/app/frontend/configure.js) file is the main configuration file for *require.js*.


## Linting

The Uhray Boilerplate comes with [jscs](https://www.npmjs.org/package/jscs), a JavaScript linter that will check all of your javascript files for potential errors. You can run the linter from the root Boilerplate directory by running:

```gulp lint```

You can configure specific options for the linter in the [*.jscs.json*](https://github.com/uhray/boilerplate/blob/master/.jscs.json) file in the root Boilerplate directory. A list of available options are [here](https://github.com/jscs-dev/node-jscs#options).

## Build Options

Uhray Boilerplate uses [gulp](http://gulpjs.com/) as a build system and comes with several pre-configured build types. You can create, modify, or delete any of these build types from the [gulpfile.js](https://github.com/uhray/boilerplate/blob/master/gulpfile.js) file. You can run any of the following build commands from the root Uhray Boilerplate directory.

#### Default

Command: ```gulp```. This default build command will simply display the available build types.

#### Install

Command: ```gulp install```. This install build does 3 things:

 1. Installs npm packages from *package.json*.
 2. Cleans out bower cache.
 3. Installs bower packages from *bower.json*.


#### Static

Command: ```gulp static```. This static build is for starting the static server when developing static application pages as documented in [Static Development](#static-development). It does 4 things:

 1. Performs a gulp install.
 2. Converts all SCSS files to CSS files & runs [autoprefixer](http://css-tricks.com/autoprefixer/).
 3. Starts the static server (*static.js*), hosting all static pages.
 4. Watches for changes to any SCSS files and auto-converts to CSS on the fly.

#### Dev

Command: ```gulp dev```. This dev build is for starting the development server when working on the interactive web application. It does 4 things:

 1. Performs a gulp install.
 2. Converts all SCSS files to CSS files & runs [autoprefixer](http://css-tricks.com/autoprefixer/).
 3. Starts the development server (*server.js* in dev-mode), hosting the web app.
 4. Watches for changes to any SCSS files and auto-converts to CSS on the fly.

#### Prod

Command: ```gulp prod```. This prod build is for starting the production server when testing the web application. It does 4 things:

 1. Performs a gulp install.
 2. Converts all SCSS files to CSS files & runs [autoprefixer](http://css-tricks.com/autoprefixer/).
 3. Minifies all JavaScript files.
 4. Starts the production server (*server.js* in prod-mode), hosting the production web app.

#### Prod Test

Command: ```gulp prod_test```. This prod build is for starting the production server when testing the web application and have it re-build the minified js and the css files. It does 6 things:

 1. Performs a gulp install.
 2. Converts all SCSS files to CSS files & runs [autoprefixer](http://css-tricks.com/autoprefixer/).
 3. Minifies all JavaScript files.
 4. Starts the production server (*server.js* in prod-mode), hosting the production web app.
 5. Watches for changes to any SCSS files and auto-converts to CSS on the fly.
 6. Watches for changes to any js files and auto-minifies fly.

#### Lint

Command: ```gulp lint```. This lint build is for linting the application's codebase for possible errors. Right now, this only runs the JavaScript linter [jscs](https://www.npmjs.org/package/jscs). See [Linting Docs](#linting) for more information.


## Heroku Deployment

#### Setting Up Heroku
 1. If you haven't already, you need to create an account on [Heroku](https://www.heroku.com/)
 2. If you haven't already, you need to [install the Heroku CLI](https://devcenter.heroku.com/articles/getting-started-with-nodejs#set-up).
 3. If you haven't already, you need to login to Heroku on the command line by running: 
	 
	 ```heroku login```
	 
 4. Ensure your web application is a functioning git repository with a *package.json* and a *Procfile* in the application's root directory.
 
	>Note: Heroku knows what command to run to start your application by looking in the Procfile for the [*web* command](https://github.com/uhray/boilerplate/blob/master/Procfile#L2). Heroku then uses [foreman](https://github.com/ddollar/foreman) and runs ```foreman start web``` to fire up your application. By default, the web command for the Uhray Boilerplate is ```node server.js PRODUCTION```. You can try running this command to verify that everything is working properly before you deploy.
 
 5. Create an app on Heroku from your application's root directory, preparing Heroku to receive your source code. You can do this one of two ways. 

 
	 Option 1 is running the new beta command that uses HTTP-git: 
	
	```heroku create --http-git```.

	Option 2 is running the traditional command that uses SSH: 

	```heroku create```. 
	
	 >Note: Option 2 above requires you to have SSH configured properly on your local development machine. Click [here](https://www.digitalocean.com/community/tutorials/how-to-set-up-ssh-keys--2) for more information.

	After running Option 1 or Option 2, you should see something similar to this:

	```bash
	Creating sharp-rain-871... done, stack is cedar-14
http://sharp-rain-871.herokuapp.com/ | https://git.heroku.com/sharp-rain-871.git
	```

	You not have a git remote called *heroku* that is associated with your local git repository a.k.a. your application.

#### Deploying Code

 1. Run ```git pull origin master``` to make sure your code is up-to-date
 2. Run ```gulp prod```
 3. Exit out of the production server
 4. Commit code:

	```git commit -am "blah blah blah"```

 5. Push your code to the GitHub repo:
 
	 ```git push origin master```
 
 6. Now deploy your code to Heroku by running: 
	
	 ```git push heroku master```
 
 7. Ensure that at least one instance of the app is running by running:

	 ``` heroku ps:scale web=1```
	 
 8. Make sure Heroku has all necessary environment variables, through the Heroku CLI or through the online interface. 

 9. Check out your app by running:
	
	 ```heroku open```

