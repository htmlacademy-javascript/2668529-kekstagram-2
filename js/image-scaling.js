const imagePreview = document.querySelector('.img-upload__preview img');
const smallerSizeButton = document.querySelector('.scale__control--smaller');
const biggerSizeButton = document.querySelector('.scale__control--bigger');
const scaleControlValue = document.querySelector('.scale__control--value');

let currentScale = 100;

const SCALE_SETTINGS = {
  STEP: 25,
  MIN: 25,
  MAX: 100,
  DEFAULT: 100
};

const updateScale = () => {
  const scaleValue = currentScale / 100;
  imagePreview.style.transform = `scale(${scaleValue})`;
  scaleControlValue.value = `${currentScale}%`;
};

const onSmallerSizeButtonClick = () => {
  if (currentScale > SCALE_SETTINGS.MIN) {
    currentScale = currentScale - SCALE_SETTINGS.STEP;
    updateScale();
  }
};

const onBiggerSizeButtonClick = () => {
  if (currentScale < SCALE_SETTINGS.MAX) {
    currentScale = currentScale + SCALE_SETTINGS.STEP;
    updateScale();
  }
};

const setupScaling = () => {
  smallerSizeButton.addEventListener('click', onSmallerSizeButtonClick);
  biggerSizeButton.addEventListener('click', onBiggerSizeButtonClick);
};

const resetScale = () => {
  imagePreview.style.transform = `scale(${SCALE_SETTINGS.DEFAULT / 100})`;
  scaleControlValue.value = `${SCALE_SETTINGS.DEFAULT}%`;
};

export { setupScaling, resetScale };
