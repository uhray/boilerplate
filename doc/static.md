Building a Static Design
=============

The boilerplate has a helpful mode for developing a static design. Basically, it allows you to create the stylesheet(s) in the same git repository for static designing and then transition them over to the dynamic designs with the same version control.


## Creating styles

You can go to [lib/public/css/main.css](../lib/public/css/main.css) to create styles.

## Creating HTML

Create jade files in [lib/views/static](../lib/views/static) to create jade files.

To auto include the css styling, add `extends _include` to the top of the jade file and then place all jade templating in a `block body`. See [lib/views/static/home.jade](../lib/views/static/home.jade) as an example.

To view the page for 'home.jade', go to `localhost:3000/home`. You can add anymore jade templates you wish.

## Deploying

Run `node static.js`. See [deploying](deploying.md) for more info.

