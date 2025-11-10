const imagePreview = document.querySelector('.img-upload__preview img');
const smallerSizeButton = document.querySelector('.scale__control--smaller');
const biggerSizeButton = document.querySelector('.scale__control--bigger');
const scaleControlValue = document.querySelector('.scale__control--value');

const ScaleSettings = {
  STEP: 25,
  MIN: 25,
  MAX: 100,
  DEFAULT: 100
};

let currentScale = ScaleSettings.DEFAULT;

const updateScale = () => {
  const scaleValue = currentScale / 100;
  imagePreview.style.transform = `scale(${scaleValue})`;
  scaleControlValue.value = `${currentScale}%`;
};

const onSmallerSizeButtonClick = () => {
  if (currentScale > ScaleSettings.MIN) {
    currentScale = currentScale - ScaleSettings.STEP;
    updateScale();
  }
};

const onBiggerSizeButtonClick = () => {
  if (currentScale < ScaleSettings.MAX) {
    currentScale = currentScale + ScaleSettings.STEP;
    updateScale();
  }
};

const setupScaling = () => {
  smallerSizeButton.addEventListener('click', onSmallerSizeButtonClick);
  biggerSizeButton.addEventListener('click', onBiggerSizeButtonClick);
};

const resetScale = () => {
  imagePreview.style.transform = `scale(${ScaleSettings.DEFAULT / 100})`;
  scaleControlValue.value = `${ScaleSettings.DEFAULT}%`;
};

export { setupScaling, resetScale };
