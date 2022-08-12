import throttle from 'lodash.throttle';

const refs = {
  contactForm: document.querySelector('.contact-form'),
  labelName: document.querySelector('#label-name'),
  labelEmail: document.querySelector('#label-email'),
  inputName: document.querySelector('#input-name'),
  inputEmail: document.querySelector('#input-email'),
  inputBoxEmail: document.querySelector('.input-box__email'),
  inputBoxName: document.querySelector('.input-box__name'),
  worning: document.querySelector('.warnig'),
  formBtn: document.querySelector('.contact-form__btn'),
  submitModal: document.querySelector('.backdrop'),
  returnToSite: document.querySelector('.modal-link'),
};

const inputEmail = Array.from(refs.contactForm);
const validEmail = [];

inputEmail.forEach(el => {
  if (el.hasAttribute('data-reg')) {
    el.setAttribute('is-valid', '0');
    validEmail.push(el);
  }
});

refs.contactForm.addEventListener('submit', onSubmit);
refs.contactForm.addEventListener('input', throttle(changeInputValue, 300));
refs.inputEmail.addEventListener('focus', toggleClass);
refs.inputName.addEventListener('focus', toggleClass);
refs.inputEmail.addEventListener('blur', onInputBlur);
refs.inputName.addEventListener('blur', onInputBlur);
refs.formBtn.addEventListener('click', buttonHandler);

function changeInputValue({ target }) {
  if (target.hasAttribute('data-reg')) {
    inputCheck(target);
  }
}

function toggleClass(e) {
  if (e.target.id === 'input-name' || e.target.value !== '') {
    refs.inputBoxName.classList.add('input-focus');
  }
  if (e.target.id === 'input-email' || e.target.value !== '') {
    refs.inputBoxEmail.classList.add('input-focus');
  }
}

function onInputBlur(e) {
  if (e.target.value !== '') {
    return;
  } else {
    refs.inputBoxName.classList.remove('input-focus');
    refs.inputBoxEmail.classList.remove('input-focus');
  }
}

function inputCheck(el) {
  const inputValue = el.value;
  const inputReg = el.getAttribute('data-reg');
  const reg = new RegExp(inputReg);

  if (reg.test(inputValue)) {
    el.style.border = '2px solid rgb(0, 255, 0)';
    el.setAttribute('is-valid', '1');
    refs.worning.classList.add('message--hidden');
  } else {
    el.style.border = '2px solid rgb(255, 0, 0)';
    el.setAttribute('is-valid', '0');
  }
}

function onSubmit(e) {
  e.preventDefault();
  const emailValue = e.target[1].value;
  if (emailValue === '') {
    refs.worning.classList.remove('message--hidden');
    return;
  }
}

function buttonHandler(e) {
  const isValid = [];
  validEmail.forEach(el => {
    isValid.push(el.getAttribute('is-valid'));
  });
  const inputValid = isValid.reduce((acc, current) => {
    return acc && current;
  });

  if (!Boolean(+inputValid)) {
    refs.formBtn.setAttribute('disable', true);
  } else {
    refs.submitModal.classList.remove('backdrop--hidden');
  }
}
