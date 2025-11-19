const ScaleSettings = {
  STEP: 25,
  MIN: 25,
  MAX: 100,
  DEFAULT: 100
};

const imagePreview = document.querySelector('.img-upload__preview img');
const smallerSizeButton = document.querySelector('.scale__control--smaller');
const biggerSizeButton = document.querySelector('.scale__control--bigger');
const scaleControlValue = document.querySelector('.scale__control--value');

let currentScale = ScaleSettings.DEFAULT;

const updateScale = () => {
  const scaleValue = currentScale / 100;
  imagePreview.style.transform = `scale(${scaleValue})`;
  scaleControlValue.value = `${currentScale}%`;
};

const resetScale = () => {
  currentScale = ScaleSettings.DEFAULT;
  imagePreview.style.transform = `scale(${ScaleSettings.DEFAULT / 100})`;
  scaleControlValue.value = `${ScaleSettings.DEFAULT}%`;
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

const defineScaling = () => {
  smallerSizeButton.addEventListener('click', onSmallerSizeButtonClick);
  biggerSizeButton.addEventListener('click', onBiggerSizeButtonClick);
};

export { defineScaling, resetScale };
