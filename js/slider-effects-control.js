const sliderElement = document.querySelector('.effect-level__slider');
const imagePreview = document.querySelector('.img-upload__preview img');
const effectLevelValue = document.querySelector('.effect-level__value');
const effectLevelContainer = document.querySelector('.img-upload__effect-level');
const effectsList = document.querySelector('.effects__list');
const defaultEffect = document.querySelector('#effect-none');

let currentEffect = 'none';

noUiSlider.create(sliderElement, {
  range: { min: 0, max: 100 },
  start: 100,
  step: 1,
  connect: 'lower'
});

const applyEffect = (effect, value) => {
  const numericValue = parseFloat(value);
  switch (effect) {
    case 'chrome': imagePreview.style.filter = `grayscale(${numericValue})`; break;
    case 'sepia': imagePreview.style.filter = `sepia(${numericValue})`; break;
    case 'marvin': imagePreview.style.filter = `invert(${numericValue}%)`; break;
    case 'phobos': imagePreview.style.filter = `blur(${numericValue}px)`; break;
    case 'heat': imagePreview.style.filter = `brightness(${numericValue})`; break;
    default: imagePreview.style.filter = '';
  }
};

const setEffect = (effect) => {
  currentEffect = effect;
  if (effect === 'none') {
    effectLevelContainer.classList.add('hidden');
    imagePreview.style.filter = '';
    return;
  }

  effectLevelContainer.classList.remove('hidden');

  let settings;
  switch (effect) {
    case 'chrome':
    case 'sepia': settings = { min: 0, max: 1, step: 0.1, start: 1 }; break;
    case 'marvin': settings = { min: 0, max: 100, step: 1, start: 100 }; break;
    case 'phobos': settings = { min: 0, max: 3, step: 0.1, start: 3 }; break;
    case 'heat': settings = { min: 1, max: 3, step: 0.1, start: 3 }; break;
  }

  sliderElement.noUiSlider.updateOptions({
    range: { min: settings.min, max: settings.max },
    start: settings.start,
    step: settings.step,
  });

  applyEffect(effect, settings.start);
  effectLevelValue.value = settings.start;
};

const resetEffects = () => {
  imagePreview.style.filter = '';
  effectLevelContainer.classList.add('hidden');
  currentEffect = 'none';

  if (defaultEffect) {
    defaultEffect.checked = true;
  }

  sliderElement.noUiSlider.updateOptions({
    range: { min: 0, max: 100 },
    start: 100,
    step: 1,
  });

  effectLevelValue.value = 100;
};

sliderElement.noUiSlider.on('update', (values, handle) => {
  const value = values[handle];
  effectLevelValue.value = value;
  applyEffect(currentEffect, value);
});

const setupEffects = () => {
  effectsList.addEventListener('change', (evt) => {
    setEffect(evt.target.value);
  });
  setEffect('none');
};

export { setupEffects, resetEffects };

