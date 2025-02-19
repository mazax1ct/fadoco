//отслеживание скролла для шапки
var header = $('.header'),
    toTop = $('.js-to-top'),
    scrollPrev = 0;

var resize_scroll = function(e) {
  var scrolled = $(window).scrollTop();

  if (scrolled > $('.header').height() * 0.5) {
		header.addClass('is-scrolled');
    toTop.addClass('is-active');
	} else {
		header.removeClass('is-scrolled');
    toTop.removeClass('is-active');
	}

  /*if ( scrolled > $('.header').height() && scrolled > scrollPrev ) {
		header.addClass('is-out');
	} else {
		header.removeClass('is-out');
	}*/

	scrollPrev = scrolled;
};

$(document).ready(function() {
  //запуск функции навешивания класса на шапку
  resize_scroll();

  //состояние заполненности поля ввода
  $('.js-input-group__input').each(function(index) {
    if($(this).val() !== '') {
      $(this).closest('.input-group').addClass('is-filled');
    } else {
      $(this).closest('.input-group').removeClass('is-filled');
    }
  });

  if($('.float-block .container span').width() > $('body').width()) {
    var el = $('.float-block .container span');
    var el_width = $('.float-block .container span').width() + 20;
    $('.float-block .container').css('--el_width', '-' + el_width + 'px');
    for (i = 0; i < 20; i++) {
      el.clone().appendTo(".float-block .container");
    };
    $('.float-block .container').addClass('marquee');
  }
});

//перезапуск функции навешивания класса на шапку при скролле и ресайзе
$(window).on("scroll", resize_scroll).on("resize", resize_scroll);

//состояние заполненности поля ввода
$(document).on('keyup', '.js-input-group__input', function () {
  if($(this).val() !== '') {
    $(this).closest('.input-group').addClass('is-filled');
  } else {
    $(this).closest('.input-group').removeClass('is-filled');
  }
});

//тогглер меню в футере
$(document).on('click', '.js-footer-menu-toggler', function () {
  if(!$(this).hasClass('is-active')) {
    $(this).addClass('is-active');
    $(this).closest('.footer-menu').find('.footer-menu__list').slideDown();
  } else {
    $(this).removeClass('is-active');
    $(this).closest('.footer-menu').find('.footer-menu__list').slideUp();
  }
  return false;
});

$(document).on('click', '.js-header-catalog-toggler', function () {
  var _this = $(this);
  if(!_this.hasClass('is-active')) {
    _this.addClass('is-active');
    _this.find('use').attr('xlink:href', 'images/sprite.svg#close_icon');
    $('.header').addClass('is-open');
    $('body').addClass('is-overflow');
    $('.header__catalog').slideDown();
  } else {
    $('.header__catalog').slideUp(function () {
      _this.removeClass('is-active');
      _this.find('use').attr('xlink:href', 'images/sprite.svg#catalog_icon');
      $('body').removeClass('is-overflow');
      $('.header').removeClass('is-open');
    });
  }
  return false;
});
