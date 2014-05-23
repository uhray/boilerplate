define(
[ 'lodash', 'page', 'utools', 'jade!partials/header', 'modernizr' ],
function(_, page, utools, vh) {

  console.log('in main');
  console.log('page', !!page);
  console.log('lodash', !!_);
  console.log('utools', !!utools);
  console.log('view', !!vh);

});
