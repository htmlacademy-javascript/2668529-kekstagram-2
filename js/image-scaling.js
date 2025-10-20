export const setupScaling = (uploadImageForm) => {
  const imagePreview = uploadImageForm.querySelector('.img-upload__preview img');
  const smallerSizeButton = uploadImageForm.querySelector('.scale__control--smaller');
  const biggerSizeButton = uploadImageForm.querySelector('.scale__control--bigger');
  const scaleControlValue = uploadImageForm.querySelector('.scale__control--value');

  const SCALE_STEP = 25;
  const SCALE_MIN = 25;
  const SCALE_MAX = 100;
  let currentScale = 100;

  const updateScale = () => {
    const scaleValue = currentScale / 100;
    imagePreview.style.transform = `scale(${scaleValue})`;
    scaleControlValue.value = `${currentScale}%`;
  };

  const onSmallerSizeButtonClick = () => {
    if (currentScale > SCALE_MIN) {
      currentScale = currentScale - SCALE_STEP;
      updateScale();
    }
  };

  const onBiggerSizeButtonClick = () => {
    if (currentScale < SCALE_MAX) {
      currentScale = currentScale + SCALE_STEP;
      updateScale();
    }
  };

  smallerSizeButton.addEventListener('click', onSmallerSizeButtonClick);
  biggerSizeButton.addEventListener('click', onBiggerSizeButtonClick);
};
