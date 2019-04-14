import Filter from '../views/filter';
import renderPoints from './render-points';
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

export default (filters, points) => {
  filters.forEach((filter) => {
    const FilterComponent = new Filter(filter);
    FilterComponent.render();
    FilterComponent.onFilter = (evt) => {
      const filterName = evt.target.id;
      const filteredPoints = filterPoints(points, filterName);
      renderPoints(filteredPoints);
    };
    for (const el of [...FilterComponent.element.children]) {
      filterWrapper.appendChild(el);
    }
    // const input = filterWrapper.querySelector(`input:last-of-type`);
    // input.addEventListener(`click`, () => renderPoints(filteredPoints, pointWrapper));
  });
};


