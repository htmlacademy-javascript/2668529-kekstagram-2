import { picturesList } from './pictures.js';
import { showComments, clearComments } from './comments.js';

const pictures = document.querySelector('.pictures');
const bigPicture = document.querySelector('.big-picture');
const bigPictureImg = bigPicture.querySelector('.big-picture__img img');
const bigPictureLikesCount = bigPicture.querySelector('.likes-count');
const bigPictureClose = bigPicture.querySelector('.big-picture__cancel');
const commentsCaption = bigPicture.querySelector('.social__caption');

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

const openBigPicture = (pictureId) => {
  const currentPicture = picturesList.find((picture) => picture.id === Number(pictureId));

  bigPictureImg.src = currentPicture.url;
  bigPictureLikesCount.textContent = currentPicture.likes;
  commentsCaption.textContent = currentPicture.description;

  showComments(currentPicture.comments);

  bigPicture.classList.remove('hidden');
  document.body.classList.add('modal-open');
  bigPictureClose.addEventListener('click', onCancelClickClose);
  document.addEventListener('keydown', onEscapeButtonClose);
};

pictures.addEventListener('click', (evt) => {
  const currentPicture = evt.target.closest('.picture');
  if (currentPicture) {
    evt.preventDefault();
    openBigPicture(currentPicture.dataset.pictureId);
  }
});
