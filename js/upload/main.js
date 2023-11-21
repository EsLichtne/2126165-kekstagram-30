import {openPopup, closePopup} from './popup.js';
import {checkValidity, resetValidity} from './validation.js';
import {getScale, resetScale} from './scale.js';
import {setEffect, getEffectValue, resetEffect} from './effects.js';

const form = document.querySelector('.img-upload__form');
const picture = form.querySelector('.img-upload__preview img');
const thumbnails = form.querySelectorAll('.effects__preview');
const submitButton = form.querySelector('.img-upload__submit');

const renderFile = (file) => {
  if (file.type.startsWith('image')) {
    picture.src = URL.createObjectURL(file);
  }

  thumbnails.forEach((thumbnail) => {
    thumbnail.style.backgroundImage = `url(${picture.src})`;
  });

  openPopup();
};

const setSubmitDisabled = (flag) => {
  submitButton.disabled = flag;
  submitButton.textContent = flag ? 'Публикую...' : 'Опубликовать';
};

form.addEventListener('change', (event) => {
  switch (event.target.name) {
    case 'filename':
      renderFile(...event.target.files);
      break;
    case 'effect-level':
      picture.style.filter = getEffectValue();
      break;
    case 'effect':
      setEffect(event.target.value);
      break;
    case 'scale':
      picture.style.transform = `scale(${getScale() / 100})`;
      break;
  }
});

form.addEventListener('submit', (event) => {
  event.preventDefault();
  if (checkValidity()) {
    new FormData(form);
  }
});

form.addEventListener('reset', () => {
  resetValidity();
  resetScale();
  resetEffect();
});

const resetForm = () => {
  form.reset();
  closePopup();
};

export {setSubmitDisabled, resetForm};
