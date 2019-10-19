// preloader
$(window).on('load', function() {
	$('.preloader').fadeOut(); 
	$('preloader .pl').delay(350).fadeOut('slow');
});



$(function() {

	// img.svg to inline svg
	inlineSVG.init();


	// Кастомные селекты
	$("select.ui-select").each(function() {
		var classes = $(this).attr("class"),
				id      = $(this).attr("id"),
				name    = $(this).attr("name");
		var template =  '<div class="' + classes + '">';
				template += '<div class="ui-select__trigger">' + $(this).data("placeholder") + '</div>';
				template += '<div class="ui-select__options">';
				template += '<div class="ui-select__simplebar" data-simplebar data-simplebar-auto-hide="false">';
				$(this).find("option").each(function() {
					template += '<span class="ui-select__option ' + $(this).attr("class") + '" data-value="' + $(this).attr("value") + '">' + $(this).html() + '</span>';
				});
		template += '</div></div></div>';
		$(this).addClass('ui-select__select');
		$(this).after(template);
	});
	$(".ui-select__trigger").on("click", function(event) {
		$('html').one('click',function() {
			$(".ui-select").removeClass("opened");
		});
		if( $(this).closest(".ui-select").hasClass('opened') ){
			$(this).closest(".ui-select").removeClass("opened");
		} else {
			$(".ui-select").removeClass("opened");
			$(this).closest(".ui-select").addClass("opened");
		}
		event.stopPropagation();
	});
	$(".ui-select__option").on("click", function() {
		$(this).closest(".ui-select").find("select").val($(this).data("value"));
		$(this).closest(".ui-select__options").find(".ui-select__option").removeClass("active");
		$(this).addClass("active");
		$(this).closest(".ui-select").removeClass("opened");
		$(this).closest(".ui-select").find(".ui-select__trigger").text($(this).text());
	});


	// данные для фильтра
	var filtersData = [
		// Стоимость
		{
			min: 1.95,
			max: 12.8,
			step: 0.05
		},
		// Площадь квартиры
		{
			min: 22,
			max: 158,
			step: 1
		},
		// Этаж
		{
			min: 1,
			max: 26,
			step: 1
		},
		// Площадь кухни
		{
			min: 12,
			max: 46,
			step: 1
		}
	];


	// запись значений ренджа в подсказки
	function putResults(val1, val2) {
		$('.ui-range__from').text(val1);
		$('.ui-range__to').text(val2);
	}


	function initRanges() {

		$('.ui-range__slider').each(function (i, el) {

			if( $(el).hasClass('ui-range-cost') ) {
				$('.ui-range-cost').slider({
					range: true,
					min: filtersData[0].min,
					max: filtersData[0].max,
					step: filtersData[0].step,
					values: [ filtersData[0].min, filtersData[0].max ],
					slide: function(event, ui) {
						$(el).closest('.ui-range').find('.ui-range__from').val(ui.values[0]);
						$(el).closest('.ui-range').find('.ui-range__to').val(ui.values[1]);
					}
				});
			}

			if( $(el).hasClass('ui-range-size') ) {
				$('.ui-range-size').slider({
					range: true,
					min: filtersData[1].min,
					max: filtersData[1].max,
					step: filtersData[1].step,
					values: [ filtersData[1].min, filtersData[1].max ],
					slide: function(event, ui) {
						$(el).closest('.ui-range').find('.ui-range__from').val(ui.values[0]);
						$(el).closest('.ui-range').find('.ui-range__to').val(ui.values[1]);
					}
				});
			}

			if( $(el).hasClass('ui-range-floor') ) {
				$('.ui-range-floor').slider({
					range: true,
					min: filtersData[2].min,
					max: filtersData[2].max,
					step: filtersData[2].step,
					values: [ filtersData[2].min, filtersData[2].max ],
					slide: function(event, ui) {
						$(el).closest('.ui-range').find('.ui-range__from').val(ui.values[0]);
						$(el).closest('.ui-range').find('.ui-range__to').val(ui.values[1]);
					}
				});
			}

			if( $(el).hasClass('ui-range-kitchen') ) {
				$('.ui-range-kitchen').slider({
					range: true,
					min: filtersData[3].min,
					max: filtersData[3].max,
					step: filtersData[3].step,
					values: [ filtersData[3].min, filtersData[3].max ],
					slide: function(event, ui) {
						$(el).closest('.ui-range').find('.ui-range__from').val(ui.values[0]);
						$(el).closest('.ui-range').find('.ui-range__to').val(ui.values[1]);
					}
				});
			}
			
		});


	}

	// Инициализация ползунков в фильтре при наличии таковых на странице
	initRanges();

	$('.ui-range__val').focusin(function () { 
		$(this).closest('.ui-range').addClass('ui-range--focus');
	});
	$('.ui-range__val').focusout(function () { 
		$(this).closest('.ui-range').removeClass('ui-range--focus');
	});


	// Тогл блок дополнительных фильтров
	$('.filter-additional').click(function (e) { 
		$(this).toggleClass('filter-additional--opened');
		$(this).closest('.filter').toggleClass('filter--toggle');
		$(this).closest('.filter').find('.filter__hidden').slideToggle(200);
	});




	var sliderPrevBtn = '<button type="button" class="slider-arrow slider-prev"><svg xmlns="http://www.w3.org/2000/svg" class="svg" width="12.121" height="6.811" viewBox="0 0 12.121 6.811"><g transform="translate(1.061 1.061)"><path d="M0,0,5,5l5-5" fill="none" stroke-linecap="round" stroke-linejoin="round" stroke-miterlimit="10" stroke-width="1.5"/></g></svg></button>',
	sliderNextBtn = '<button type="button" class="slider-arrow slider-next"><svg xmlns="http://www.w3.org/2000/svg" class="svg" width="12.121" height="6.811" viewBox="0 0 12.121 6.811"><g transform="translate(1.061 1.061)"><path d="M0,0,5,5l5-5" fill="none" stroke-linecap="round" stroke-linejoin="round" stroke-miterlimit="10" stroke-width="1.5"/></g></svg></button>';


	// Слайдеры на главной
	$('.bg-slider').slick({
		speed: 1800,
		autoplay: true,
		autoplaySpeed: 7000,
		asNavFor: '.main-slider',
		prevArrow: sliderPrevBtn,
		nextArrow: sliderNextBtn,
		responsive: [
			{
			  breakpoint: 768,
			  settings: {
				arrows: false
			  }
			}
		]
	});

	$('.main-slider').slick({
		arrows: false,
		autoplay: true,
		autoplaySpeed: 7000,
		dots: true,
		dotsClass: 'slider-dots',
		speed: 1800,
		fade: true,
		asNavFor: '.bg-slider',
	});

	// Слайдеры на странице ЖК
	$('#gallery-1').slick({
		infinite: false,
		speed: 800,
		fade: true,
		asNavFor: '#gallery-1-thumbs',
		prevArrow: sliderPrevBtn,
		nextArrow: sliderNextBtn,
		responsive: [
			{
			  breakpoint: 767,
			  settings: {
				arrows: false
			  }
			}
		]
	});
	
	$('#gallery-1-thumbs').slick({
		infinite: false,
		slidesToShow: 8,
		arrows: false,
		speed: 800,
		focusOnSelect: true,
		asNavFor: '#gallery-1',
		responsive: [
			{
			  breakpoint: 1199,
			  settings: {
				slidesToShow: 6,
			  }
			},
			{
				breakpoint: 767,
				settings: {
				  slidesToShow: 4,
				}
			}
		]
	});

	
	$('.advantages-slider-img').slick({
		// infinite: false,
		arrows: false,
		speed: 800,
		asNavFor: '.advantages-slider-text',
		dotsClass: 'slider-dots slider-dots--dark',
		responsive: [
			{
			  breakpoint: 1199,
			  settings: {
				dots: true
			  }
			}
		]
	});
	$('.advantages-slider-text').slick({
		// infinite: false,
		speed: 800,
		fade: true,
		asNavFor: '.advantages-slider-img',
		// prevArrow: sliderPrevBtn,
		// nextArrow: sliderNextBtn,
		arrows: false,
		dotsClass: 'slider-dots slider-dots--dark',
		responsive: [
			{
			  breakpoint: 1199,
			  settings: {
				arrows: false
			  }
			},
			{
				breakpoint: 767,
				settings: {
					adaptiveHeight: true
				}
			}
		]
	});

	$('.advantages-slider .slider-prev').click(function(){
		$('.advantages-slider-text').slick('slickPrev');
	});
	$('.advantages-slider .slider-next').click(function(){
		$('.advantages-slider-text').slick('slickNext');
	});




	$('#gallery-2').slick({
		infinite: false,
		speed: 800,
		fade: true,
		asNavFor: '#gallery-2-thumbs',
		prevArrow: sliderPrevBtn,
		nextArrow: sliderNextBtn,
		responsive: [
			{
			  breakpoint: 767,
			  settings: {
				arrows: false
			  }
			}
		]
	});
	
	$('#gallery-2-thumbs').slick({
		infinite: false,
		slidesToShow: 8,
		arrows: false,
		speed: 800,
		focusOnSelect: true,
		asNavFor: '#gallery-2',
		responsive: [
			{
			  breakpoint: 1199,
			  settings: {
				slidesToShow: 6,
			  }
			},
			{
				breakpoint: 767,
				settings: {
				  slidesToShow: 4,
				}
			}
		]
	});


	// BEGIN scrollspy в подменю на странице ЖК

	var scrollspyOffset;

	$('.scrollspy-menu a, .anchor-scroll').on('click', function(e){
		var id = $(this).attr('href');
		e.preventDefault();
		$('html,body').stop().animate({ scrollTop: $(id).offset().top-150 }, 1000);
	});

	function AnchorActive() {
		$('.scrollspy-item').each(function(e) {
			var dataName = $(this).attr('id');
			var posit = $(this).offset().top - 400;

			var windowPostition = $(window).scrollTop();

			if (windowPostition >= posit) {
				$('.scrollspy-menu a').removeClass('active');
				$('.scrollspy-menu [href="#'+ dataName + '"]').addClass('active');
			}

		});
	}

	
	function lineFixing() {
		if ( $(window).scrollTop() >= scrollspyOffset ) {
			$('.scrollspy-menu').addClass('scrollspy-menu--fixed');
			$('.wrapper').addClass('scrollspy-padding');
		} else {
			$('.scrollspy-menu').removeClass('scrollspy-menu--fixed');
			$('.wrapper').removeClass('scrollspy-padding');
		}
	}

	$(window).scroll(function() {
		AnchorActive();
		lineFixing();
	});


	// END scrollspy в подменю на странице ЖК

		
	/* Реинициализация элементов при ресайзе окна */
	$(window).on('load resize orientationchange', function() {

		// слайдер преимуществ на главной
        $('.advantages-list').each(function(){
            var $carousel = $(this);
            if ($(window).width() > 767) {
                if ($carousel.hasClass('slick-initialized')) {
                    $carousel.slick('unslick');
                }
            }
            else{
                if (!$carousel.hasClass('slick-initialized')) {
                    $carousel.slick({
						arrows: false,
						dots: true,
						dotsClass: 'slider-dots slider-dots--dark',
                        mobileFirst: true,
                    });
                }
            }
		});


		// ограничение количетсва символов в тексте карточки ЖК
		var symbolsCount;
		if ($(window).width() >= 1200) {
			symbolsCount = 205;
		} else if ($(window).width() < 1200 && $(window).width() > 992) {
			symbolsCount = 330;
		} else if ($(window).width() <= 992 && $(window).width() > 767) {
			symbolsCount = 235;
		} else if ($(window).width() <= 767 && $(window).width() > 575) {
			symbolsCount = 160;
		} else {
			symbolsCount = 130;
		}

		$('.my-readmore').each(function () {
			var str = $(this).find('p').text();
			if( str.length > symbolsCount ) {
				str = str.substr(0,symbolsCount-16) + "... ";
				var linkHref = $(this).closest('.quarter').find('.quarter-link').attr('href');
				var link = '<a href="' + linkHref + '"' + '>Читать далее</a>';
				$(this).find('p').text(str);
				$(this).find('p').append(link);
			}
		});


		// слайдер других объектов
		$('.project-data').each(function(){
            var $carousel = $(this);
            if ($(window).width() > 767) {
                if ($carousel.hasClass('slick-initialized')) {
                    $carousel.slick('unslick');
                }
            }
            else{
                if (!$carousel.hasClass('slick-initialized')) {
                    $carousel.slick({
						arrows: false,
						dots: true,
						dotsClass: 'slider-dots slider-dots--dark',
						mobileFirst: true,
						rows: 3
                    });
                }
            }
		});

		// слайдер других объектов
		$('.project-other').each(function(){
            var $carousel = $(this);
            if ($(window).width() > 1199) {
                if ($carousel.hasClass('slick-initialized')) {
                    $carousel.slick('unslick');
                }
            }
            else{
                if (!$carousel.hasClass('slick-initialized')) {
                    $carousel.slick({
						arrows: false,
						dots: true,
						dotsClass: 'slider-dots slider-dots--dark',
                        mobileFirst: true,
                    });
                }
            }
		});


		if( $('.scrollspy-menu').length ) {
			scrollspyOffset = $('.scrollspy-menu').offset().top -60;
		}
		AnchorActive();
		lineFixing();

		var $scrollSlider = $('.scrollspy-menu__slider');
		if ($(window).width() > 1199) {
			if ($scrollSlider.hasClass('slick-initialized')) {
				$scrollSlider.slick('unslick');
			}
		} else{
			if (!$scrollSlider.hasClass('slick-initialized')) {
				$scrollSlider.slick({
					infinite: false,
					speed: 500,
					slidesToShow: 8,
					// focusOnSelect: true,
					// centerMode: true,
					// centerPadding: '0px',
					variableWidth: true,
					responsive: [
						{
							breakpoint: 767,
							settings: {
								slidesToShow: 6,
							}
						},
						{
							breakpoint: 575,
							settings: {
								slidesToShow: 2
							}
						}
					]
				});
			}
			$(window).scroll(function() {
				var currentSlide = $('.scrollspy-menu .active').index();
				$scrollSlider.slick('slickGoTo', currentSlide-1);
			});
		}



	});



	// Инициализая кастомного скролбара
	if( $(window).width() > 1200 ) {
		if( $('#results-screen').length ) {
			new SimpleBar(document.getElementById('results-screen'), {
				autoHide: false
			});
		}
	}

	// Инициализая кастомного скролбара при ресайзе
	var addEvent = function(object, type, callback) {
		if (object == null || typeof(object) == 'undefined') return;
		if (object.addEventListener) {
			object.addEventListener(type, callback, false);
		} else if (object.attachEvent) {
			object.attachEvent("on" + type, callback);
		} else {
			object["on"+type] = callback;
		}
	};
	addEvent(window, "resize", function(event) {
		if( $('#results-screen').length ) {
			new SimpleBar(document.getElementById('results-screen'), {
				autoHide: false
			});
		}
	});



	// Jquery табы
	$(".js-tab").click(function() {
		var index = $(this).index();
		  $(this).closest('.js-tab-wrapper').find(".js-tab").removeClass("js-tab--active").eq(index).addClass("js-tab--active");
		  $(this).closest('.js-tab-wrapper').find(".js-tab-item").hide().eq(index).fadeIn("normal");
	});



	// Тогл блок в вакансиях
	$('.btn-vacancy').click(function (e) { 
		$(this).closest('.vacancy').toggleClass('vacancy--open');
	});

	// Вызов карточки квартиры
	$('.js-call-card').magnificPopup({
		items: {
			src: '#card-example',
			type: 'inline'
		},
		callbacks: {
			open: function() {
				$('.mfp-bg').addClass('mfp-card');
			}
		}
	});

	// Зум изображения в карточке квартиры
	$('.zoom-link').fancybox({
		buttons: [
			"close"
		]
	});

	$('.ipo-table__row').magnificPopup({
		items: {
			src: '#ipo-request',
			type: 'inline'
		}
	});
	$('.demo-modal-success').magnificPopup({
		items: {
			src: '#modal-success',
			type: 'inline'
		}
	});


	// Раскрытие карты в блоке результатов
	$('.results-geo__btn').click(function (e) { 
		$('.results-geo').toggleClass('results-geo-map');
	});

	// Тогл блок фильтров в мобильной версии
	$('.filter-mob').click(function (e) { 
		$(this).toggleClass('filter-mob-show');
		$('.filter-mob-collapse').slideToggle('100');
	});


	// Инпут с "плюс" "минус"
	$('.ui-quantity__btn').click(function(){
		var $_inp = $(this).closest('.ui-quantity').find('input');
		var $_step = +$(this).closest('.ui-quantity').data('step');
		if( $(this).hasClass('ui-quantity__minus') ) {
			var $_val = parseInt( $(this).closest('.ui-quantity').find('input').val().replace(/\s/g, '') ) - $_step;
		} else {
			var $_val = parseInt( $(this).closest('.ui-quantity').find('input').val().replace(/\s/g, '') ) + $_step;
		}
		$_val = ("" + $_val).replace(/(\d)(?=(\d\d\d)+([^\d]|$))/g, '$1 ');

		if( $_inp.hasClass('years') ) {
			$_inp.val( $_val + " лет" );
		} else {
			$_inp.val($_val);
		}

		$_inp.trigger('propertychange');
		return false;
	});
	$('.ui-quantity input').bind('input propertychange', function () {
		var $this = $(this);
		if ( $this.val().length == 0 || parseInt( $this.val() ) <= 0 )
		$this.val(1);
	});




	// Анимации кнопок
	// Кнопки CTA
	var animateCta = function(e) {

		// Для демо
		e.preventDefault();

		e.target.classList.remove('cta-animate');
			
		e.target.classList.add('cta-animate');
		setTimeout(function(){
			e.target.classList.remove('cta-animate');
		}, 700);

	};
	  
	var bubblyButtons = document.getElementsByClassName("btn--cta");
	  
	for (var i = 0; i < bubblyButtons.length; i++) {
		bubblyButtons[i].addEventListener('click', animateCta, false);
	}

	// Эффект клика
	[].map.call(document.querySelectorAll('.btn'), el=> {
		el.addEventListener('click',e => {
			e = e.touches ? e.touches[0] : e;
			const r = el.getBoundingClientRect(), d = Math.sqrt(Math.pow(r.width,2)+Math.pow(r.height,2)) * 2;
			el.style.cssText = `--s: 0; --o: 1;`;  el.offsetTop; 
			el.style.cssText = `--t: 1; --o: 0; --d: ${d}; --x:${e.clientX - r.left}; --y:${e.clientY - r.top};`
		})
	})


	// Тоггл меню
	$('.menu-trigger').click(function (e) { 
		$(this).toggleClass('menu-open');
		$('.toggle-menu').toggleClass('menu-open');
	});


	// Аккордион в мобильном меню
// 	$('.mob-toggle').click(function() {

// 		var dropDown = $(this).closest('li').find('.mob-menu__sublist');

// 		$(this).closest('.mob-menu__list').find('.mob-menu__sublist').not(dropDown).slideUp();

// 		if ($(this).hasClass('active')) {
// 			$(this).removeClass('active');
// 		} else {
// 			$(this).closest('.mob-menu__list').find('.mob-toggle.active').removeClass('active');
// 			$(this).addClass('active');
// 		}

// 		dropDown.stop(false, true).slideToggle();
//    });

	// FAQ accordion
	$('.js-accordion-btn').click(function() {

		var dropDown = $(this).parent().find('.js-accordion-content');

		$(this).closest('.js-accordion').find('.js-accordion-content').not(dropDown).slideUp();

		if ($(this).hasClass('active')) {
			$(this).removeClass('active');
		} else {
			$(this).closest('.js-accordion').find('.js-accordion-btn.active').removeClass('active');
			$(this).addClass('active');
		}

		dropDown.stop(false, true).slideToggle();
	});





// Вызов карточки квартиры


	
   $('[data-plan]').click(function (e) { 
		$('[data-plan]').removeClass('current');
		$(this).addClass('current');
		$('.results__img').find('.img').attr('src', 'img/' + $(this).data('plan'));
		if( $(window).width() < 1200 ) {
			e.stopPropagation();
			$.magnificPopup.open({
				items: {
					src: '#card-example',
				},
				type: 'inline',
				callbacks: {
					open: function() {
						$('.mfp-bg').addClass('mfp-card');
					}
				}
			});
		}
   });


	




});



