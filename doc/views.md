About Jade Views
=============

There is one main jade view, [lib/views/main.jade](../lib/views/main.jade), that comes packaged in the boilerplate. By default, this view will be loaded for every frontend page. So, you should only put things in here that every frontend page wants.

If you want more than one view, depending on the certain things, you can add multiple views here and edit the [server.js](../server.js) file. This would be using boilerplate in "expert mode".

Additionally, you can edit the [server.js](../server.js) file to provide more variables from the server side to Jade. These would be variables that are needed for each page. Of the variables passed to jade, the `locals` variable contains an object that is provided as global to the frontend javascript under the global variable `_locals`. We recommend using the to proide interesting serverside data to the frontend, such as user information.

For documentation on jade templating, see [jade-lang.com](http://jade-lang.com/).
