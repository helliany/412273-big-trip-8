import * as data from './data.js';
import {getFilterElement} from "./make-filter";
import {events} from "./get-event";
import Point from './point';
import PointEdit from './point-edit';
import {getRandomNumber} from "./utils";

const filterWrapper = document.querySelector(`.trip-controls__menus`);
const pointWrapper = document.querySelector(`.trip-day__items`);

const points = [];
const editPoints = [];

const randomizePoints = () => {
  const n = getRandomNumber(data.POINT_NUMBER.max, data.POINT_NUMBER.min);
  pointWrapper.innerHTML = ``;
  renderPoints(points.slice(0, n));
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

const createPoints = () => {
  for (const event of events) {
    const point = new Point(event);
    const editPoint = new PointEdit(event);
    points.push(point);
    editPoints.push(editPoint);
  }
  renderPoints(points);
};

const renderPoints = (arr) => {
  const pointsArr = [];
  for (let [i, el] of arr.entries()) {
    if (arr.indexOf(el) < arr.length) {
      pointsArr.push(el.render());
      el.onClick = () => {
        editPoints[i].render();
        pointWrapper.replaceChild(editPoints[i].element, el.element);
        el.unrender();
      };
      editPoints[i].onSubmit = () => {
        el.render();
        pointWrapper.replaceChild(el.element, editPoints[i].element);
        editPoints[i].unrender();
      };
      editPoints[i].onReset = () => {
        el.render();
        pointWrapper.replaceChild(el.element, editPoints[i].element);
        editPoints[i].unrender();
      };
    }
  }
  pointWrapper.prepend(...pointsArr);
};

renderFilters();
createPoints();
