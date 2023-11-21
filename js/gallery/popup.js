import {renderComments} from './comments.js';
import {removeLikes} from './likes.js';

const popup = document.querySelector('.big-picture');
const closeButton = document.querySelector('.big-picture__cancel');

const onDocumentKeydown = (event) => {
  if (event.key.startsWith('Esc')) {
    closeButton.click();
  }
};

const onDocumentClick = (event) => {
  if (event.target === popup) {
    closeButton.click();
  }
};

const openPopup = () => {
  popup.classList.remove('hidden');
  popup.scroll(0, 0);
  document.body.classList.add('modal-open');
  document.addEventListener('keydown', onDocumentKeydown);
  document.addEventListener('click', onDocumentClick);
};

const closePopup = () => {
  popup.classList.add('hidden');
  document.body.classList.remove('modal-open');
  document.removeEventListener('keydown', onDocumentKeydown);
  document.removeEventListener('click', onDocumentClick);
  document.dispatchEvent(new CustomEvent('popupClose'));
  removeLikes();
};

const renderPopup = (properties) => {
  const {url, description, likes, comments} = properties;

  popup.querySelector('.big-picture__img img').src = url;
  popup.querySelector('.big-picture__img img').alt = description;
  popup.querySelector('.likes-count').textContent = likes;
  popup.querySelector('.social__caption').textContent = description;
  renderComments(comments);
  openPopup();
};

closeButton.addEventListener('click', () => closePopup());

export {renderPopup};
