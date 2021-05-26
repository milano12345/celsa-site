/*
	Verti by HTML5 UP
	html5up.net | @ajlkn
	Free for personal and commercial use under the CCA 3.0 license (html5up.net/license)
*/

(function($) {

	var	$window = $(window),
		$body = $('body');

	// Breakpoints.
		breakpoints({
			xlarge:  [ '1281px',  '1680px' ],
			large:   [ '981px',   '1280px' ],
			medium:  [ '737px',   '980px'  ],
			small:   [ null,      '736px'  ]
		});

	// Play initial animations on page load.
		$window.on('load', function() {
			window.setTimeout(function() {
				$body.removeClass('is-preload');
			}, 100);
		});

	// Dropdowns.
		$('#nav > ul').dropotron({
			mode: 'fade',
			noOpenerFade: true,
			speed: 300
		});

	// Nav.

		// Toggle.
			$(
				'<div id="navToggle">' +
					'<a href="#navPanel" class="toggle"></a>' +
				'</div>'
			)
				.appendTo($body);

		// Panel.
			$(
				'<div id="navPanel">' +
					'<nav>' +
						$('#nav').navList() +
					'</nav>' +
				'</div>'
			)
				.appendTo($body)
				.panel({
					delay: 500,
					hideOnClick: true,
					hideOnSwipe: true,
					resetScroll: true,
					resetForms: true,
					side: 'left',
					target: $body,
					visibleClass: 'navPanel-visible'
				});

})(jQuery);

// SLIDER JAVASCRIPT

var wheel = Draggable.create("#wheel", {
	type:"rotation",
	throwProps:true,
	  snap:function(endValue) {
	   return Math.round(endValue / 90) * 90;
	},   
	 onDrag: function() {},
	 onThrowComplete: function() {
	   dragActive()
	 }
 });
 
 TweenMax.set('#wheel li:not(.active) .details > *', {
   opacity: 0,
   y: -10
 })
 
 // Calculate which product is active
 function dragActive() {
   var rot = wheel[0].rotation / 360
   var decimal = rot % 1
   var sliderLength = $('#wheel li').length
   var tempIndex = Math.round(sliderLength * decimal)
   var index
 
   if (rot < 0) {
	 index = Math.abs(tempIndex)
   } else {
	 index = sliderLength - tempIndex
   }
 
   if (decimal === 0) {
	 index = 0
   }
   
   TweenMax.staggerTo('#wheel li.active .details > *', 0.6,   {
	 opacity: 0,
	 y: -10
   }, 0.1)
 
   $('#wheel li.active').removeClass('active')
   $($('#wheel li')[index]).addClass('active')
   
   TweenMax.staggerTo('#wheel li.active .details > *', 0.6,   {
	 opacity: 1,
	 y: 0
   }, 0.1)
 
 }
 
 // Tween rotation
 function rotateDraggable(deg, callback) {
   var rot = wheel[0].rotation
   var tl = new TimelineMax()
 
   tl
	 .to('#wheel', .5, {
	   rotation: rot + deg,
	   onComplete: function() {
		 callback()
	   }
	 });
 
   wheel[0].rotation = rot + deg
 }
 
 // Handlers
 function nextHandler() {
   var current = $('#wheel li.active')
   var item = current + 1
   if (item > $('#wheel li').length) {
	 item = 1
   }
   rotateDraggable(360/$('#wheel li').length, dragActive);
 }
 
 function prevHandler() {
   var current = $('#wheel li.active')
   var item = current - 1
   if (item > 1) {
	 item = $('#wheel li').length
   }
   rotateDraggable(-360/$('#wheel li').length, dragActive);
 }
 
 $('.next').on('click', nextHandler);
 $('.prev').on('click', prevHandler);
 
 var square = '<svg x="0px" y="0px" width="1200px" height="600px" viewBox="0 0 1200 600"><rect x="0.002" y="0.499" width="1200" height="600"/></svg>'