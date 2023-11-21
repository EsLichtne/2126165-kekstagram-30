import '../../vendor/pristine/pristine.min.js';

const form = document.querySelector('.img-upload__form');

const pristine = new Pristine(form, {
  classTo: 'img-upload__field-wrapper',
  errorTextParent: 'img-upload__field-wrapper',
  errorTextClass: 'img-upload__field-wrapper--error'
});

const split = (value) => value.split(' ').filter(Boolean);

pristine.addValidator(form.hashtags, (value) => {
  const hashtags = split(value.toLowerCase());
  return hashtags.length === new Set(hashtags).size;
}, 'Один и тот же хэш-тег не может быть использован дважды', 1, true);

pristine.addValidator(form.hashtags, (value) => {
  const maxHashtags = 5;
  return split(value).length <= maxHashtags;
}, 'Нельзя указать больше пяти хэш-тегов', 1, true);

pristine.addValidator(form.hashtags, (value) => {
  const maxHashtagsLength = 20;
  return split(value).every((hashtag) => hashtag.length <= maxHashtagsLength);
}, 'Максимальная длина одного хэш-тега 20 символов, включая решётку', 1, true);

pristine.addValidator(form.hashtags, (value) => {
  const firstSymbol = '#';
  return split(value).every((hashtag) => hashtag[0] === firstSymbol);
}, 'Хэш-тег должен начинаться с символа # (решётка)', 1, true);

pristine.addValidator(form.hashtags, (value) => {
  const symbol = '#';
  return split(value).every((hashtag) => hashtag !== symbol);
}, 'Хэш-тег не может состоять только из одной решётки', 1, true);

pristine.addValidator(form.hashtags, (value) => {
  const hashtagPattern = /^#[a-zа-яё0-9]+$/i;
  return split(value).every((hashtag) => hashtagPattern.test(hashtag));
}, 'Строка после решётки должна состоять из букв и чисел и не может содержать спецсимволы (#, @, $ и т. п.), символы пунктуации (тире, дефис, запятая и т. п.), эмодзи и т. д.', 1, true);

pristine.addValidator(form.description, (value) => {
  const maxDescriptionLength = 140;
  return value.length <= maxDescriptionLength;
}, 'Длина комментария не может составлять больше 140 символов', 1, true);

const checkValidity = () => pristine.validate();

const resetValidity = () => pristine.reset();

export {checkValidity, resetValidity};
