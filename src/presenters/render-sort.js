import Sort from '../views/sort';
import renderPoints from './render-points';
import {getTime} from '../utils.js';
import lodash from 'lodash';

const sortWrapper = document.querySelector(`.trip-sorting`);

const filterPoints = (points, label) => {
  switch (label) {
    case `sorting-event`:
      return points;
    case `sorting-time`:
      return lodash.reverse(lodash.sortBy(points, [(it) => getTime({dateFrom: it.dateFrom, dateTo: it.dateTo}).duration]));
    case `sorting-price`:
      return lodash.reverse(lodash.sortBy(points, [(it) => it.price]));
    default:
      return points;
  }
};

export default (sorts, points, destinations, offers, provider) => {
  const fragment = document.createDocumentFragment();

  for (const sort of sorts) {
    const SortComponent = new Sort(sort);
    SortComponent.render();

    SortComponent.onClick = (evt) => {
      const sortLabel = evt.target.id;
      const filteredPoints = filterPoints(points, sortLabel);
      renderPoints(filteredPoints, destinations, offers, provider);
    };
    for (const el of [...SortComponent.element.children]) {
      fragment.appendChild(el);
    }
  }
  sortWrapper.prepend(fragment);
};
