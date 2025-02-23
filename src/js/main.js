//отслеживание скролла для шапки
var header = $('.header'),
    scrollPrev = 0;

var resize_scroll = function(e) {
  var scrolled = $(window).scrollTop();

  if (scrolled > $('.header').height() * 2) {
		header.addClass('is-scrolled');
	}

  if (scrolled == 0) {
		header.removeClass('is-scrolled');
	}

  if ( scrolled > $('.header').height() && scrolled > scrollPrev ) {
		header.addClass('is-out');
	} else {
		header.removeClass('is-out');
	}

	scrollPrev = scrolled;
};

$(document).ready(function() {
  //запуск функции навешивания класса на шапку
  resize_scroll();

  //слайдер новостей
  $('.js-news-slider').each(function(index, el) {
    var slider = el.children[1];

    new Swiper(slider, {
      loop: true,
      spaceBetween: 24,
      breakpoints: {
        768: {
          slidesPerView: 2,
          slidesPerGroup: 2
        },
        1024: {
          slidesPerView: 3,
          slidesPerGroup: 3
        }
      },

      navigation: {
        nextEl: '.js-cards-slider-next[data-slider="'+el.dataset.slider+'"]',
        prevEl: '.js-cards-slider-prev[data-slider="'+el.dataset.slider+'"]',
      },

      pagination: {
        el: '.js-cards-slider-pagination[data-slider="'+el.dataset.slider+'"]',
        type: 'bullets',
        clickable: true
      },
    });
  });

  //слайдер карточек декоров
  $('.js-cards-slider').each(function(index, el) {
    var slider = el.children[1];

    new Swiper(slider, {
      loop: true,
      slidesPerView: 'auto',
      slidesOffsetBefore: 16,
      breakpoints: {
        768: {
          slidesOffsetBefore: 0,
          slidesPerView: 2,
          slidesPerGroup: 2
        },
        1024: {
          slidesOffsetBefore: 0,
          slidesPerView: 3,
          slidesPerGroup: 3
        },
        1280: {
          slidesOffsetBefore: 0,
          slidesPerView: 4,
          slidesPerGroup: 4
        }
      },

      navigation: {
        nextEl: '.js-cards-slider-next[data-slider="'+el.dataset.slider+'"]',
        prevEl: '.js-cards-slider-prev[data-slider="'+el.dataset.slider+'"]',
      },

      pagination: {
        el: '.js-cards-slider-pagination[data-slider="'+el.dataset.slider+'"]',
        type: 'bullets',
        clickable: true
      },
    });
  });

  //слайдер галереи
  $('.js-gallery-slider').each(function(index, el) {
    new Swiper(el, {
      loop: false,
      spaceBetween: 24,
      breakpoints: {
        768: {
          slidesPerView: 2,
          slidesPerGroup: 2
        },
        1024: {
          slidesPerView: 3,
          slidesPerGroup: 3
        }
      },

      navigation: {
        nextEl: '.js-gallery-slider-next[data-slider="'+el.dataset.slider+'"]',
        prevEl: '.js-gallery-slider-prev[data-slider="'+el.dataset.slider+'"]',
      },

      pagination: {
        el: '.js-gallery-slider-pagination[data-slider="'+el.dataset.slider+'"]',
        type: 'bullets',
        clickable: true
      },
    });
  });
});

//перезапуск функции навешивания класса на шапку при скролле и ресайзе
$(window).on("scroll", resize_scroll).on("resize", resize_scroll);

//тогглер меню
$(document).on('click', '.js-menu-toggler', function () {
  var _this = $(this);
  if(!_this.hasClass('is-active')) {
    _this.addClass('is-active');
    _this.find('use').attr('xlink:href', 'images/sprite.svg#close_icon');
    $('body').addClass('is-overflow');
    $('.header__bottom').addClass('is-open');
  } else {
    _this.removeClass('is-active');
    _this.find('use').attr('xlink:href', 'images/sprite.svg#burger_icon');
    $('body').removeClass('is-overflow');
    $('.header__bottom').removeClass('is-open');
  }
  return false;
});

