About the CSS
=============

The boilerplate comes with the following:

* Includes [normalize.css](http://necolas.github.com/normalize.css/) for CSS normalizations and common bug fixes.
* Includes [html5-boilerplate](https://github.com/h5bp/html5-boilerplate) main css for cross-browser default styles.
* The latest [Modernizr](http://modernizr.com/) build for feature detection.
* Built in (but removable) CSS element reset. (see [main.css](../lib/public/css/main.css)).

## Normalize.css

Normalize.css is a modern, HTML5-ready alternative to CSS resets. It contains extensive inline documentation. Please refer to the Normalize.css project for more information.

## Modernizr

Modernizr puts a number of classed on the `html` parent element to indicate browser capabilities. Your style sheet can use these for browser-specific styling.

## CSS Element Reset

The reset starts the page with a number of reset elements. Feel free to remove this, but for the most part we expect you to want to customize your own styles without these defaults in the way.

## Customizing your own styles

Add your own styles to the [main.css](../lib/public/css/main.css) stylesheet.

These styles will be loaded for every page, including those in [static](static.md) development.

If you wish to separate code into many stylesheets, you will need to edit the [lib/views/static/_include.jade](../lib/views/static/_include.jade) file for static pages and the [lib/views/main.jade](../lib/views/main.jade) for other files.
