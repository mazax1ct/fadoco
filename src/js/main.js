$(document).ready(function() {

});

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
