define(
['jquery', 'lodash', 'semantic'],
function($, _) {
  var onHold;

  $(document).ready(function() {
    // fix menu when passed

    $('#about').visibility({
      once: false,
      onBottomVisible: function() {
        $('.fixed.menu').transition('fade in');
      },
      onBottomVisibleReverse: function() {
        $('.fixed.menu').transition('fade out');
      }
    });

    // create sidebar and attach to menu open
    $('.ui.sidebar')
      .sidebar('attach events', '.toc.item');

    // Nav links in menus should smooth scroll
    $('a[href*=#]:not([href=#])').click(function() {
      var p = location.pathname,
          meta = { method: _locals.meta },
          ids = { user: _locals.user._id },
          as = $('.ui.menu a'),
          h = this.hash,
          target;

      if (p.replace(/^\//, '') == this.pathname.replace(/^\//, '') &&
          location.hostname == this.hostname) {
        target = $(this.hash);
        target = target.length
                   ? target
                   : $('[name=' + this.hash.slice(1) + ']');

        onHold = true;

        as.removeClass('active');

        $('.ui.menu a[href=' + h + ']').addClass('active');

        if (target.length) {
          $('html,body').animate({
            scrollTop: target.offset().top - 30
          }, 1000, function() { onHold = false; });
          return false;
        }
      }
    });

    $(window).scroll(_.throttle(function() {
      var nav = document.querySelector('nav'),
          mid = window.innerHeight / 2,
          as = $('.ui.menu a'),
          slides = document.querySelectorAll('.slide'),
          i, s, t, b, id, activeOne;

      if (onHold) return;

      for (i = 0; i < slides.length; ++i) {
        s = slides[i];
        t = s.getBoundingClientRect().top;
        id = s.id;
        nav = $('.ui.menu a[href=#' + id + ']');

        if (t <= mid) activeOne = $('.ui.menu a[href=#' + id + ']');
      }

      as.removeClass('active');
      if (activeOne) activeOne.addClass('active');
    }, 30));
  });
});
