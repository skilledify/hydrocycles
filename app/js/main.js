$(function () {
	$('.banner-section__slider').slick({
		slidesToShow: 1,
		slidesToScroll: 1,
		dots: true,
		prevArrow:
			'<button type="button" class="banner-section__slider-btn banner-section__slider-btnprev"><img src="images/arrow-left.svg" alt="prev"></button>',
		nextArrow:
			'<button type="button" class="banner-section__slider-btn banner-section__slider-btnnext"><img src="images/arrow-right.svg" alt="next"></button>',
		responsive: [
			{
				breakpoint: 768,
				settings: {
					arrows: false,
				},
			},
		],
	});

	$('.product-slider').slick({
		slidesToShow: 4,
		slidesToScroll: 1,
		arrows: true,
		prevArrow:
			'<button type="button" class="banner-section__slider-btn product-slider__slider-btnprev"><img src="../images/arrow-black-left.svg" alt="prev"></button>',
		nextArrow:
			'<button type="button" class="banner-section__slider-btn product-slider__slider-btnnext"><img src="../images/arrow-black-right.svg" alt="next"></button>',
		responsive: [
			{
				breakpoint: 1301,
				settings: {
					arrows: false,
					dots: true,
				},
			},
			{
				breakpoint: 1201,
				settings: {
					arrows: false,
					dots: true,
					slidesToShow: 3,
				},
			},
			{
				breakpoint: 870,
				settings: {
					dots: true,
					slidesToShow: 2,
				},
			},
			{
				breakpoint: 586,
				settings: {
					dots: true,
					slidesToShow: 1,
				},
			},
			{
				breakpoint: 576,
				settings: {
					dots: true,
					slidesToShow: 1,
				},
			},
		],
	});

	$('.tab').on('click', function (e) {
		e.preventDefault();
		$($(this).siblings()).removeClass('tab--active');
		$($(this))
			.closest('.tabs-wrapper')
			.siblings()
			.find('div')
			.removeClass('tabs-content--active');
		$(this).addClass('tab--active');
		$($(this).attr('href')).addClass('tabs-content--active');

		// $('.product-slider').slick('setPosition');
	});

	$('.product-item__favorite').on('click', function () {
		$(this).toggleClass('product-item__favorite--active');
	});

	$('#my-accordion').accordionjs({
		closeAble: true,
		// closeOther: true,
		slideSpeed: 200,
	});

	// const element = document.querySelector('.js-choice');
	// const choices = new Choices(element, {
	//    searchEnabled: true,
	//    itemSelectText: ""
	// });

	// $(".carousel").slick({
	//    dots: true,
	//    slidesToShow: 1,
	//    slidesToScroll: 1,

	// });

	$('.stars').rateYo({
		normalFill: ' #C4C4C4',
		ratedFill: '#1C62CD',
		spacing: '7px',
		starWidth: '23px',
		starSvg:
			'<svg width="23" height="21" viewBox="0 0 23 21"fill="none" xmlns="http://www.w3.org/2000/svg"><path d="M11.2875 0L13.8778 7.9463H22.2603L15.4787 12.8574L18.0691 20.8037L11.2875 15.8926L4.50593 20.8037L7.09626 12.8574L0.314686 7.9463H8.69717L11.2875 0Z"/></svg>',
		readOnly: 'true',
	});

	$('.js-range-slider').ionRangeSlider({
		type: 'double',
		min: 100000,
		max: 500000,
	});

	$('.filter__item-drop, .filter__extra').on('click', function () {
		$(this).toggleClass('filter__item-drop--active');
		$(this).next().slideToggle(200);
	});

	$('.catalog__filter-btngrid').on('click', function () {
		$(this).addClass('catalog__filter-button--active');
		$('.catalog__filter-btnline').removeClass('catalog__filter-button--active');
		$('.product-item__wrapper').removeClass('product-item__wrapper--list');
	});

	$('.catalog__filter-btnline').on('click', function () {
		$(this).addClass('catalog__filter-button--active');
		$('.catalog__filter-btngrid').removeClass('catalog__filter-button--active');
		$('.product-item__wrapper').addClass('product-item__wrapper--list');
	});

	$('.menu__btn').on('click', function () {
		$('.menu-mobile__list').toggleClass('menu-mobile__list--active');
	});

	$('.filter-style').styler();

	$('input:checkbox').change(function () {
		if ($(this).is(':checked')) {
			$(this).closest('label').addClass('checked');
		} else {
			$(this).closest('label').removeClass('checked');
		}
	});

	$('.footer__topdrop').on('click', function () {
		$(this).next().slideToggle();
		$(this).toggleClass('footer__topdrop--active');
	});

	$('.aside__btn').on('click', function () {
		$(this).next().slideToggle();
	});
});

document.addEventListener('DOMContentLoaded', function () {
	const favoriteButtons = document.querySelectorAll('.favorite-btn');

	favoriteButtons.forEach((button) => {
		button.addEventListener('click', function () {
			this.classList.toggle('active');
		});
	});
});

document.querySelectorAll('.splide').forEach((element) => {
	const slider = new Splide(element, {
		type: 'loop',
		perPage: 4,
		perMove: 1,
		gap: '20px',
		pagination: false,
		arrows: true,
		breakpoints: {
			1240: {
				perPage: 3,
				perMove: 1,
				pagination: true,
				arrows: false,
			},
			890: {
				perPage: 2,
				perMove: 1,
				pagination: true,
			},
			640: {
				perPage: 1,
				perMove: 1,
				pagination: true,
			},
			320: {
				perPage: 1,
				perMove: 1,
			},
		},
	}).mount();

	function updateBorder() {
		const slides = slider.Components.Elements.slides;
		const perPage = slider.options.perPage;

		// Сбрасываем класс у всех слайдов
		slides.forEach((slide) => {
			slide.classList.remove('last-visible-slide');
		});

		// Находим индекс последнего видимого слайда
		const lastVisibleIndex = slider.index + perPage - 1;

		// Добавляем класс последнему видимому слайду
		if (slides[lastVisibleIndex % slides.length]) {
			slides[lastVisibleIndex % slides.length].classList.add(
				'last-visible-slide'
			);
		}
	}

	// Обновляем бордер при каждом изменении
	slider.on('move', updateBorder);
	slider.on('updated', updateBorder);
	slider.on('mounted', updateBorder);
});


const repoName = window.location.pathname.split("/")[1];

const prevArrow = `<button type="button" class="banner-section__slider-btn banner-section__slider-btnprev">
  <img src="/${repoName}/images/arrow-left.svg" alt="prev">
</button>`;

const nextArrow = `<button type="button" class="banner-section__slider-btn banner-section__slider-btnnext">
  <img src="/${repoName}/images/arrow-right.svg" alt="next">
</button>`;


