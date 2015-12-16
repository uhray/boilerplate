define(['jquery', 'lodash'],
function($, _) {
  var tools = {};

  // ==============================  METHODS  =================================

  tools.uuid = function() {
    function s4() {
      return Math.floor((1 + Math.random()) * 0x10000)
                 .toString(16)
                 .substring(1);
    };

    return s4() + s4() + '-' + s4() + '-' + s4() + '-' +
           s4() + '-' + s4() + s4() + s4();
  }

  tools.merge = function(a, b) {
    for (var k in b) a[k] = b[k];
    return a;
  }

  return tools;
});
