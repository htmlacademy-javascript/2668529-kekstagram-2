import { createPhotosArray } from './createPhotosArray.js';

const pictureTemplate = document.querySelector('#picture').content.querySelector('.picture');
const pictures = document.querySelector('.pictures');

const picturesList = createPhotosArray();
const picturesFragment = document.createDocumentFragment();

picturesList.forEach(({ url, description, likes, comments }) => {
  const pictureElement = pictureTemplate.cloneNode(true);
  pictureElement.querySelector('.picture__img').setAttribute('src', url);
  pictureElement.querySelector('.picture__img').setAttribute('alt', description);
  pictureElement.querySelector('.picture__likes').textContent = likes;
  pictureElement.querySelector('.picture__comments').textContent = comments.length;
  picturesFragment.appendChild(pictureElement);
});

pictures.append(picturesFragment);

