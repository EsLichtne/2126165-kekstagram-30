const count = document.querySelector('.likes-count');

const onCountClick = () => {
  count.classList.toggle('likes-count--active');
  return count.classList.contains('likes-count--active') ? count.textContent++ : count.textContent--;
};

count.addEventListener('click', onCountClick);

const removeLikes = () => {
  count.classList.remove('likes-count--active');
};

export {removeLikes};
