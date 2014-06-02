Developing an API
=============

Developing the API takes place in [lib/api](../lib/api), with the following file layout:

```
lib/api
├── controller.js
├── crud.js
├── document.js
├── index.js
├── models.js
```

When references files below, I will be refering to the ones in this directory. 

You will not need to modify `document.js` or `index.js`, as they are structural. All your work should be in `crud.js`, `controller.js`, or `models.js`.

## Server-side API Development

When developing and api, you should follow these two steps:

* [Create your models](#create-your-models)
* [Develop CRUD interface](#develop-crud-interface)
* [Establish controllers](#establish-controllers)

#### Create your models

In `models.js`, you need to connect to the database (if there is one, I suppose) and create the module.

We recommend, and have boilerplate pre-built, to use [mongoosejs](http://mongoosejs.com/). I suppose you could use anything else as well.

Follow mongoosejs (or whatever you use) documentation for how to develop schemas.

#### Develop CRUD interface

The CRUD interface is defined in `crud.js`. Using [crud](https://github.com/uhray/crud), you can define all the entities and routes for your api.

#### Establish controllers

Controllers, defined in `controllers.js`, are the functions that CRUD calls when a route is requested.

For example, if you have an entity `'/users'`, and there is a create crud route, you would want a controller method that creates a use (say, `controllers.users.create`).

## Client-side API connectivity

CRUD is currently under construction. But, the boilerplate will connect with cruds frontend interface when it is completed.

The frontend interface will all you to use requirejs to require `'crud'` and get the crud api frontend interface.

## Document

The [auto-doc](https://github.com/uhray/crud#autodoc) feature in CRUD is currently under development, but when available you can easily create documentation for your API:

From your main project directory, run:

`node lib/api/document.js`
