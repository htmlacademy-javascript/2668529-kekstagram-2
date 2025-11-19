import { defineValidation } from './form-fields-validation.js';
import { defineScaling, resetScale } from './image-scaling.js';
import { defineEffects, resetEffects } from './slider-effects-control.js';
import { sendData } from './api.js';
import { showUploadErrorMessage, showUploadSuccessMessage, isUploadMessageOpen } from './upload-messages.js';

const SubmitButtonText = {
  IDLE: 'Опубликовать',
  SENDING: 'Публикуется...'
};

const uploadImageForm = document.querySelector('.img-upload__form');
const uploadFile = uploadImageForm.querySelector('#upload-file');
const uploadImageModal = uploadImageForm.querySelector('.img-upload__overlay');
const uploadModalCancelButton = uploadImageModal.querySelector('#upload-cancel');
const hashTagInput = uploadImageForm.querySelector('.text__hashtags');
const descriptionInput = uploadImageForm.querySelector('.text__description');
const submitButton = uploadImageForm.querySelector('#upload-submit');

let pristine;

const onEscapeButtonFormClose = (evt) => {
  if (evt.key === 'Escape') {
    evt.preventDefault();
    if (isUploadMessageOpen()) {
      return;
    }
    if (document.activeElement === hashTagInput || document.activeElement === descriptionInput) {
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

const onUploadFileChange = () => {
  openUploadImageForm();
};

const onUploadImageFormSubmit = async (evt) => {
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

function openUploadImageForm() {
  document.body.classList.add('modal-open');
  uploadImageModal.classList.remove('hidden');
  pristine = defineValidation(uploadImageForm);
  defineScaling(uploadImageForm);
  defineEffects(uploadImageForm);
  uploadModalCancelButton.addEventListener('click', onFormCancelButtonClick);
  document.addEventListener('keydown', onEscapeButtonFormClose);
  document.addEventListener('click', onOutsideClickFormClose);
}

function blockSubmitButton() {
  submitButton.disabled = true;
  submitButton.textContent = SubmitButtonText.SENDING;
}

function unblockSubmitButton() {
  submitButton.disabled = false;
  submitButton.textContent = SubmitButtonText.IDLE;
}

function clearFormFields () {
  uploadImageForm.reset();
  pristine.reset();
}

uploadFile.addEventListener('change', onUploadFileChange);
uploadImageForm.addEventListener('submit', onUploadImageFormSubmit);
