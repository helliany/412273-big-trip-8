import {FILTERS, POINT_NUMBER} from "./data";
import {getFilterElement} from "./make-filter";
import getPointElement from "./make-point";
import {events} from "./get-event";
import {getRandomNumber} from "./utils";
import lodash from 'lodash';

const filterWrapper = document.querySelector(`.trip-controls__menus`);
const pointWrapper = document.querySelector(`.trip-day`);

const points = lodash.shuffle(events.map(getPointElement));

const randomizePoints = () => {
  const pointItems = document.querySelector(`.trip-day__items`);
  const n = getRandomNumber(POINT_NUMBER.max, POINT_NUMBER.min);
  pointWrapper.removeChild(pointItems);
  renderPoints(n);
};

const renderFilters = () => {
  const form = document.createElement(`form`);
  form.className = `trip-filter`;
  FILTERS.forEach((filter) => {
    form.insertAdjacentHTML(`beforeend`, getFilterElement(filter.id, filter.checked));
    const input = form.querySelector(`input:last-of-type`);
    input.addEventListener(`click`, () => randomizePoints());
  });
  filterWrapper.appendChild(form);
};

const renderPoints = (number) => {
  const div = document.createElement(`div`);
  div.className = `trip-day__items`;
  for (let i = 0; i < number; i++) {
    div.insertAdjacentHTML(`beforeend`, points.join(``));
  }
  pointWrapper.appendChild(div);
};

renderFilters();
renderPoints(POINT_NUMBER.default);
