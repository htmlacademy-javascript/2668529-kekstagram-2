const FILE_TYPES = ['jpg', 'jpeg', 'png'];

const fileChooser = document.querySelector('#upload-file');
const preview = document.querySelector('.img-upload__preview img');
const effectsPreviews = document.querySelectorAll('.effects__preview');

const onFileChooserChange = () => {
  const file = fileChooser.files[0];
  if (!file) {
    return;
  }
  const fileName = file.name.toLowerCase();
  const matches = FILE_TYPES.some((it) => fileName.endsWith(it));

  if (matches) {
    const objectUrl = URL.createObjectURL(file);
    preview.src = objectUrl;
    effectsPreviews.forEach((effectPreview) => {
      effectPreview.style.backgroundImage = `url(${objectUrl})`;
    });
  }
};

fileChooser.addEventListener('change', onFileChooserChange);
