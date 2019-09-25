$(function() {

	// img.svg to inline svg
	inlineSVG.init();

	// Custom select
	$(".ui-select").each(function() {
		var classes = $(this).attr("class"),
				id      = $(this).attr("id"),
				name    = $(this).attr("name");
		var template =  '<div class="' + classes + '">';
				template += '<div class="ui-select__trigger">' + $(this).data("placeholder") + '</div>';
				template += '<div class="ui-select__options">';
				$(this).find("option").each(function() {
					template += '<span class="ui-select__option ' + $(this).attr("class") + '" data-value="' + $(this).attr("value") + '">' + $(this).html() + '</span>';
				});
		template += '</div></div>';
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
	

	$('.filter-additional').click(function (e) { 
		$(this).toggleClass('filter-additional--opened');
		$(this).closest('.filter').toggleClass('filter--toggle');
		$(this).closest('.filter').find('.filter__hidden').slideToggle(200);
	});



	if( $(window).width() > 1200 ) {
		new SimpleBar(document.getElementById('results-screen'), {
			autoHide: false
		});
	}






});



