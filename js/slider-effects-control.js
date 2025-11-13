const sliderElement = document.querySelector('.effect-level__slider');
const imagePreview = document.querySelector('.img-upload__preview img');
const effectLevelValue = document.querySelector('.effect-level__value');
const effectLevelContainer = document.querySelector('.img-upload__effect-level');
const effectsList = document.querySelector('.effects__list');
const defaultEffect = document.querySelector('#effect-none');

let currentEffect = 'none';

const EFFECTS = {
  none: {
    filter: () => '',
    options: { range: { min: 0, max: 100 }, start: 100, step: 1 },
  },
  chrome: {
    filter: (v) => `grayscale(${v})`,
    options: { range: { min: 0, max: 1 }, start: 1, step: 0.1 },
  },
  sepia: {
    filter: (v) => `sepia(${v})`,
    options: { range: { min: 0, max: 1 }, start: 1, step: 0.1 },
  },
  marvin: {
    filter: (v) => `invert(${v}%)`,
    options: { range: { min: 0, max: 100 }, start: 100, step: 1 },
  },
  phobos: {
    filter: (v) => `blur(${v}px)`,
    options: { range: { min: 0, max: 3 }, start: 3, step: 0.1 },
  },
  heat: {
    filter: (v) => `brightness(${v})`,
    options: { range: { min: 1, max: 3 }, start: 3, step: 0.1 },
  },
};

noUiSlider.create(sliderElement, {
  range: { min: 0, max: 100 },
  start: 100,
  step: 1,
  connect: 'lower',
});

const applyEffect = (effect, value) => {
  const effectData = EFFECTS[effect];
  imagePreview.style.filter = effectData ? effectData.filter(parseFloat(value)) : '';
};

const setEffect = (effect) => {
  currentEffect = effect;
  const { options } = EFFECTS[effect] || EFFECTS.none;

  if (effect === 'none') {
    effectLevelContainer.classList.add('hidden');
    imagePreview.style.filter = '';
  } else {
    effectLevelContainer.classList.remove('hidden');
    sliderElement.noUiSlider.updateOptions({
      range: options.range,
      start: options.start,
      step: options.step,
    });
    applyEffect(effect, options.start);
  }

  effectLevelValue.value = options.start;
};

const resetEffects = () => {
  setEffect('none');
  currentEffect = 'none';
  if (defaultEffect) {
    defaultEffect.checked = true;
  }
};

sliderElement.noUiSlider.on('update', (values, handle) => {
  const value = values[handle];
  const normalizedValue = parseFloat(value).toString();
  effectLevelValue.value = normalizedValue;
  applyEffect(currentEffect, normalizedValue);
});

const setupEffects = () => {
  effectsList.addEventListener('change', (evt) => {
    setEffect(evt.target.value);
  });
  setEffect('none');
};

export { setupEffects, resetEffects };
