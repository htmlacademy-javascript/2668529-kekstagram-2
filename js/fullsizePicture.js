import { getData } from './api.js';
import { showComments, clearComments } from './comments.js';

const pictures = document.querySelector('.pictures');
const bigPicture = document.querySelector('.big-picture');
const bigPictureImg = bigPicture.querySelector('.big-picture__img img');
const bigPictureLikesCount = bigPicture.querySelector('.likes-count');
const bigPictureClose = bigPicture.querySelector('.big-picture__cancel');
const commentsCaption = bigPicture.querySelector('.social__caption');

let picturesData = [];

const onEscapeButtonClose = (evt) => {
  if (evt.key === 'Escape') {
    evt.preventDefault();
    closeBigPicture();
  }
};

const onCancelClickClose = (evt) => {
  evt.preventDefault();
  closeBigPicture();
};

function closeBigPicture () {
  clearComments();
  bigPicture.classList.add('hidden');
  bigPictureClose.removeEventListener('click', onCancelClickClose);
  document.removeEventListener('keydown', onEscapeButtonClose);
}

/*const openBigPicture = (pictureId) => {
  const currentPicture = initPictures().find((picture) => picture.id === Number(pictureId));

  bigPictureImg.src = currentPicture.url;
  bigPictureLikesCount.textContent = currentPicture.likes;
  commentsCaption.textContent = currentPicture.description;

  showComments(currentPicture.comments);

  bigPicture.classList.remove('hidden');
  document.body.classList.add('modal-open');
  bigPictureClose.addEventListener('click', onCancelClickClose);
  document.addEventListener('keydown', onEscapeButtonClose);
};*/

function openBigPicture(picture) {
  bigPictureImg.src = picture.url;
  bigPictureImg.alt = picture.description;
  bigPictureLikesCount.textContent = picture.likes;
  commentsCaption.textContent = picture.description;

  showComments(picture.comments);

  bigPicture.classList.remove('hidden');
  document.body.classList.add('modal-open');

  document.addEventListener('keydown', onEscapeButtonClose);
  bigPictureClose.addEventListener('click', onCancelClickClose);
}

/*pictures.addEventListener('click', (evt) => {
  const currentPicture = evt.target.closest('.picture');
  if (currentPicture) {
    evt.preventDefault();
    openBigPicture(currentPicture.dataset.pictureId);
  }
});*/

async function initFullsizePicture() {
  try {
    picturesData = await getData();

    pictures.addEventListener('click', (evt) => {
      const thumbnail = evt.target.closest('.picture');
      if (!thumbnail) {
        return;
      }

      evt.preventDefault();
      const pictureId = Number(thumbnail.dataset.pictureId);
      const picture = picturesData.find((item) => item.id === pictureId);
      if (picture) {
        openBigPicture(picture);
      }
    });
  } catch (err) {
    // eslint-disable-next-line no-console
    console.error('Ошибка загрузки изображений для полноэкранного просмотра:', err);
  }
}

export { initFullsizePicture };
