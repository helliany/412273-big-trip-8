import Sort from '../views/sort';
import renderPoints from './render-points';
import lodash from 'lodash';

const sortWrapper = document.querySelector(`.trip-sorting`);

const filterPoints = (points, label) => {
  switch (label) {
    case `sorting-event`:
      return points;
    case `sorting-time`:
      return lodash.sortBy(points, [points.price]);
    case `sorting-price`:
      return lodash.sortBy(points, [points.price]);
    default:
      return points;
  }
};

export default (sorts, points) => {
  const fragment = document.createDocumentFragment();

  for (const sort of sorts) {
    const SortComponent = new Sort(sort);
    SortComponent.render();

    SortComponent.onClick = (evt) => {
      const sortLabel = evt.target.id;
      const filteredPoints = filterPoints(points, sortLabel);
      renderPoints(filteredPoints);
    };
    for (const el of [...SortComponent.element.children]) {
      fragment.appendChild(el);
    }
  }
  sortWrapper.prepend(fragment);
};
