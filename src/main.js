import * as data from './data.js';
import {getRandomNumber, getIcon} from './utils.js';
import Point from './point';
import PointEdit from './point-edit';
import Filter from './filter';
import {renderCharts} from './render-charts';

const filterWrapper = document.querySelector(`.trip-filter`);
const pointWrapper = document.querySelector(`.trip-day__items`);
const main = document.querySelector(`main`);
const statistic = document.querySelector(`.statistic`);
const switchBtns = document.querySelectorAll(`.trip-controls__menus .view-switch__item`);

const pointsArr = new Array(getRandomNumber(10, 1)).fill(``).map(() => data.getData());

const onSwitchBtnsClick = (evt) => {
  evt.preventDefault();
  for (const switchBtn of switchBtns) {
    switchBtn.classList.remove(`view-switch__item--active`);
  }
  if (evt.target.getAttribute(`href`) === `#stats`) {
    main.classList.add(`visually-hidden`);
    statistic.classList.remove(`visually-hidden`);
    evt.target.classList.add(`view-switch__item--active`);
    renderCharts(pointsArr);
  } else {
    main.classList.remove(`visually-hidden`);
    statistic.classList.add(`visually-hidden`);
    evt.target.classList.add(`view-switch__item--active`);
  }
};

const filterPoints = (points, filterName) => {
  switch (filterName) {
    case `filter-everything`:
      return points;

    case `filter-future`:
      return points.filter((it) => it.dueDate > Date.now());

    case `filter-past`:
      return points.filter((it) => it.dueDate < Date.now());

    default:
      return points;
  }
};

const renderFilters = () => {
  data.FILTERS.forEach((filter) => {
    const FilterComponent = new Filter(filter);
    filterWrapper.appendChild(FilterComponent.render());
    // const input = filterWrapper.querySelector(`input:last-of-type`);
    // input.addEventListener(`click`, () => renderPoints(filteredPoints, pointWrapper));
  });
};

const onFilterChange = (evt) => {
  const filterName = evt.target.id;
  const filteredPoints = filterPoints(pointsArr, filterName);
  renderPoints(filteredPoints, pointWrapper);
};

const deletePoint = (points, i) => {
  points.splice(i, 1);
  return points;
};

const renderPoints = (points, container) => {
  container.textContent = ``;

  points.forEach((point, i) => {
    const PointComponent = new Point(point);
    const PointEditComponent = new PointEdit(point);

    PointComponent.onClick = () => {
      PointEditComponent.render();
      container.replaceChild(PointEditComponent.element, PointComponent.element);
      PointComponent.unrender();
    };

    PointEditComponent.onSubmit = (newObject) => {
      PointEditComponent.destination = newObject.destination;
      PointEditComponent.title = newObject.title;
      PointEditComponent.price = newObject.price;
      PointEditComponent.timeFrom = newObject.timeFrom;
      PointEditComponent.timeTo = newObject.timeTo;
      PointEditComponent.dueDate = newObject.dueDate;
      PointEditComponent.offers = newObject.offers;
      PointEditComponent.icon = newObject.icon;
      PointComponent.update(PointEditComponent);
      PointComponent.render();
      container.replaceChild(PointComponent.element, PointEditComponent.element);
      PointEditComponent.unrender();
    };

    PointEditComponent.onDelete = () => {
      deletePoint(points, i);
      PointEditComponent.unrender();
    };

    PointEditComponent.onSelect = () => {
      let label = PointEditComponent.element.querySelector(`.travel-way__label`);
      let toggleInput = PointEditComponent.element.querySelector(`#travel-way__toggle`);
      let iconInput = PointEditComponent.element.querySelector(`#travel-way__icon`);

      const title = PointEditComponent.element.querySelector(`.travel-way__select-input:checked`).value;
      const icon = getIcon(data.icons, title);

      toggleInput.value = title;
      iconInput.value = icon;

      label.textContent = icon;
      toggleInput.checked = false;

      const selectedData = Object.assign(points, {title, icon});

      PointEditComponent.update(selectedData);
    };
    container.appendChild(PointComponent.render());
  });
  filterWrapper.addEventListener(`change`, onFilterChange);
  for (const switchBtn of switchBtns) {
    switchBtn.addEventListener(`click`, onSwitchBtnsClick);
  }
};

renderFilters();
renderPoints(pointsArr, pointWrapper);
