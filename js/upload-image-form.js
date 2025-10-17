const uploadImageForm = document.querySelector('.img-upload__form');
const uploadFile = uploadImageForm.querySelector('#upload-file');
const uploadImageModal = uploadImageForm.querySelector('.img-upload__overlay');
const uploadModalCancelButton = uploadImageModal.querySelector('#upload-cancel');
const hashTagInput = uploadImageForm.querySelector('.text__hashtags');
const descriptionInput = uploadImageForm.querySelector('.text__description');

const imagePreview = uploadImageForm.querySelector('.img-upload__preview');
const smallerSizeButton = uploadImageForm.querySelector('.scale__control--smaller');
const biggerSizeButton = uploadImageForm.querySelector('.scale__control--bigger');
const scaleControlValue = uploadImageForm.querySelector('.scale__control--value');

const SIZE_SCALE_STEP = 0.25;

let currentScale = 1;

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

const onSmallerSizeButtonClick = () => {
  if (currentScale > SIZE_SCALE_STEP) {
    currentScale = currentScale - SIZE_SCALE_STEP;
    imagePreview.style.transform = `scale(${currentScale})`;
    scaleControlValue.value = `${currentScale * 100}%`;
  }
};

const onBiggerSizeButtonClick = () => {
  if (currentScale < 1) {
    currentScale = currentScale + SIZE_SCALE_STEP;
    imagePreview.style.transform = `scale(${currentScale})`;
    scaleControlValue.value = `${currentScale * 100}%`;
  }
};

const validateHashtagsContent = (value) => {
  if (value === '') {
    return true;
  }
  const hashtags = value.split(/\s+/);
  const hashtagRegex = /^#[a-zA-Zа-яА-ЯёЁ0-9]+$/;

  return hashtags.every((tag) => hashtagRegex.test(tag) && tag.length <= 20 && tag.length > 1);
};

const validateHashtagsCount = (value) => {
  const hashtags = value.split(/\s+/);
  return hashtags.length <= 5;
};

const validateHashtagsUnique = (value) => {
  const hashtags = value.split(/\s+/);
  const lowerCaseHashtags = hashtags.map((tag) => tag.toLowerCase());
  const uniqueHashtags = new Set(lowerCaseHashtags);

  return uniqueHashtags.size === hashtags.length;
};

const validateDescription = (value) => value.length <= 140;

pristine.addValidator(
  descriptionInput,
  validateDescription,
  'Описание не должно превышать 140 символов.'
);

pristine.addValidator(
  hashTagInput,
  validateHashtagsContent,
  'Хэштеги должны начинаться с #, содержать только буквы/цифры и не превышать 20 символов. ' +
  'Хештег не может состоять только из одной решётки.'
);

pristine.addValidator(
  hashTagInput,
  validateHashtagsCount,
  'Нельзя указать больше 5 хэштегов!'
);

pristine.addValidator(
  hashTagInput,
  validateHashtagsUnique,
  'Хэштеги не могут повторяться!'
);

uploadFile.addEventListener('change', openUploadImageModal);

uploadImageForm.addEventListener('submit', (event) => {
  event.preventDefault();
  const isValid = pristine.validate();
  if (isValid) {
    uploadImageForm.submit();
  }
});

smallerSizeButton.addEventListener('click', onSmallerSizeButtonClick);

biggerSizeButton.addEventListener('click', onBiggerSizeButtonClick);
