$(document).ready(function(){
	//header submenu
	$('.header__submenu').click(function(){
		$(this).toggleClass('_active');
	});

	//main slider
	if($('.s_main__slider').length){
		var sl_main = $('.s_main__slider').lightSlider({
			item: 1,
			slideMargin: 0,
			pager: false,
			controls: false,
			auto: true,
			loop: true,
			pause: 2500
		});
	}

	//reviews slider
	if($('.s_reviews__slider').length){
		var sl_reviews = $('.s_reviews__slider').lightSlider({
			item: 5,
			slideMargin: 3,
			slideMove: 1,
			pager: false,
			controls: false,
			loop: true
		});
		$('.s_reviews__arr_left').click(function(){
			sl_reviews.goToPrevSlide();
		});
		$('.s_reviews__arr_right').click(function(){
			sl_reviews.goToNextSlide();
		});
	}
	$('.s_reviews__slider_item').click(function(){
		var el = $(this),
			n = el.data('n')-1;
		el.find('div').addClass('_active');
		el.siblings().find('._active').removeClass('_active');
		$('.s_reviews__tabs_item').eq(n).addClass('_current')
			.siblings().removeClass('_current');
	});

	//history slider
	if($('.s_history__slider').length){
		var sl_history = $('.s_history__slider').lightSlider({
			item: 1,
			slideMargin: 3,
			pager: false,
			controls: false,
			loop: true,
			mode: 'fade'
		});
		$('.s_history__arr_left').click(function(){
			sl_history.goToPrevSlide();
		});
		$('.s_history__arr_right').click(function(){
			sl_history.goToNextSlide();
		});
	}

	//select
	$('.g_select__head').click(function(e){
		var head = $(this),
			wrp = head.closest('.g_select');
		wrp.toggleClass('_active');
		wrp.find('.g_select__body').scrollTop(0);
	});
	$('.g_select._in_form a').click(function(e){
		e.preventDefault();
		var item = $(this),
			text = item.text(),
			wrp = item.closest('.g_select'),
			input = wrp.find('input'),
			current = wrp.find('.g_select__head span');
		wrp.removeClass('_active');
		item.addClass('_current').siblings().removeClass('_current');
		input.text(text);
		current.text(text);
	});

	//stat counter
	if($('.s_stat__item_timer').length){
		var anim = true;
		var options = {
			useEasing : true,
			useGrouping : true,
			separator : ' ',
			decimal : '.',
		};
		$(window).scroll(function(){
			if(isElementVisible($('.s_stat__item_timer')[0]) && anim){
				$('.s_stat__item_timer').each(function(){
					var item = $(this),
						n = item.data('number'),
						t = item.data('time'),
						id = item.attr('id');
					var numAnim = new CountUp(id,0,n,0,t, options);
					numAnim.start();
				});
				anim = false;
			}
		});
	}

	//gmap init
	if($('.s_map__map').length){
		mapInitialize('map');
	}

	//popups
	$('._open_pop').click(function(e){
		e.preventDefault();
		var name = $(this).data('name'),
			popup = $('.popup_'+name),
			popup_h = popup.outerHeight(),
			popup_w = popup.outerWidth() + 20,
			h = $(window).height(),
			px = window.pageYOffset + h/2 - popup_h/2;
		popup.css({
			'top': px+'px',
			'margin-left': '-'+ popup_w/2 +'px',
		});
		txt = $(this).data('txt');
		popup.find('h2').html(txt);
		txt = txt.replace(/<\/?[^>]+(>|$)/g, "");
		popup.find('input[name="form"]').val(txt);
		$('.popup.popup_'+name+', .overlay').addClass('_visible');
	});
	$('.overlay, ._close_pop').click(function(e){
		e.preventDefault();
		$('.popup, .overlay').removeClass('_visible');
	});

	//history gallery
	if($('.s_history__slider_wrp').length){
		$('.s_history__slider_wrp').lightGallery({
			selector: '.s_history__item_img'
		});
	}

	//olimp gallery
	if($('.s_olimp__gallery').length){
		$('.s_olimp__gallery').lightGallery({
			selector: '.s_olimp__gallery_item'
		});
	}

	//photo gallery
	if($('.s_photo__blocks').length){
		$('.s_photo__blocks').lightGallery({
			selector: '.s_photo__item'
		});
	}

	//mask
	$('input[name="phone"]').mask("+7 (999) 999-99-99");
	// validate
	$("._validate").each(function () {
		var it = $(this);
		it.validate({
			rules: {
				form: {required: true},
				phone: {required: true},
				mail: {required: true},
				question: {required: true},
				upload: {required: false},
				surname: {required: true},
				name: {required: true},
				conf: {required: true}
			},
			messages: {},
			errorPlacement: function (error, element) {},
			submitHandler: function (form) {
				var data = new FormData(it[0]);
				$.ajax({
					url: '../mail.php',
					type: 'POST',
					data: it.serialize(),
					cache: false,
					processData: false,
					contentType: false,
					success: function( respond, textStatus, jqXHR ){
						$('.popup').removeClass('_visible');
						var name = 'thnx'
						popup = $('.popup_'+name),
							popup_h = popup.outerHeight(),
							popup_w = popup.outerWidth(),
							h = $(window).height(),
							px = window.pageYOffset + h/2 - popup_h/2;
						popup.css({
							'top': px+'px',
							'margin-left': '-'+ popup_w/2 +'px',
						});
						$('.popup.popup_'+name+', .overlay').addClass('_visible');
						setTimeout(function () {
							if ($('.popup_thnx').hasClass('_visible')) {
								$('.popup_thnx, .overlay').removeClass('_visible');
							}
						}, 2000);
						$("form").trigger( 'reset' );
					},
					error: function( jqXHR, textStatus, errorThrown ){
						console.log('ОШИБКИ AJAX запроса: ' + textStatus );
					}
				});
			},
			success: function () {},
			highlight: function (element, errorClass) {
				$(element).addClass('_error');
			},
			unhighlight: function (element, errorClass, validClass) {
				$(element).removeClass('_error');
			}
		});
	});

	//file input
	if($('input[type=file]').length){
		$("input[type=file]").each(function(){
			var input = $(this),
				text = input.data('text'),
				wrapper = input.closest('.NFI-wrapper'),
				filename = wrapper.find('.NFI-filename'),
				button = wrapper.find('.NFI-button'),
				close = wrapper.find('.close-input'),
				current = wrapper.find('.NFI-current');
			input.nicefileinput({
				label : text
			});
			filename.val(text);
			$('.NFI-wrapper').append('<div class="close-input"><svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 18 18"><path d="M18 1.4L16.6 0 9 7.6 1.4 0 0 1.4 7.6 9 0 16.6 1.4 18 9 10.4 16.6 18 18 16.6 10.4 9 18 1.4Z" fill="rgb(204, 204, 204)"/></svg></div>');
			button.wrapInner('<span></span>');
		});
		$("input[type=file]").on('change',function(){
			var input = $(this),
				text = input.data('text'),
				wrapper = input.closest('.NFI-wrapper'),
				filename = wrapper.find('.NFI-filename'),
				button = wrapper.find('.NFI-button'),
				close = wrapper.find('.close-input'),
				current = wrapper.find('.NFI-current');

			if(input.val()==""){
				input.val(text).removeClass('_active');
				button.removeClass('hide-for-pre');
				$('.close-input').hide();
			}else{
				button.addClass('hide-for-pre');
				filename.addClass('_active');
				close.show();
			}
			close.addClass('big');
		});
		$('.close-input').click(function(){
			var close = $(this),
				wrapper = close.closest('.NFI-wrapper'),
				input = wrapper.find('input[type=file]'),
				text = input.data('text'),
				filename = wrapper.find('.NFI-filename'),
				button = wrapper.find('.NFI-button'),
				current = wrapper.find('.NFI-current');
			$('.close-input').hide();
			filename.val(text).removeClass('_active');
			button.removeClass('hide-for-pre');
		});
	}


	if($('.s_lang__slider').length){
		$('.s_lang__slider').lightSlider({
			item:1,
			slideMargin:0,
			loop: true,
			auto: true,
			controls: false,
			pager: false,
			pause: 3000
		});
	}
});

