const NAMES = [
  'Светлана',
  'Николай',
  'Джон',
  'Мария',
  'Дмитрий',
  'Иван',
  'Александр',
  'Петр',
  'Кирилл',
  'Василий'
];

const DESCRIPTION = [
  'Отличное фото!',
  'Фото не очень',
  'Фото не очень снова)',
  'Описание фото 4',
  'Описание фото 5',
  'еще одно описание фото'
];

const MESSAGES = [
  'Всё отлично!',
  'В целом всё неплохо. Но не всё.',
  'Когда вы делаете фотографию, хорошо бы убирать палец из кадра. В конце концов это просто непрофессионально.',
  'Моя бабушка случайно чихнула с фотоаппаратом в руках и у неё получилась фотография лучше.',
  'Я поскользнулся на банановой кожуре и уронил фотоаппарат на кота и у меня получилась фотография лучше.',
  'Лица у людей на фотке перекошены, как будто их избивают. Как можно было поймать такой неудачный момент?!'
];

const MAX_PHOTO_ID = 25;
const MAX_PHOTO_NUMBER = 25;
const MIN_LIKES = 15;
const MAX_LIKES = 200;
const MAX_COMMENT_ID = 200;
const MAX_AVATAR_NUMBER = 6;
const MAX_COMMENTS = 30;
const PHOTO_ARRAY_COUNT = 25;

const getRandomInteger = (a, b) => {
  const lower = Math.ceil(Math.min(a, b));
  const upper = Math.floor(Math.max(a, b));
  const result = Math.random() * (upper - lower + 1) + lower;
  return Math.floor(result);
};

const getRandomArrayElement = (elements) => elements[getRandomInteger(0, elements.length - 1)];

function createRandomId(min, max) {
  const previousValues = [];

  return function() {
    let currentValue = getRandomInteger(min, max);
    if (previousValues.length >= (max - min + 1)) {
      return null;
    }
    while (previousValues.includes(currentValue)) {
      currentValue = getRandomInteger(min, max);
    }
    previousValues.push(currentValue);
    return currentValue;
  };
}

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
