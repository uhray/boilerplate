define(['jquery', 'lodash'],
function($, _) {
  var tools = {};

  // ==============================  METHODS  =================================

  tools.argArray = function(args) {
    return Array.prototype.slice.call(args, 0);
  }

  tools.id = tools.identity = function(d) {
    return d;
  }

  tools.insert = function(arr, idx, val) {
    arr.splice(idx, 0, val);
  }

  tools.removeIdx = function(arr, idx) {
    arr.splice(idx, 1);
  }

  tools.filter = function(list, fn) {
    var i = 0;
    while (i < list.length) {
      if (fn(list[i])) i++;
      else tools.removeIdx(list, i)
    }
  }

  tools.find = function(list, val, fn) {
    var fn = fn || tools.identity,
        i;
    for (i = 0; i < list.length; i++) {
      if (fn(list[i]) === val) return i;
    }
    return -1;
  };

  tools.find.get = function(list, val, fn) {
    var i = tools.find(list, val, fn);
    if (i >= 0) return list[i];
    return undefined;
  };

  tools.isin = function(list, val, fn) {
    return tools.find(list, val, fn) >= 0;
  };

  //returns a copy of an object
  tools.copy = function(_) {
    return JSON.parse(JSON.stringify(_));
  };

  // Joins strings to create a file path
  tools.join = function() {
    var route = '', n, slash, i;
    for (i in arguments) {
      n = String(arguments[i]);
      n = n.replace(/^\//, '');
      n = n.replace(/\/$/, '');
      slash = n.length ? '/' : '';
      route += slash + n
    };
    if (route == '') { route = '/'; };
    return route;
  };

  tools.forEach = function(d, fn) {
    var i;

    if ('length' in d) for (i = 0; i < d.length; i++) fn(d[i], i);
    else for (i in d) fn(d[i], i);
  };

  tools.set = function() {
    var args = tools.argArray(arguments),
        f = function(d, x) {
          var old = tools.get.apply(this, args)(d),
              last = args[args.length - 1];
          if (!d) return;
          args.forEach(function(x, idx) {
            if (idx == args.length - 1) return;
            d[x] = d[x] || {};
            d = d && d[x];
          });

          return {
            old: old,
            current: d[last] = x,
            change: !(x == old)
          }
        };

    return m(f);

    function m(f) {
      f.map = function(fn) {
        return m(function(d, x) { return f(d, fn(x)); })
      }
      return f;
    }
  }

  tools.get = function() {
    var args = tools.argArray(arguments),
        f = function(d) {
          args.forEach(function(x) { d = d && d[x]; });
          return d;
        };

    function m(f) {
      f.or = function(x) { return m(function(d) { return f(d) || x; }); };
      f.map = function(fn) { return m(function(d) { return fn(f(d)); }); };

      return f;
    }

    return m(f);
  };

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
