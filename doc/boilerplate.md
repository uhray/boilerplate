# Uhray Boilerplate Docs

**Intro**
* [Quick Start](#quick-start)
* [Codebase Organization](#codebase-organization)

**Backend Docs**
* [API](#api)
* [Shells](#shells)
* [Server Configuration](#server-configuration)

**Frontend Docs**
* [Static Development](#static-development)
* [Routing](#routing)
* [Pages](#pages)
* [Styles](#styles)
* [Images](#images)
* [Components](#components)
* [Modules](#modules)

**Other Docs**
* [Package Management](#package-management)
* [Linting](#linting)
* [Build Options](#build-options)
* [Heroku Deployment](#heroku-deployment)


# Quick Start

Dependencies:
* [node](http://nodejs.org/)
* [npm](https://www.npmjs.org/) (now comes with node)
* [bower](http://bower.io/)

```bash
git clone git@github.com:uhray/boilerplate.git
cd boilerplate
npm install && bower install
node server.js
// Application should now be running at http://localhost:5000
```

# Codebase Organization

The root project directory contains many files and directories primarily related to the application server, configurations, build commands, etc. We'll get into many of these specifics later, but the primary file of importance is *server.js* which is the application server. The *static.js* file is similar, but only hosts static HTML/CSS pages, not an entire web application. The real meat of the Uhray boilerplate is within the app directory where there are three sub-directories: static, frontend, and backend. 

```
app/
	backend/
	frontend/
	static/
server.js
static.js
```

#### 1. Backend

The backend directory houses two important components to a web application, the API and what we call *shells*.

```
backend/
	api/
		resources/
		index.js
	shells/
```

**API**<br>
By default, Uhray's boilerplate is setup for use with a MongoDB database, using Mongoose for database connectivity and querying. It also comes setup for the creation of a REST API built on top of [crud](https://github.com/uhray/crud) and [crud-mongoose](https://github.com/uhray/crud-mongoose), modules developed by Uhray which allow a developer to easily setup configurable Create (C), Read (R), Update (U), and Delete(D) capabilities for database resources. Each resource file in the resources directory establishes the schema for that particular model and then defines the API routes for interacting with the resource.

**Shells**<br>
In the server.js file in the Boilerplate directory, you can see where routes are configured for particular shells. When the server receives a request for a particular route, it responds with a rendered shell, a skeleton of static HTML & CSS that is sent to the client-side and immediately displayed before the frontend takes care of loading the remainder of the elements and data into the main body of the page. The advantage here is that we can update data on the frontend as we move between pages without re-requesting the content. This makes for a faster and more seamless user experience with fewer page loads/refreshes. Of course you can have different shells load when different styling is desired between pages by configuring routes in the *server.js* file. 

#### 2. Frontend

The frontend directory all starts with the *router.js* file. After the server sends over a shell to the frontend, the *router.js* file handles which application page should be loaded based on the URL. Each page can utilize components, images, modules or styles in addition to it's own template and javascript rendering (Ractive.js).

```
frontend/
	components/
	images/
	modules/
	pages/
	styles/
	configure.js
	router.js
```

The frontend is intentionally designed to be page-centric, meaning that code is organized and structured around each page that will be in the web application. Inside of the pages directory, each page is defined as a directory itself consisting of 2 files:

 1. An HTML/Mustache template
 2. An Ractive.js File
	 - defines data, filter functions, and events for the page
	 - renders template with appropriate content before embedding within the shell

### 3. Static
The static directory is a place for quickly designing static front-end HTML web pages which are styled with the CSS files from the frontend style's directory. This is useful for establishing the look and feel of a web application without available data or a functional API. These static pages will often become the HTML/Mustache templates for the frontend pages of the web application.







