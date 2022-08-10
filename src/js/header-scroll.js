import throttle from 'lodash.throttle';

// let lastScroll = 0;
const header = document.querySelector('#header');

const windowScrollTop = window.pageYOffset;

const scrollPosition = () =>
  window.pageYOffset || document.documentElement.scrollTop;

window.addEventListener(
  'scroll',
  throttle(() => {
    if (scrollPosition() > 70 || scrollPosition() > 120) {
      header.style.backgroundColor = '#00000099';
    } else if (scrollPosition() < 70 || scrollPosition() < 120) {
      header.style.backgroundColor = '#00000000';
    }
    // lastScroll = scrollPosition();
  }, 500)
);
