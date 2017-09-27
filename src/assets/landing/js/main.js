$(document).ready(function () {
	//Definition of the function (non-global, because of the previous line)
	function initializeLanding() {
		if (!$('.screenshot-slider').hasClass('slick-slider')) {

			/*----------------------------
			 Preloader js
			------------------------------ */
			$(window).on('load', function () { // makes sure the whole site is loaded
				$('.loader-container').fadeOut(); // will first fade out the loading animation
				$('.loader').delay(150).fadeOut('slow'); // will fade out the white DIV that covers the website.
				$('body').delay(150).css({ 'overflow': 'visible' })
			});


			/*----------------------------
			 jQuery Slick Nav
			------------------------------ */
			$(".main-menu").slicknav({
				prependTo: ".responsive-menu"
			});


			/*----------------------------
			   Sticky Header
			------------------------------ */
			$(window).on('scroll', function () {
				var scroll = $(window).scrollTop();
				if (scroll < 1) {
					$(".sticker").removeClass("sticky");
				} else {
					$(".sticker").addClass("sticky");
				}
			});

			/*----------------------------
			 On Click Show Search
			------------------------------ */
			$('#srch').on('click', function () {
				$('.search-box-area').addClass('show-srch');
			});
			$('#srch-close').on('click', function () {
				$('.search-box-area').removeClass('show-srch');
			});


			/*----------------------------------
				One Page Nav
			-----------------------------------*/

			var top_offset = $('.header-area').height() - -60;
			$('.main-menu nav ul').onePageNav({
				currentClass: 'active',
				scrollOffset: top_offset,
			});


			/*----------------------------
			 Wow js Active
			------------------------------ */
			new WOW().init();

			/*----------------------------
			 Owl Active
			------------------------------ */

			$('.screenshot-slider').slick({
				centerMode: true,
				centerPadding: '0px',
				slidesToShow: 3,
				dots: true,
				slidesToScroll: 3,
				responsive: [
					{
						breakpoint: 768,
						settings: {
							arrows: false,
							centerMode: true,
							centerPadding: '0px',
							slidesToShow: 3
						}
					},
					{
						breakpoint: 480,
						settings: {
							arrows: false,
							centerMode: true,
							centerPadding: '0px',
							slidesToShow: 1
						}
					}
				]
			});

			/*----------------------------
			 MagnificPopup Active
			------------------------------ */

			$('.video-play-btn').magnificPopup({
				type: 'video',
			});

			/*----------------------------
			 Nivo Slider
			------------------------------ */
			$('#slider-active').nivoSlider({
				effect: 'random',
				directionNav: true,
				animSpeed: 2000,
				slices: 20,
				pauseTime: 5000,
				pauseOnHover: false,
				controlNav: false,
				manualAdvance: true,
				controlNav: false,
				prevText: '<i class="fa fa-caret-left nivo-prev-icon"></i>',
				nextText: '<i class="fa fa-caret-right nivo-next-icon"></i>'
			});

			/*--------------------------
			 ScrollUp
			---------------------------- */
			$.scrollUp({
				scrollText: '<i class="fa fa-arrow-up"></i>',
				easingType: 'linear',
				scrollSpeed: 1500,
				animation: 'fade'
			});
		}
	}

	//set an interval
	setInterval(initializeLanding, 1500);

	//Call the function
	initializeLanding();
});
