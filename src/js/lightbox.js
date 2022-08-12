import SimpleLightbox from 'simplelightbox';
import 'simplelightbox/dist/simple-lightbox.min.css';

const refs = {
  isClose: document.querySelector('.nav-icon__close'),
  isLeft: document.querySelector('.nav-icon__left'),
  isRight: document.querySelector('.nav-icon__right'),
  gallery: document.querySelector('.cases-list'),
};

refs.gallery.addEventListener('click', e => {
  if (e.target.className === 'cases-list__img') {
    refs.isClose.classList.remove('is-hidden');
    refs.isRight.classList.remove('is-hidden--right');
    refs.isLeft.classList.remove('is-hidden--left');
  }
});

refs.isRight.addEventListener('click', sliceRight);
refs.isLeft.addEventListener('click', sliceLeft);
refs.isClose.addEventListener('click', isClose);

window.addEventListener('click', onHandleClick);

function isClose() {
  ligthbox.close('close.simplelightbox', () => {});
  refs.isClose.classList.add('is-hidden');
  refs.isRight.classList.add('is-hidden--right');
  refs.isLeft.classList.add('is-hidden--left');
  window.removeEventListener('click', onHandleClick);
}

function sliceLeft() {
  ligthbox.prev('prev.simplelightbox', () => {});
}

function sliceRight() {
  ligthbox.next('next.simplelightbox', () => {});
  refs.isLeft.classList.remove('is-hidden--left');
}

function onHandleClick(e) {
  if (e.target.className === 'sl-wrapper simple-lightbox') {
    refs.isClose.classList.add('is-hidden');
    refs.isRight.classList.add('is-hidden--right');
    refs.isLeft.classList.add('is-hidden--left');
  }
}

const ligthbox = new SimpleLightbox('.cases-list li a', {
  className: 'simple-lightbox',
  nav: false,
  close: false,
  showCounter: true,
  scrollZoom: false,
  spinner: true,
});

ligthbox.on('show.simplelightbox', () => {});
