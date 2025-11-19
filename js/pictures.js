import { getData } from './api.js';
import { setFilterHandlers } from './filter.js';

const ERROR_MESSAGE_REMOVE_TIMEOUT = 5000;

const pictureTemplate = document.querySelector('#picture').content.querySelector('.picture');
const pictures = document.querySelector('.pictures');
const templateDataError = document.querySelector('#data-error').content.querySelector('.data-error');
const filters = document.querySelector('.img-filters');

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
  setTimeout(() => dataErrorMessage.remove(), ERROR_MESSAGE_REMOVE_TIMEOUT);
};

const initPictures = async () => {
  setFilterHandlers();
  try {
    allPictures = await getData();
    renderPictures(allPictures);
    filters.classList.remove('img-filters--inactive');
  } catch (error) {
    showDataError();
  }
};

const getAllPictures = () => allPictures;

export { initPictures, getAllPictures, clearPictures, renderPictures };
