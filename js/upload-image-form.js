const uploadImageForm = document.querySelector('.img-upload__form');
const uploadFile = uploadImageForm.querySelector('#upload-file');
const uploadImageModal = uploadImageForm.querySelector('.img-upload__overlay');
const uploadModalCancelButton = uploadImageModal.querySelector('#upload-cancel');
const hashTagInput = uploadImageForm.querySelector('.text__hashtags');
const descriptionInput = uploadImageForm.querySelector('.text__description');

const onEscapeButtonClose = (evt) => {
  if (evt.key === 'Escape') {
    evt.preventDefault();
    if(document.activeElement === hashTagInput || document.activeElement === descriptionInput) {
      evt.stopPropagation();
    } else {
      clearFormFields();
      closeUploadImgModal();
    }
  }
};

const onCancelButtonClick = (evt) => {
  evt.preventDefault();
  clearFormFields();
  closeUploadImgModal();
};

const pristine = new Pristine(uploadImageForm, {
  classTo: 'img-upload__form',
  errorTextParent: 'img-upload__field-wrapper',
  errorTextClass: 'img-upload__field-wrapper--error'
});

function closeUploadImgModal() {
  document.body.classList.remove('modal-open');
  uploadImageModal.classList.add('hidden');
  document.removeEventListener('keydown', onEscapeButtonClose);
  uploadModalCancelButton.removeEventListener('click', onCancelButtonClick);
  uploadFile.value = '';
}

const openUploadImageModal = () => {
  document.body.classList.add('modal-open');
  uploadImageModal.classList.remove('hidden');
  uploadModalCancelButton.addEventListener('click', onCancelButtonClick);
  document.addEventListener('keydown', onEscapeButtonClose);
};

function clearFormFields () {
  uploadImageForm.reset();
  pristine.reset();
}

const validateHashtags = (value) => {
  if (value === '') {
    return true;
  }
  const hashtags = value.split(/\s+/);
  const hashtagRegex = /^#[a-zA-Zа-яА-ЯёЁ0-9]+$/;

  if (hashtags.length > 5) {
    return false;
  }

  const lowerCaseHashtags = hashtags.map((tag) => tag.toLowerCase());
  const uniqueHashtags = new Set(lowerCaseHashtags);

  return hashtags.every((tag) => hashtagRegex.test(tag) && tag.length <= 20 && tag.length > 1) &&
    uniqueHashtags.size === hashtags.length;
};

const validateDescription = (value) => value.length <= 140;

pristine.addValidator(
  descriptionInput,
  validateDescription,
  'Описание не должно превышать 140 символов.'
);

pristine.addValidator(
  hashTagInput,
  validateHashtags,
  'Хэштеги должны начинаться с #, содержать только буквы/цифры и не превышать 20 символов. Максимум 5 хэштегов.'
);

uploadFile.addEventListener('change', openUploadImageModal);

uploadImageForm.addEventListener('submit', (event) => {
  event.preventDefault();
  const isValid = pristine.validate();
  if (isValid) {
    uploadImageForm.submit();
  }
});

