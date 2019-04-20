import Filter from '../views/filter';
import renderPoints from './render-points';
import renderTotalCost from '../presenters/render-total-cost';
import moment from 'moment';

const filterWrapper = document.querySelector(`.trip-filter`);

const filterPoints = (points, filterName) => {
  switch (filterName) {
    case `filter-everything`:
      return points;
    case `filter-future`:
      return points.filter((point) => moment(point.dateFrom).isAfter(moment(Date.now())));
    case `filter-past`:
      return points.filter((point) => moment(point.dateFrom).isBefore(moment(Date.now())));
    default:
      return points;
  }
};

export default (filters, points, destinations, offers, provider) => {
  const fragment = document.createDocumentFragment();
  for (const filter of filters) {
    const FilterComponent = new Filter(filter);
    FilterComponent.render();
    FilterComponent.onFilter = (evt) => {
      const filterName = evt.target.id;
      const filteredPoints = filterPoints(points, filterName);
      renderPoints(filteredPoints, destinations, offers, provider);
      renderTotalCost(filteredPoints);
    };
    for (const el of [...FilterComponent.element.children]) {
      fragment.appendChild(el);
    }
  }
  filterWrapper.appendChild(fragment);
};
