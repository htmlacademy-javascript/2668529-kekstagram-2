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

function closeUploadImgModal() {
  document.body.classList.remove('modal-open');
  uploadImageModal.classList.add('hidden');
  resetScale();
  resetEffects();
  document.removeEventListener('keydown', onEscapeButtonClose);
  uploadModalCancelButton.removeEventListener('click', onCancelButtonClick);
  uploadFile.value = '';
}

const openUploadImageModal = () => {
  document.body.classList.add('modal-open');
  uploadImageModal.classList.remove('hidden');
  pristine = setupValidation(uploadImageForm);
  setupScaling(uploadImageForm);
  setupEffects(uploadImageForm);
  uploadModalCancelButton.addEventListener('click', onCancelButtonClick);
  document.addEventListener('keydown', onEscapeButtonClose);
};

function clearFormFields () {
  uploadImageForm.reset();
  pristine.reset();
}

const showSuccessMessage = () => {
  const successMessage = successModalTemplate.cloneNode(true);
  const successModalButton = successMessage.querySelector('.success__button');
  document.body.appendChild(successMessage);
  const closeSuccessMessage = () => successMessage.remove();
  successModalButton.addEventListener('click', closeSuccessMessage);
  document.addEventListener('keydown', (evt) => evt.key === 'Escape' && closeSuccessMessage());
  successMessage.addEventListener('click', (evt) => {
    if (!evt.target.closest('.success__inner')) {
      closeSuccessMessage();
    }
  });
};

const showErrorMessage = () => {
  const errorMessage = errorModalTemplate.cloneNode(true);
  const errorModalButton = errorMessage.querySelector('.error__button');
  document.body.appendChild(errorMessage);
  const closeErrorMessage = () => errorMessage.remove();
  errorModalButton.addEventListener('click', closeErrorMessage);
  document.addEventListener('keydown', (evt) => evt.key === 'Escape' && closeErrorMessage());
  errorMessage.addEventListener('click', (evt) => {
    if (!evt.target.closest('.error__inner')) {
      closeErrorMessage();
    }
  });
};

uploadFile.addEventListener('change', openUploadImageModal);

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
  if (isValid) {
    blockSubmitButton();
    try {
      await sendData(new FormData(uploadImageForm));
      showSuccessMessage();
      clearFormFields();
      closeUploadImgModal();
    } catch {
      showErrorMessage();
    } finally {
      unblockSubmitButton();
    }
  }
});
