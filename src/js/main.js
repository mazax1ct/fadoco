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

  $('.js-news-slider').each(function(index, el) {
    var slider = el.children[1];

    new Swiper(slider, {
      loop: true,
      spaceBetween: 24,
      breakpoints: {
        768: {
          slidesPerView: 2
        },
        1024: {
          slidesPerView: 3
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
});

//перезапуск функции навешивания класса на шапку при скролле и ресайзе
$(window).on("scroll", resize_scroll).on("resize", resize_scroll);

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
