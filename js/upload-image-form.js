import { setupValidation } from './form-fields-validation.js';
import { setupScaling, resetScale } from './image-scaling.js';
import { setupEffects, resetEffects } from './slider-effects-control.js';
import { sendData } from './api.js';

const uploadImageForm = document.querySelector('.img-upload__form');
const uploadFile = uploadImageForm.querySelector('#upload-file');
const uploadImageModal = uploadImageForm.querySelector('.img-upload__overlay');
const uploadModalCancelButton = uploadImageModal.querySelector('#upload-cancel');
const hashTagInput = uploadImageForm.querySelector('.text__hashtags');
const descriptionInput = uploadImageForm.querySelector('.text__description');
const submitButton = uploadImageForm.querySelector('#upload-submit');
const successModalTemplate = document.querySelector('#success').content.querySelector('.success');
const errorModalTemplate = document.querySelector('#error').content.querySelector('.error');

const SubmitButtonText = {
  IDLE: 'Опубликовать',
  SENDING: 'Публикуется...'
};

let pristine;

const onEscapeButtonFormClose = (evt) => {
  if (evt.key === 'Escape') {
    evt.preventDefault();
    if(document.activeElement === hashTagInput || document.activeElement === descriptionInput) {
      evt.stopPropagation();
    } else {
      clearFormFields();
      closeUploadImageForm();
    }
  }
};

const onFormCancelButtonClick = (evt) => {
  evt.preventDefault();
  clearFormFields();
  closeUploadImageForm();
};

const onOutsideClickFormClose = (evt) => {
  const isClickInsideForm = evt.target.closest('.img-upload__wrapper');
  const isClickOnError = evt.target.closest('.error');
  const isClickOnSuccess = evt.target.closest('.success');

  if (!isClickInsideForm && !isClickOnError && !isClickOnSuccess) {
    evt.preventDefault();
    clearFormFields();
    closeUploadImageForm();
  }
};

function closeUploadImageForm() {
  document.body.classList.remove('modal-open');
  uploadImageModal.classList.add('hidden');
  resetScale();
  resetEffects();
  document.removeEventListener('keydown', onEscapeButtonFormClose);
  document.removeEventListener('click', onOutsideClickFormClose);
  uploadModalCancelButton.removeEventListener('click', onFormCancelButtonClick);
  uploadFile.value = '';
}

const openUploadImageForm = () => {
  document.body.classList.add('modal-open');
  uploadImageModal.classList.remove('hidden');
  pristine = setupValidation(uploadImageForm);
  setupScaling(uploadImageForm);
  setupEffects(uploadImageForm);
  uploadModalCancelButton.addEventListener('click', onFormCancelButtonClick);
  document.addEventListener('keydown', onEscapeButtonFormClose);
  document.addEventListener('click', onOutsideClickFormClose);
};

function clearFormFields () {
  uploadImageForm.reset();
  pristine.reset();
}

const onUploadSuccessEscKeydown = (evt) => {
  if (evt.key === 'Escape') {
    evt.preventDefault();
    evt.stopImmediatePropagation();
    closeUploadSuccessMessage();
  }
};

const onUploadSuccessOutsideClick = (evt) => {
  if (!evt.target.closest('.success__inner')) {
    evt.stopImmediatePropagation();
    closeUploadSuccessMessage();
  }
};

const onUploadSuccessButtonClick = (evt) => {
  evt.stopImmediatePropagation();
  closeUploadSuccessMessage();
};

function closeUploadSuccessMessage() {
  const uploadSuccessMessage = document.querySelector('.success');
  if (uploadSuccessMessage) {
    uploadSuccessMessage.remove();
    document.removeEventListener('keydown', onUploadSuccessEscKeydown);
    document.removeEventListener('click', onUploadSuccessOutsideClick);
    document.removeEventListener('click', onUploadSuccessButtonClick);
  }
}

const showUploadSuccessMessage = () => {
  const UploadSuccessMessage = successModalTemplate.cloneNode(true);
  document.body.appendChild(UploadSuccessMessage);

  const inner = UploadSuccessMessage.querySelector('.success__inner');
  if (inner) {
    inner.addEventListener('click', (evt) => evt.stopPropagation());
  }

  document.addEventListener('keydown', onUploadSuccessEscKeydown);
  document.addEventListener('click', onUploadSuccessOutsideClick);
  const closeButton = UploadSuccessMessage.querySelector('.success__button');
  if (closeButton) {
    closeButton.addEventListener('click', closeUploadSuccessMessage);
  }
};

const onUploadErrorEscKeydown = (evt) => {
  if (evt.key === 'Escape') {
    evt.preventDefault();
    evt.stopImmediatePropagation();
    closeUploadErrorMessage();
  }
};

const onUploadErrorOutsideClick = (evt) => {
  if (!evt.target.closest('.error__inner')) {
    evt.stopImmediatePropagation();
    closeUploadErrorMessage();
  }
};

const onUploadErrorButtonClick = (evt) => {
  evt.stopImmediatePropagation();
  closeUploadErrorMessage();
};

function closeUploadErrorMessage() {
  const uploadErrorMessage = document.querySelector('.error');
  if (uploadErrorMessage) {
    uploadErrorMessage.remove();
    document.removeEventListener('keydown', onUploadErrorEscKeydown, true);
    document.removeEventListener('click', onUploadErrorOutsideClick);
    document.removeEventListener('click', onUploadErrorButtonClick);
  }
}

const showUploadErrorMessage = () => {
  const uploadErrorMessage = errorModalTemplate.cloneNode(true);
  document.body.appendChild(uploadErrorMessage);

  const inner = uploadErrorMessage.querySelector('.error__inner');
  if (inner) {
    inner.addEventListener('click', (evt) => evt.stopPropagation());
  }

  document.addEventListener('keydown', onUploadErrorEscKeydown, true);
  document.addEventListener('click', onUploadErrorOutsideClick);
  const closeButton = uploadErrorMessage.querySelector('.error__button');
  if (closeButton) {
    closeButton.addEventListener('click', closeUploadErrorMessage);
  }
};

uploadFile.addEventListener('change', openUploadImageForm);

const blockSubmitButton = () => {
  submitButton.disabled = true;
  submitButton.textContent = SubmitButtonText.SENDING;
};

const unblockSubmitButton = () => {
  submitButton.disabled = false;
  submitButton.textContent = SubmitButtonText.IDLE;
};

uploadImageForm.addEventListener('submit', async (evt) => {
  evt.preventDefault();
  const isValid = pristine.validate();
  if (!isValid) {
    return;
  }
  blockSubmitButton();
  try {
    await sendData(new FormData(uploadImageForm));
    showUploadSuccessMessage();
    clearFormFields();
    closeUploadImageForm();
  } catch {
    showUploadErrorMessage();
  } finally {
    unblockSubmitButton();
  }
});
