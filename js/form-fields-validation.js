export const setupValidation = (uploadImageForm) => {
  const hashTagInput = uploadImageForm.querySelector('.text__hashtags');
  const descriptionInput = uploadImageForm.querySelector('.text__description');

  const SCALE_SETTINGS = {
    MAX_COMMENT_LENGTH: 140,
    MAX_HASHTAGS_LENGTH: 20,
    MIN_HASHTAGS_LENGTH: 1,
    MAX_HASHTAG_COUNT: 5
  };

  const pristine = new Pristine(uploadImageForm, {
    classTo: 'img-upload__form',
    errorTextParent: 'img-upload__field-wrapper',
    errorTextClass: 'img-upload__field-wrapper--error'
  });

  const validateHashtagsContent = (value) => {
    if (value === '') {
      return true;
    }
    const hashtags = value.split(/\s+/);
    const hashtagRegex = /^#[a-zA-Zа-яА-ЯёЁ0-9]+$/;

    return hashtags.every((tag) => hashtagRegex.test(tag) && tag.length <= SCALE_SETTINGS.MAX_HASHTAGS_LENGTH &&
      tag.length > SCALE_SETTINGS.MIN_HASHTAGS_LENGTH);
  };

  const validateHashtagsCount = (value) => {
    const hashtags = value.split(/\s+/);
    return hashtags.length <= SCALE_SETTINGS.MAX_HASHTAG_COUNT;
  };

  const validateHashtagsUnique = (value) => {
    const hashtags = value.split(/\s+/);
    const lowerCaseHashtags = hashtags.map((tag) => tag.toLowerCase());
    const uniqueHashtags = new Set(lowerCaseHashtags);

    return uniqueHashtags.size === hashtags.length;
  };

  const validateDescription = (value) => value.length <= SCALE_SETTINGS.MAX_COMMENT_LENGTH;

  pristine.addValidator(descriptionInput, validateDescription, 'Описание не должно превышать 140 символов.');
  pristine.addValidator(hashTagInput, validateHashtagsContent, 'Хэштеги должны начинаться с #, содержать только буквы/цифры ' +
    'и не превышать 20 символов. Хештег не может состоять только из одной решётки.');
  pristine.addValidator(hashTagInput, validateHashtagsCount, 'Нельзя указать больше 5 хэштегов!');
  pristine.addValidator(hashTagInput, validateHashtagsUnique, 'Хэштеги не могут повторяться!');

  return pristine;
};
