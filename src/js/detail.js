$(document).ready(function() {
  var swiper = new Swiper(".js-detail-thumbs-slider", {
    spaceBetween: 24,
    slidesPerView: 'auto',
    freeMode: true,
    watchSlidesProgress: true,
    slidesOffsetBefore: 16,
    slidesOffsetAfter: 16,
    breakpoints: {
      768: {
        slidesOffsetBefore: 24,
        slidesOffsetAfter: 24
      },
      1024: {
        slidesOffsetBefore: 0,
        slidesOffsetAfter: 0
      }
    },
  });

  var swiper2 = new Swiper(".js-detail-main-slider", {
    spaceBetween: 24,
    navigation: {
      nextEl: ".js-detail-main-slider-next",
      prevEl: ".js-detail-main-slider-prev",
    },
    thumbs: {
      swiper: swiper,
    },
  });
});
