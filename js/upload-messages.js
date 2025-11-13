const successModalTemplate = document.querySelector('#success').content.querySelector('.success');
const errorModalTemplate = document.querySelector('#error').content.querySelector('.error');

let activeUploadMessage = null;
let isMessageOpen = false;

const onUploadMessageEscKeydown = (evt) => {
  if (evt.key === 'Escape') {
    evt.preventDefault();
    closeUploadMessage();
  }
};

const onUploadMessageOutsideClick = (evt) => {
  if (!activeUploadMessage) {
    return;
  }
  if (!evt.target.closest('.success__inner') && !evt.target.closest('.error__inner')) {
    closeUploadMessage();
  }
};

function closeUploadMessage() {
  if (activeUploadMessage) {
    activeUploadMessage.remove();
    activeUploadMessage = null;
  }
  isMessageOpen = false;
  document.removeEventListener('keydown', onUploadMessageEscKeydown);
  document.removeEventListener('click', onUploadMessageOutsideClick);
}

function showMessage(template, innerSelector, buttonSelector) {
  closeUploadMessage();

  const message = template.cloneNode(true);
  document.body.appendChild(message);
  activeUploadMessage = message;
  isMessageOpen = true;

  const inner = message.querySelector(innerSelector);
  if (inner) {
    inner.addEventListener('click', (evt) => {
      evt.stopPropagation();
    });
  }

  const button = message.querySelector(buttonSelector);
  if (button) {
    button.addEventListener('click', () => {
      closeUploadMessage();
    });
  }

  document.addEventListener('keydown', onUploadMessageEscKeydown);
  document.addEventListener('click', onUploadMessageOutsideClick);
}

const showUploadSuccessMessage = () =>
  showMessage(successModalTemplate, '.success__inner', '.success__button');

const showUploadErrorMessage = () =>
  showMessage(errorModalTemplate, '.error__inner', '.error__button');

const isUploadMessageOpen = () => isMessageOpen;

export { showUploadSuccessMessage, showUploadErrorMessage, isUploadMessageOpen };
