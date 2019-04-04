import * as data from './data.js';
import {getFilterElement} from "./make-filter";
import Point from './point';
import PointEdit from './point-edit';

const filterWrapper = document.querySelector(`.trip-controls__menus`);
const pointWrapper = document.querySelector(`.trip-day__items`);

const pointData = data.getEvent();
const PointComponent = new Point(pointData);
const PointEditComponent = new PointEdit(pointData);

const randomizePoints = () => {
  pointWrapper.innerHTML = ``;
  renderPoints.render();
};

const renderFilters = () => {
  const form = document.createElement(`form`);
  form.className = `trip-filter`;
  data.FILTERS.forEach((filter) => {
    form.insertAdjacentHTML(`beforeend`, getFilterElement(filter.id, filter.checked));
    const input = form.querySelector(`input:last-of-type`);
    input.addEventListener(`click`, () => randomizePoints());
  });
  filterWrapper.appendChild(form);
};

const renderPoints = {
  bind() {
    PointComponent.onClick = () => {
      PointEditComponent.render();
      pointWrapper.replaceChild(PointEditComponent.element, PointComponent.element);
      PointComponent.unrender();
    };

    PointEditComponent.onSubmit = (newObject) => {
      PointEditComponent.destination = newObject.destination;
      PointEditComponent.title = newObject.title;
      PointEditComponent.price = newObject.price;
      PointEditComponent.timeFrom = newObject.timeFrom;
      PointEditComponent.timeTo = newObject.timeTo;
      PointEditComponent.day = newObject.day;
      PointEditComponent.offers = newObject.offers;
      PointEditComponent.icon = newObject.icon;
      PointComponent.update(PointEditComponent);
      PointComponent.render();
      pointWrapper.replaceChild(PointComponent.element, PointEditComponent.element);
      PointEditComponent.unrender();
    };

    PointEditComponent.onReset = () => {
      PointComponent.render();
      pointWrapper.replaceChild(PointComponent.element, PointEditComponent.element);
      PointEditComponent.unrender();
    };
  },
  render() {
    // filters.map((filter, i) => filtersParent.insertAdjacentHTML(`beforeend`,
    //     renderFilter(filter, i === Filter.INDEX_CHECKED)));

    pointWrapper.appendChild(PointComponent.render());
  },
  init() {
    this.render();
    this.bind();
  }
};

renderFilters();
renderPoints.init();
