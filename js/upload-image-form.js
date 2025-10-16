const uploadImageForm = document.querySelector('.img-upload__form');
const uploadFile = uploadImageForm.querySelector('#upload-file');
const uploadImgModal = uploadImageForm.querySelector('.img-upload__overlay');
const photoEditorCancelButton = uploadImgModal.querySelector('#upload-cancel');
const hashTagInput = uploadImageForm.querySelector('.text__hashtags');
const descriptionInput = uploadImageForm.querySelector('.text__description');

const onEscapeButtonClose = (evt) => {
  if (evt.key === 'Escape') {
    evt.preventDefault();
    resetForm();
    closeUploadImgModal();
  }
};

const onCancelButtonClick = (evt) => {
  evt.preventDefault();
  closeUploadImgModal();
};

function closeUploadImgModal() {
  document.body.classList.remove('modal-open');
  uploadImgModal.classList.add('hidden');
  document.removeEventListener('keydown', onEscapeButtonClose);
  photoEditorCancelButton.removeEventListener('click', onCancelButtonClick);
  uploadFile.value = '';
}

const pristine = new Pristine(uploadImageForm, {
  classTo: 'img-upload__form',
  errorTextParent: 'img-upload__field-wrapper',
  errorTextClass: 'img-upload__field-wrapper--error'
});

const validateHashtags = (value) => {
  if (value === '') {
    return true;
  }
  const hashtags = value.split(/\s+/);
  const regex = /^#[a-zA-Zа-яА-ЯёЁ0-9]{1,19}$/;
  return hashtags.length <= 5 && hashtags.every((tag) => regex.test(tag));
};

pristine.addValidator(
  hashTagInput,
  validateHashtags,
  'Хэштеги должны начинаться с #, содержать только буквы/цифры и не превышать 20 символов. Максимум 5 хэштегов.'
);

const validateDescription = (value) => value.length <= 140;

pristine.addValidator(
  descriptionInput,
  validateDescription,
  'Описание не должно превышать 140 символов.'
);

// Обработка отправки формы
uploadImageForm.addEventListener('submit', (event) => {
  event.preventDefault();
  const isValid = pristine.validate();
  if (isValid) {
    // eslint-disable-next-line no-console
    console.log('Форма валидна и готова к отправке!');
  } else {
    // eslint-disable-next-line no-console
    console.log('Форма заполнена некорректно.');
  }
});

// Сброс всех полей формы
function resetForm () {
  uploadImageForm.reset();
  pristine.reset();
}

// Обработка кнопки отмены
photoEditorCancelButton.addEventListener('click', () => {
  resetForm();
});

const openUploadModal = () => {
  document.body.classList.add('modal-open');
  uploadImgModal.classList.remove('hidden');
  photoEditorCancelButton.addEventListener('click', onCancelButtonClick);
  document.addEventListener('keydown', onEscapeButtonClose);
};

uploadFile.addEventListener('change', openUploadModal);
