const MAX_PHOTO_ID = 25;
const MAX_PHOTO_NUMBER = 25;
const MIN_LIKES = 15;
const MAX_LIKES = 200;
const MAX_COMMENT_ID = 200;
const MAX_AVATAR_NUMBER = 6;
const MAX_COMMENTS = 30;
const PHOTO_ARRAY_COUNT = 25;



const getRandomArrayElement = (elements) => elements[getRandomInteger(0, elements.length - 1)];



const generatePhotoId = createRandomId(1, MAX_PHOTO_ID);
const generateCommentId = createRandomId(1, MAX_COMMENT_ID);

const createComment = () => ({
  id: generateCommentId(),
  avatar: `img/avatar-${getRandomInteger(1 , MAX_AVATAR_NUMBER)}.svg`,
  message: getRandomArrayElement(MESSAGES),
  name: getRandomArrayElement(NAMES)
});

const creatPhoto = () => ({
  id: generatePhotoId(),
  url: `photos/${getRandomInteger(1 , MAX_PHOTO_NUMBER)}.jpg`,
  description: getRandomArrayElement(DESCRIPTION),
  likes: getRandomInteger(MIN_LIKES, MAX_LIKES),
  comments: Array.from({length: getRandomInteger(0, MAX_COMMENTS)}, createComment)
});

const photosArray = () => Array.from({length: PHOTO_ARRAY_COUNT}, creatPhoto);

photosArray();
