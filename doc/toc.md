# Table of Contents
**Intro**
* [What's the point?](#whats-the-point)
* [Codebase Organization](#codebase-organization)
* [Quick Start](#quick-start)

**Docs**
* [Design an API](api.md)
* [Configuring Shells](shells.md)
* [Creating Pages on the App](pages.md)
* [Server Configuration](configuration.md)
* [Directory Structure Overview](directories.md)
* [Deploy, Build, and Lint](deploy.md)

## What's the point?
We set out to build a collection of tech tools, both internally developed and externally leverages, that would allow developers to easily and efficiently create modern web applications. We wanted to organize the codebase according to how we traditionally think about web applications (page-centric, complete separation of frontend and backend, etc). Lastly, we wanted to create a framework with complete transparency and no magic. This gives the developer complete flexibility to do virtually anything he desires, however he chooses, without being pigeonholed or restricted to the confines of typical development frameworks. The end result is the Uhray Boilerplate.

## Codebase Organization

The root project directory contains many files and directories primarily related to the application server, configurations, build commands, etc. We'll get into many of these specifics later, but the primary file of importance is *server.js* which is the application server. The real meat of the Uhray boilerplate is within the app directory where there are three sub-directories: static, frontend, and backend. 

```
app/
	backend/
		api/
			resources/
			index.js
		shells/
	frontend/
		components/
		images/
		modules/
		pages
		styles
		configure.js
		router.js
	static/
server.js
static.js
```

### 1. Backend
The backend directory houses two important components to a web application, the API and what we call *shells*.

**API**<br>
By default, Uhray's boilerplate is setup for use with a MongoDB database, using Mongoose for database connectivity and querying. It also comes setup for the creation of a REST API built on top of [crud](https://github.com/uhray/crud) and [crud-mongoose](https://github.com/uhray/crud-mongoose), modules developed by Uhray which allow a developer to easily setup configurable Create (C), Read (R), Update (U), and Delete(D) capabilities for database resources. Each resource file in the resources directory establishes the schema for that particular model and then defines the API routes for interacting with the resource.

**Shells**<br>
In the server.js file in the Boilerplate directory, you can see where routes are configured for particular shells. When the server receives a request for a particular route, it responds with a rendered shell, a skeleton of static HTML & CSS that is sent to the client-side and immediately displayed before the frontend takes care of loading the remainder of the elements and data into the main body of the page. The advantage here is that we can update data on the frontend as we move between pages without re-requesting the content. This makes for a faster and more seamless user experience with fewer page loads/refreshes. Of course you can have different shells load when different styling is desired between pages by configuring routes in the *server.js* file. 

### 2. Frontend

**Components**<br>
The components directory houses reusable frontend widgets that are packages just like pages, with an HTML/Mustache template and an Ractive Javascript file.

**Images**<br>
As the name suggests, the images directory houses images to be displayed within the application.

**Modules**<br>
The modules directory is simply a place to store reuseable javascript code within the application.

**Pages**<br>
Once the server sets up the REST API and sends over a shell to the frontend, the *router.js* file handles which page should be loaded based on the URL. Each page inside of the pages directory consists of two files:

 1. HTML template with Mustache for embedding content
 2. Ractive Javascript file
	 - defines data, filter functions, and events for the page
	 - renders page with embedded content within the shell

**Styles**<br>
The styles directory houses CSS/SCSS files for styling frontend page elements. 

### 3. Static
The static directory is a place for quickly designing static front-end HTML web pages which are styled with the CSS files from the frontend style's directory. This is useful for establishing the look and feel of a web application without available data or a functional API. These static pages will often become the HTML/Mustache templates for the frontend pages of the web application.

## Quick Start

Dependencies:  node, npm, bower
```bash
git clone git@github.com:uhray/boilerplate.git
cd boilerplate
npm install && bower install
node server.js
// Application should now be running at http://localhost:5000
```
