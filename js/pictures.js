import { getData } from './api.js';

const pictureTemplate = document.querySelector('#picture').content.querySelector('.picture');
const pictures = document.querySelector('.pictures');
const templateDataError = document.querySelector('#data-error').content.querySelector('.data-error');

let allPictures = [];

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

const initPictures = async () => {
  try {
    allPictures = await getData();
    renderPictures(allPictures);
  } catch (error) {
    showDataError();
  }
};

const getAllPictures = () => allPictures;

export { initPictures, getAllPictures };
