Building the Boilerplate
=============

For building everything, you need to run `npm install` from the root directory of the project. This will install all [npm](#npm-installation) and [bower](#bower-installation) dependencies as well as run the [r.js optimization](#rjs-javascript-optimization).

Read below for how to configure more.

## NPM Installation

The node package manager ([npm](http://npmjs.org)), allows easy node module installation.

To add a new module to the project, run `npm install --save <module name>`. It's recommend you use the `--save` option instead of adding modules manually because the exact version istalled will be saved for future use.

## Bower Installation

[Bower](http://bower.io) allows easy frontend javascript module installation.

To install all dependencies in the [bower.json](../bower.json) file, run `bower install` from the projects root directory.

All modules, because of the [.bower.rc](../.bowerrc) file, will be installed into `lib/public/bower_components`, which is git-ignored.

To add a new module to the project, run `bower install --save <module name>`. It's recommend you use the `--save` option instead of adding modules manually because the exact version istalled will be saved for future use. Then, you will need to figure out the path to the file installed that you want to access publically and add it to [lib/public/js/configure.js](../lib/public/js/configure.js) so you can require it in the [javascript](js.md).


## r.js Javascript Optimization

The [r.js](https://github.com/jrburke/r.js) optimization takes all the publicly hosted javascript and minifies it into one file. This is useful for production mode.

The [build.js](../build.js) file descriptions the r.js optimization rules.

See [deploying](deploying.md) for how to deploy in production mode and use the optimized file.

