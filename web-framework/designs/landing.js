/* jslint browser: true, jquery: true, asi: true */
/* globals google: false */
(function($) {
  'use strict'

  // Appear-on-scroll Animation Support
  //
  // Requires:
  // Animate.css - https://daneden.github.io/animate.css/
  // jquery.appear - https://github.com/bas2k/jquery.appear/
  // jquery.countTo - https://github.com/mhuggins/jquery-countTo/
  //
  // Define animation blocks like so:
  //
  //     <div class="animated" data-animation="fadeInDown" data-delay="1"></div>
  //
  // Count to a number using this inside .animated like this:
  //
  //     <div class="animated counter">
  //       <span class="timer" data-from="0" data-to="4800">4800</span>
  //     </div>
  //
  // The block will animate when it is scrolled into view.

  // Stop animations on small screens
  if ($(window).width() < 768) {
    $('.animated').removeClass('animated transparent')
  }

  function animate(element, animation) {
    element.addClass(animation + " opaque").removeClass('transparent')
    if (element.hasClass('counter')) {
      element.find('.timer').countTo()
    }
  }

  $('.animated').addClass('transparent').appear(function() {
    var element = $(this)
    var animation = element.data('animation')
    var animationDelay = element.data('delay')

    if (animationDelay) {
      setTimeout(function() {
        animate(element, animation)
      }, animationDelay)
    } else {
      animate(element, animation)
    }
  }, {accY: -150})



  // jQuery for page scrolling feature - requires jQuery Easing plugin
  $('a.page-scroll').bind('click', function(event) {
    var anchor = $(this)
    $('html, body').stop().animate({
      scrollTop: $(anchor.attr('href')).offset().top - $('.navbar-custom').height() * 1.2
    }, 1000, 'easeInOutExpo')
    event.preventDefault()
  })

  // Closes the Responsive Menu on Menu Item Click
  $('.navbar-collapse ul li a').click(function() {
    if ($(this).attr('class') !== 'dropdown-toggle active' &&
        $(this).attr('class') !== 'dropdown-toggle') {
      $('.navbar-toggle:visible').click()
    }
  })

  // Google Maps
  if (typeof google !== 'undefined') {
    var map = null
    var mapMarker = null

    // When the window has finished loading create our google map below
    google.maps.event.addDomListener(window, 'load', function() {

      // Get the HTML DOM element that will contain your map
      // We are using a div with id="map" seen below in the <body>
      var mapElement = document.getElementById('map')

      // Get the marker's lat and long from the DOM
      var mapData = $(mapElement).data()
      mapMarker = new google.maps.LatLng(
        parseFloat(mapData.markerLat), parseFloat(mapData.markerLng))

      // Basic options for a simple Google Map`
      // For more options see: https://developers.google.com/maps/documentation/javascript/reference#MapOptions
      var mapOptions = {
        zoom: 6,
        center: mapMarker,
        mapTypeId: google.maps.MapTypeId.HYBRID,
        disableDefaultUI: true,
        scrollwheel: false,
        draggable: true
      }

      // Create the Google Map using out element and options defined above
      map = new google.maps.Map(mapElement, mapOptions)

      // Custom Map Marker icon
      var image = 'https://www.jcu.edu.au/__data/assets/file/0007/285460/marker.svg'  // Mega hack for quick Squiz Matrix URL
      var locationMarker = new google.maps.Marker({
        position: mapMarker,
        map: map,
        icon: image
      })
      locationMarker.addListener('click', function() {
        map.setCenter(mapMarker)
        map.setZoom(16)
      })
    })
    google.maps.event.addDomListener(window, 'resize', function() {
      map.setCenter(mapMarker)
    })
  }
})(jQuery)
