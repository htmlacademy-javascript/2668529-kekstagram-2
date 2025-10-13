import { picturesList } from './pictures.js';

const pictures = document.querySelector('.pictures');
const bigPicture = document.querySelector('.big-picture');
const bigPictureImg = bigPicture.querySelector('.big-picture__img img');
const bigPictureLikesCount = bigPicture.querySelector('.likes-count');
const bigPictureClose = bigPicture.querySelector('.big-picture__cancel');
const commentsCaption = bigPicture.querySelector('.social__caption');
const commentsCount = bigPicture.querySelector('.social__comment-count');
const commentsLoader = bigPicture.querySelector('.social__comments-loader');
const socialComments = bigPicture.querySelector('.social__comments');
const socialCommentTemplate = socialComments.querySelector('.social__comment');

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
  bigPicture.classList.add('hidden');
  bigPictureClose.removeEventListener('click', onCancelClickClose);
  document.removeEventListener('keydown', onEscapeButtonClose);
}

const openBigPicture = (pictureId) => {
  const currentPicture = picturesList.find((picture) => picture.id === Number(pictureId));
  const socialCommentsFragment = document.createDocumentFragment();

  bigPictureImg.src = currentPicture.url;
  bigPictureLikesCount.textContent = currentPicture.likes;
  socialComments.innerHTML = '';

  currentPicture.comments.forEach((comment) => {
    const socialComment = socialCommentTemplate.cloneNode(true);
    socialComment.querySelector('.social__picture').src = comment.avatar;
    socialComment.querySelector('.social__picture').alt = comment.name;
    socialComment.querySelector('.social__text').textContent = comment.message;
    socialCommentsFragment.appendChild(socialComment);
  });
  socialComments.appendChild(socialCommentsFragment);
  commentsCaption.textContent = currentPicture.description;

  commentsCount.classList.add('hidden');
  commentsLoader.classList.add('hidden');

  bigPicture.classList.remove('hidden');
  bigPictureClose.addEventListener('click', onCancelClickClose);
  document.body.classList.add('modal-open');
  document.addEventListener('keydown', onEscapeButtonClose);
};

pictures.addEventListener('click', (evt) => {
  const currentPicture = evt.target.closest('.picture');
  if (currentPicture) {
    evt.preventDefault();
    openBigPicture(currentPicture.dataset.pictureId);
  }
});
