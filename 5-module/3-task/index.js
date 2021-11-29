function initCarousel() {
  let carousel = document.querySelector('.carousel');
  let slides = document.querySelector('.carousel__inner');
  let arrowRight = document.querySelector('.carousel__arrow_right');
  let arrowLeft = document.querySelector('.carousel__arrow_left');
  let slideWidth = document.querySelector('.carousel__slide').offsetWidth;
  let position = 0;

  arrowLeft.style.display = 'none';

  carousel.addEventListener('click', event => {
    let target = event.target.closest('div');

    if (target == arrowRight) {
      position -= slideWidth;
    } else if (target == arrowLeft) {
      position += slideWidth;
    }

    slides.style.transform = `translateX(${position}px)`;
    
    if (position == 0) {
      arrowLeft.style.display = 'none';
    } else if (position == -3 * slideWidth) {
      arrowRight.style.display = 'none';
    } else {
      arrowLeft.style.display = 'flex';
      arrowRight.style.display = 'flex';
    }
  });
}
