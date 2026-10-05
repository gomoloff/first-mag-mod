/**
 * First Mag - Custom Theme Scripts
 * 2026 Light Cyber Space Edition
 */
jQuery(document).ready(function($) {
  'use strict';

  // 1. Mobile Menu / Navbar collapse toggle
  $('.navbar-toggle').on('click', function(e) {
    e.preventDefault();
    var target = $(this).data('target') || '.navbar-1-collapse';
    $(target).toggleClass('in show');
  });

  // 2. Dropdown hover & tap compatibility
  if (window.innerWidth >= 768) {
    $('.navbar-nav .dropdown').hover(
      function() { $(this).addClass('open'); },
      function() { $(this).removeClass('open'); }
    );
  }

  // 3. Smooth Back-To-Top Button
  var $backTop = $('#back-top');
  $(window).on('scroll', function() {
    if ($(this).scrollTop() > 180) {
      $backTop.fadeIn(200);
    } else {
      $backTop.fadeOut(200);
    }
  });

  $backTop.find('a').on('click', function(e) {
    e.preventDefault();
    $('html, body').animate({ scrollTop: 0 }, 500);
  });

  // 4. FlexSlider Init (if present)
  if ($.fn.flexslider && $('#slider').length) {
    $('#slider').flexslider({
      animation: 'slide',
      controlNav: true,
      directionNav: true,
      animationLoop: true,
      slideshow: true,
      slideshowSpeed: 6000,
      animationSpeed: 500,
      prevText: '',
      nextText: '',
      start: function(slider) {
        slider.removeClass('slider-loading');
      }
    });
  }

  // 5. Background Switcher listener
  $(document).on('click', '[data-bg-mode]', function(e) {
    e.preventDefault();
    var mode = $(this).data('bg-mode');
    if (window.SpaceCanvas) {
      window.SpaceCanvas.setBackgroundMode(mode);
    }
  });
});
