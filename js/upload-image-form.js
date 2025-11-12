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
let activeUploadMessage = null;
let isUploadMessageOpen = false;

const onEscapeButtonFormClose = (evt) => {
  if (evt.key === 'Escape') {
    evt.preventDefault();
    if (isUploadMessageOpen) {
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

uploadFile.addEventListener('change', openUploadImageForm);

const onUploadMessageEscKeydown = (evt) => {
  if (evt.key === 'Escape') {
    evt.preventDefault();
    closeUploadMessage();
  }
};

const onUploadMessageOutsideClick = (evt) => {
  if (!activeUploadMessage) {
    return;
  }
  if (!evt.target.closest('.success__inner') && !evt.target.closest('.error__inner')) {
    closeUploadMessage();
  }
};

function closeUploadMessage() {
  if (activeUploadMessage) {
    activeUploadMessage.remove();
    activeUploadMessage = null;
  }
  isUploadMessageOpen = false;
  document.removeEventListener('keydown', onUploadMessageEscKeydown);
  document.removeEventListener('click', onUploadMessageOutsideClick);
}

function showMessage(template, innerSelector, buttonSelector) {
  closeUploadMessage();

  const message = template.cloneNode(true);
  document.body.appendChild(message);
  activeUploadMessage = message;
  isUploadMessageOpen = true;

  const inner = message.querySelector(innerSelector);
  if (inner) {
    inner.addEventListener('click', (evt) => {
      evt.stopPropagation();
    });
  }

  const button = message.querySelector(buttonSelector);
  if (button) {
    button.addEventListener('click', () => {
      closeUploadMessage();
    });
  }

  document.addEventListener('keydown', onUploadMessageEscKeydown);
  document.addEventListener('click', onUploadMessageOutsideClick);
}

const showUploadSuccessMessage = () =>
  showMessage(successModalTemplate, '.success__inner', '.success__button');

const showUploadErrorMessage = () =>
  showMessage(errorModalTemplate, '.error__inner', '.error__button');

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
