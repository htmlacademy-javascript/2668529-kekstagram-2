import { getData } from './api.js';

const pictureTemplate = document.querySelector('#picture').content.querySelector('.picture');
const pictures = document.querySelector('.pictures');
const templateDataError = document.querySelector('#data-error').content.querySelector('.data-error');
const filters = document.querySelector('.img-filters');
const filterButton = filters.querySelectorAll('.img-filters__button');

const RANDOM_PICTURES_COUNT = 10;
const RERENDER_DELAY = 500;

let allPictures = [];

const clearPictures = () => {
  pictures.querySelectorAll('.picture').forEach((element) => element.remove());
};

const renderPictures = (picturesList) => {
  const picturesFragment = document.createDocumentFragment();
  picturesList.forEach(({ id, url, description, likes, comments }) => {
    const pictureElement = pictureTemplate.cloneNode(true);
    pictureElement.dataset.pictureId = id;
    pictureElement.querySelector('.picture__img').setAttribute('src', url);
    pictureElement.querySelector('.picture__img').setAttribute('alt', description);
    pictureElement.querySelector('.picture__likes').textContent = likes;
    pictureElement.querySelector('.picture__comments').textContent = comments.length;
    picturesFragment.appendChild(pictureElement);
  });
  pictures.append(picturesFragment);
};

const showDataError = () => {
  const dataErrorMessage = templateDataError.cloneNode(true);
  document.body.append(dataErrorMessage);
  setTimeout(() => dataErrorMessage.remove(), 5000);
};

const getRandomUniquePictures = (array, count) => {
  const shuffled = [...array].sort(() => Math.random() - 0.5);
  return shuffled.slice(0, count);
};

const sortPicturesByComments = (a, b) => b.comments.length - a.comments.length;

const debounce = (callback, delay = RERENDER_DELAY) => {
  let timeout;
  return (...args) => {
    clearTimeout(timeout);
    timeout = setTimeout(() => callback(...args), delay);
  };
};

const updatePicturesList = (filterId) => {
  clearPictures();
  let filteredPictures = [];

  switch (filterId) {
    case 'filter-random':
      filteredPictures = getRandomUniquePictures(allPictures, RANDOM_PICTURES_COUNT);
      break;
    case 'filter-discussed':
      filteredPictures = [...allPictures].sort(sortPicturesByComments);
      break;
    default:
      filteredPictures = allPictures;
  }

  renderPictures(filteredPictures);
};

const setFilterHandlers = () => {
  const debouncedUpdate = debounce(updatePicturesList);
  filters.addEventListener('click', (evt) => {
    const button = evt.target.closest('.img-filters__button');
    if (!button) {
      return;
    }
    filterButton.forEach((btn) => btn.classList.remove('img-filters__button--active'));
    button.classList.add('img-filters__button--active');
    debouncedUpdate(button.id);
  });
};

const initPictures = async () => {
  try {
    allPictures = await getData();
    renderPictures(allPictures);
    filters.classList.remove('img-filters--inactive');
    setFilterHandlers();
  } catch (error) {
    showDataError();
  }
};

const getAllPictures = () => allPictures;

export { initPictures, getAllPictures };
