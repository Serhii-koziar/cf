import Swiper, {Pagination} from 'swiper';

Swiper.use([Pagination]);

export function initSlider() {
  let swiper = new Swiper('.slider-section__inner', {
    slidesPerView: 3,
    spaceBetween: 50,
    pagination: {
      el: '.slider-section__pagination',
    },
    breakpoints: {
      // when window width is >= 320px
      320: {
        slidesPerView: 1,
      },
      // when window width is >= 480px
      768: {
        slidesPerView: 2,
        spaceBetween: 15,
      },
      // when window width is >= 640px
      1280: {
        slidesPerView: 3,
        spaceBetween: 15,
      },
    }
  });
}
