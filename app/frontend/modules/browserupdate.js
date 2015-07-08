var $buoop = {
  vs: { i:9, f:15, o:12.1, s:6.1 },
  c:2,
  reminder: 0,
  // test: true, // for testing purposes
  text: '<div class="overlay"></div>' +
        '<div class="text">' +
        '<h1>Browser Update Required</h1>' +
        '<p>You are using an <b>outdated</b> browser. Please ' +
        '<a href="http://browser-update.org/update-browser.html">' +
        'upgrade your browser</a> ' +
        'to improve your experience.' +
        '</p></div>'
};

function $buoF() {
  var e = document.createElement('script');
  e.src = '//browser-update.org/update.js';
  document.body.appendChild(e);
}

try {
  document.addEventListener('DOMContentLoaded', $buoF, false);
} catch (e) {
  window.attachEvent('onload', $buoF);
}
