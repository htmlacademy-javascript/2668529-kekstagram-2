import { showComments, clearComments } from './comments.js';
import { getAllPictures } from './pictures.js';

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

const initFullSizePicture = () => {
  picturesData = getAllPictures();
  pictures.addEventListener('click', (evt) => {
    const currentPicture = evt.target.closest('.picture');
    if (currentPicture) {
      evt.preventDefault();
      const pictureId = Number(currentPicture.dataset.pictureId);
      const picture = picturesData.find((item) => item.id === pictureId);
      if (picture) {
        openBigPicture(picture);
      }
    }
  });
};

export { initFullSizePicture };
