const container = document.querySelector('.social__comments');
const template = document.querySelector('.social__comment');
const shownCounter = document.querySelector('.social__comment-shown-count');
const totalCounter = document.querySelector('.social__comment-total-count');
const loaderButton = document.querySelector('.social__comments-loader');
const field = document.querySelector('.social__footer-text');
const sendButton = document.querySelector('.social__footer-btn');

const createComments = (commentsData) => commentsData.map((properties) => {
  const {avatar, name, message} = properties;
  const comment = template.cloneNode(true);

  comment.querySelector('.social__picture').src = avatar;
  comment.querySelector('.social__picture').alt = name;
  comment.querySelector('.social__text').textContent = message;

  return comment;
});

const renderComments = (commentsData, step = 5) => {
  const currentCommentsData = [...commentsData];

  const onLoaderButtonClick = () => {
    const userComments = container.querySelectorAll('.user-comment');
    container.append(...createComments(currentCommentsData.splice(0, step)));
    shownCounter.textContent = commentsData.length - currentCommentsData.length + userComments.length;
    totalCounter.textContent = commentsData.length + userComments.length;
    loaderButton.classList.toggle('hidden', !currentCommentsData.length);
  };

  container.replaceChildren();

  loaderButton.addEventListener('click', onLoaderButtonClick);
  loaderButton.click();

  document.addEventListener('popupClose', () => {
    loaderButton.removeEventListener('click', onLoaderButtonClick);
  }, {once: true});
};

const onSendButtonClick = () => {
  if (field.value) {
    const text = field.value;
    const comment = template.cloneNode(true);
    comment.querySelector('.social__picture').src = '../../img/avatar-6.svg';
    comment.querySelector('.social__text').textContent = text;
    comment.classList.add('user-comment');
    container.insertAdjacentElement('afterbegin', comment);
    field.value = '';
    shownCounter.textContent++;
    totalCounter.textContent++;
  }
};

const onDocumentKeydown = (event) => {
  if (event.key.startsWith('Ent')) {
    sendButton.click();
  }
};

sendButton.addEventListener('click', onSendButtonClick);
document.addEventListener('keydown', onDocumentKeydown);

export {renderComments};
