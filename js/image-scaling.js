const setupScaling = (uploadImageForm) => {
  const imagePreview = uploadImageForm.querySelector('.img-upload__preview img');
  const smallerSizeButton = uploadImageForm.querySelector('.scale__control--smaller');
  const biggerSizeButton = uploadImageForm.querySelector('.scale__control--bigger');
  const scaleControlValue = uploadImageForm.querySelector('.scale__control--value');

  const SCALE_SETTINGS = {
    STEP: 25,
    MIN: 25,
    MAX: 100
  };

  let currentScale = 100;

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

  smallerSizeButton.addEventListener('click', onSmallerSizeButtonClick);
  biggerSizeButton.addEventListener('click', onBiggerSizeButtonClick);
};

const resetScale = () => {
  const imagePreview = document.querySelector('.img-upload__preview img');
  const scaleValue = document.querySelector('.scale__control--value');
  const DEFAULT_SCALE = 100;

  imagePreview.style.transform = `scale(${DEFAULT_SCALE / 100})`;
  scaleValue.value = `${DEFAULT_SCALE}%`;
};

export { setupScaling, resetScale };