//тогглер блока галереи
$(document).on('click', '.js-gallery-toggler', function () {
  if(!$(this).hasClass('is-active')) {
    $(this).addClass('is-active');
    $(this).closest('.gallery-item').find('.gallery-item__dropdown').slideDown();
  } else {
    $(this).removeClass('is-active');
    $(this).closest('.gallery-item').find('.gallery-item__dropdown').slideUp();
  }
  return false;
});

//тогглер адреса
$(document).on('click', '.js-address-toggler', function () {
  if(!$(this).closest('.address-item').hasClass('is-active')) {
    $(this).closest('.address-item').addClass('is-active');
    $(this).closest('.address-item').find('.address-item__dropdown').slideDown();
  } else {
    $(this).closest('.address-item').removeClass('is-active');
    $(this).closest('.address-item').find('.address-item__dropdown').slideUp();
  }
  return false;
});

//тогглер комбобокса
$(document).on('click', '.js-combobox-toggler', function () {
  var combobox = $(this).closest('.combobox');

  if(combobox.hasClass('is-open')) {
    combobox.removeClass('is-open')
  } else {
    $('.combobox').removeClass('is-open');
    combobox.addClass('is-open')
  }
  return false;
});

//поиск адресов
$(document).on('click', '.js-cities .combobox__link', function () {
  $(this).closest('.combobox').find('.combobox__link').removeClass('is-active');
  $(this).addClass('is-active');
  $(this).closest('.combobox').find('.combobox__value').text($(this).text());
  $(this).closest('.combobox').removeClass('is-open');
  var searchPhrase = $(this).text();

  if(searchPhrase === 'Все') {
    $('.address-item').removeClass('hidden').show();
    $('.js-no-results').remove();
  } else {
    $('.address-item__city').each(function(index, el) {
      $('.address-item').removeAttr('style');
      $('.js-address-search').val('');

      if(el.innerText !== searchPhrase) {
        el.closest('.address-item').classList.add('hidden');
      } else {
       el.closest('.address-item').classList.remove('hidden');
      }

      if($('.address-item:visible').length < 1) {
        if($('.js-no-results').length === 0) {
          $('.where-buy__list').append('<p class="js-no-results">Ничего не найдено</p>');
        }
      } else {
        $('.js-no-results').remove();
      }
    });
  }

  return false;
});

jQuery.expr[":"].Contains = jQuery.expr.createPseudo(function(arg) {
    return function( elem ) {
        return jQuery(elem).text().toUpperCase().indexOf(arg.toUpperCase()) >= 0;
    };
});

$(document).on('input', '.js-address-search', function () {
  let query = $(this).val();
  let el = $('.js-address:Contains("'+query+'")');

  $('.address-item:not(.hidden)').hide();
  el.closest('.address-item:not(.hidden)').show();

  if($('.address-item:visible').length < 1) {
    if($('.js-no-results').length === 0) {
      $('.where-buy__list').append('<p class="js-no-results">Ничего не найдено</p>');
    }
  } else {
    $('.js-no-results').remove();
  }
});

//табы
$(document).on('click', '.tabs-nav__button', function () {
  $(this).closest('.tabs-nav').find('.tabs-nav__button').removeClass('is-active');
  $(this).closest('.tabs').find('.tab').removeClass('is-active');
  $(this).addClass('is-active');
  $(this).closest('.tabs').find('.tab[data-target="'+$(this).attr('data-target')+'"]').addClass('is-active');
  return false;
});

//документация
$(document).on('mouseenter', '.doc-link', function () {
  var src = $(this).attr('data-src');
  var retina = $(this).attr('data-retina');
  var preview = $(this).closest('.docs').find('.js-preview');

  if(src !== undefined && retina !== undefined) {
    preview.attr('src', src);
    preview.attr('srcset', retina);
    preview.show();
  } else {
    preview.hide();
  }
});
