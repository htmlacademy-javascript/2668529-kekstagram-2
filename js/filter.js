import { debounce } from './util.js';
import { clearPictures, renderPictures, getAllPictures } from './pictures.js';

const RANDOM_PICTURES_COUNT = 10;
const RERENDER_DELAY = 500;

const FILTER = {
  default: 'filter-default',
  random: 'filter-random',
  discussed: 'filter-discussed',
};

const filters = document.querySelector('.img-filters');
const filterButtons = filters.querySelectorAll('.img-filters__button');

let debouncedFilter = null;

const getRandomUniquePictures = (pictures, count) => {
  const shuffled = [...pictures].sort(() => Math.random() - 0.5);
  return shuffled.slice(0, count);
};

const sortPicturesByComments = (a, b) => b.comments.length - a.comments.length;

const applyFilter = (filterId) => {
  clearPictures();
  let filteredPictures = [];

  switch (filterId) {
    case FILTER.random:
      filteredPictures = getRandomUniquePictures(getAllPictures(), RANDOM_PICTURES_COUNT);
      break;
    case FILTER.discussed:
      filteredPictures = [...getAllPictures()].sort(sortPicturesByComments);
      break;
    default:
      filteredPictures = getAllPictures();
  }

  renderPictures(filteredPictures);
};

const onFiltersClick = (evt) => {
  const button = evt.target.closest('.img-filters__button');
  if (!button) {
    return;
  }
  filterButtons.forEach((btn) => btn.classList.remove('img-filters__button--active'));
  button.classList.add('img-filters__button--active');
  debouncedFilter(button.id);
};

const setFilterHandlers = () => {
  debouncedFilter = debounce(applyFilter, RERENDER_DELAY);
  filters.addEventListener('click', onFiltersClick);
};

export { setFilterHandlers };
