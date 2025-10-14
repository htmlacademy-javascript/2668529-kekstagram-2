const COUNT_STEP = 5;
let currentCount = 0;
let comments = [];

const bigPicture = document.querySelector('.big-picture');
const commentsCount = bigPicture.querySelector('.social__comment-count');
const commentsLoader = bigPicture.querySelector('.social__comments-loader');
const socialComments = bigPicture.querySelector('.social__comments');
const socialCommentTemplate = socialComments.querySelector('.social__comment');
socialComments.innerHTML = '';

const showNextComments = () => {
  const socialCommentsFragment = document.createDocumentFragment();
  const shownComments = comments.slice(currentCount, currentCount + COUNT_STEP);
  const shownCommentsLength = shownComments.length + currentCount;

  shownComments.forEach((comment) => {
    const socialComment = socialCommentTemplate.cloneNode(true);
    socialComment.querySelector('.social__picture').src = comment.avatar;
    socialComment.querySelector('.social__picture').alt = comment.name;
    socialComment.querySelector('.social__text').textContent = comment.message;
    socialCommentsFragment.appendChild(socialComment);
  });
  socialComments.appendChild(socialCommentsFragment);

  commentsCount.firstChild.textContent = `${shownCommentsLength} из `;
  commentsLoader.querySelector('.comments-count').textContent = comments.length;

  if (shownCommentsLength >= comments.length) {
    commentsLoader.classList.add('hidden');
  }
  currentCount = currentCount + COUNT_STEP;
};

const clearComments = () => {
  currentCount = 0;
  socialComments.innerHTML = '';
  commentsLoader.classList.remove('hidden');
  commentsLoader. removeEventListener('click', showNextComments);
};

const showComments = (currentPictureComments) => {
  comments = currentPictureComments;
  showNextComments();
  commentsLoader.addEventListener('click', showNextComments);
};

export { showComments, clearComments };


