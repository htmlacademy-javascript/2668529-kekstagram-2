import { setupValidation } from './form-fields-validation.js';
import { setupScaling, resetScale } from './image-scaling.js';
import { setupEffects, resetEffects } from './slider-effects-control.js';

const uploadImageForm = document.querySelector('.img-upload__form');
const uploadFile = uploadImageForm.querySelector('#upload-file');
const uploadImageModal = uploadImageForm.querySelector('.img-upload__overlay');
const uploadModalCancelButton = uploadImageModal.querySelector('#upload-cancel');
const hashTagInput = uploadImageForm.querySelector('.text__hashtags');
const descriptionInput = uploadImageForm.querySelector('.text__description');

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

uploadFile.addEventListener('change', openUploadImageModal);

uploadImageForm.addEventListener('submit', (evt) => {
  evt.preventDefault();
  const isValid = pristine.validate();
  if (isValid) {
    uploadImageForm.submit();
  }
});