//gmap init
function mapInitialize(el_id) {
	var center = $('#'+el_id).data('center').split(',');
	var kz = new google.maps.LatLng(center[0],center[1]);
	var mapOptions = {
		zoom: 5,
		center: kz,
		mapTypeControl: false,
		scrollwheel: false,
		navigationControl: false,
		scaleControl: false
	};
	var mapElement = document.getElementById(el_id);
	var map = new google.maps.Map(mapElement, mapOptions);

	var ico_img = {
		path: 'M12 32C11.7 32 11.4 31.9 11.2 31.6L2.6 19.4 2.3 19C0.8 16.9 0 14.5 0 12 0 5.4 5.4 0 12 0 18.6 0 24 5.4 24 12 24 14.5 23.2 16.9 21.7 19L21.3 19.6 12.8 31.6C12.6 31.9 12.3 32 12 32ZM12 8C9.8 8 8 9.8 8 12 8 14.2 9.8 16 12 16 14.2 16 16 14.2 16 12 16 9.8 14.2 8 12 8Z',
		fillColor: '#f77373',
		fillOpacity: 1,
		scale: 1.5,
		strokeWeight: 0
	};

	var points = $('#'+el_id).data('points').split(';');
	points.forEach(function(feature) {
		var ico = ico_img;
		var dot = feature.split(',');
		var marker = new google.maps.Marker({
			position: {
				lat: Number(dot[0]),
				lng: Number(dot[1])
			},
			icon: ico,
			map: map,
			title: "Мы находимся тут!",
			optimized: false
		});
	});

	var ico_img_may = {
		path: 'M12 32C11.7 32 11.4 31.9 11.2 31.6L2.6 19.4 2.3 19C0.8 16.9 0 14.5 0 12 0 5.4 5.4 0 12 0 18.6 0 24 5.4 24 12 24 14.5 23.2 16.9 21.7 19L21.3 19.6 12.8 31.6C12.6 31.9 12.3 32 12 32ZM12 8C9.8 8 8 9.8 8 12 8 14.2 9.8 16 12 16 14.2 16 16 14.2 16 12 16 9.8 14.2 8 12 8Z',
		fillColor: '#888',
		fillOpacity: 1,
		scale: 1.2,
		strokeWeight: 0
	};
	var points_may = $('#'+el_id).data('may').split(';');
	points_may.forEach(function(feature) {
		var ico = ico_img_may;
		var dot = feature.split(',');
		var marker = new google.maps.Marker({
			position: {
				lat: Number(dot[0]),
				lng: Number(dot[1])
			},
			icon: ico,
			map: map,
			title: "Мы находимся тут!",
			optimized: false
		});
		var infowindow = new google.maps.InfoWindow({
			content: '<div class="s_map__may">У Вас есть возможность <br> открыть школу в этом городе</div>'
		});
		infowindow.open(map, marker);
		marker.addListener('click', function () {
			infowindow.open(map, marker);
		});
	});
}

function isElementVisible(el) {
	var rect     = el.getBoundingClientRect(),
		vWidth   = window.innerWidth || doc.documentElement.clientWidth,
		vHeight  = window.innerHeight || doc.documentElement.clientHeight,
		efp      = function (x, y) { return document.elementFromPoint(x, y) };

	// Return false if it's not in the viewport
	if (rect.right < 0 || rect.bottom < 0
		|| rect.left > vWidth || rect.top > vHeight)
		return false;

	// Return true if any of its four corners are visible
	return (
		el.contains(efp(rect.left,  rect.top))
		||  el.contains(efp(rect.right, rect.top))
		||  el.contains(efp(rect.right, rect.bottom))
		||  el.contains(efp(rect.left,  rect.bottom))
	);
}
