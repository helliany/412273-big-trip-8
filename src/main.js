import {FILTERS, POINT_NUMBER} from "./data";
import {getFilterElement} from "./make-filter";
import {getPointElement} from "./make-point";

const filterWrapper = document.querySelector(`.trip-controls__menus`);
const pointWrapper = document.querySelector(`.trip-day`);

const randomizeCards = () => {
  const points = document.querySelector(`.trip-day__items`);
  const n = getRandomNumber();
  pointWrapper.removeChild(points);
  renderCards(n);
};

const renderFilters = () => {
  const form = document.createElement(`form`);
  form.className = `trip-filter`;
  FILTERS.forEach((filter) => {
    form.insertAdjacentHTML(`beforeend`, getFilterElement(filter.id, filter.checked));
    const input = form.querySelector(`input:last-of-type`);
    input.addEventListener(`click`, () => randomizeCards());
  });
  filterWrapper.appendChild(form);
};

const renderCards = (number) => {
  const div = document.createElement(`div`);
  div.className = `trip-day__items`;
  for (let i = 0; i < number; i++) {
    div.insertAdjacentHTML(`beforeend`, getPointElement());
  }
  pointWrapper.appendChild(div);
};

const getRandomNumber = () => {
  return Math.floor(Math.random() * (POINT_NUMBER.max - POINT_NUMBER.min)) + POINT_NUMBER.min;
};

renderFilters();
renderCards(POINT_NUMBER.default);
