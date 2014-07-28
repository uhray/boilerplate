Deploying
=============

There are three ways to deploy a boilerplate template. They are described below.

## Static HTML/CSS Development

This mode is solely to work on developing a static html/css design before creating a webapp. See [static](static.md) documentation.

To run this mode, start the server with `node static.js`.

## Development Mode

This mode allows you to be editing javascript pages separately in their non-minified version and host the web application.

To run this mode, start the server with `foreman start dev`.

## Production Mode

This mode is so that all public javascript is hosted from the [r.js] optimized file. See [building](building.md#rjs-javascript-optimization) for more info. Additionally, the environment variables set in [.env](../.env) will be set.

To modify what happens in productio mode, you can either change the [.env](../.env) file for environment variables or update the command run in the [Procfile](../Procfile).

Note: this mode will be run by default if you deploy this app on heroku.

To run this mode, start the server with `foreman start`. See [foreman](https://github.com/ddollar/foreman) for it's documentation.

