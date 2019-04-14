import renderPoints from './presenters/render-points';
import renderCharts from './presenters/render-charts';
import renderFilters from './presenters/render-filters';
import Message from './views/message';
import Api from './api';
import {MESSAGE, SERVER, FILTERS} from './constants';

const pointWrapper = document.querySelector(`.trip-day__items`);
const main = document.querySelector(`main`);
const statistic = document.querySelector(`.statistic`);
const switchBtns = document.querySelectorAll(`.trip-controls__menus .view-switch__item`);

const api = new Api({endPoint: SERVER.endPoint, authorization: SERVER.authorization});

const LoadComponent = new Message(MESSAGE.load);
const ErrorComponent = new Message(MESSAGE.error);

const onSwitchBtnsClick = (evt, points) => {
  evt.preventDefault();
  for (const switchBtn of switchBtns) {
    switchBtn.classList.remove(`view-switch__item--active`);
  }
  if (evt.target.getAttribute(`href`) === `#stats`) {
    main.classList.add(`visually-hidden`);
    statistic.classList.remove(`visually-hidden`);
    evt.target.classList.add(`view-switch__item--active`);
    renderCharts(points);
  } else {
    main.classList.remove(`visually-hidden`);
    statistic.classList.add(`visually-hidden`);
    evt.target.classList.add(`view-switch__item--active`);
  }
};

const init = () => {
  LoadComponent.render();
  pointWrapper.appendChild(LoadComponent.element);
  Promise.all([
    api.getPoints(),
    api.getDestinations(),
    api.getOffers()
  ])
    .catch(() => {
      ErrorComponent.render();
      pointWrapper.replaceChild(ErrorComponent.element, LoadComponent.element);
      LoadComponent.unrender();
    })
    .then(([
      points,
      destinations,
      offers
    ]) => {
      if (points.length && destinations.length && offers.length) {
        renderFilters(FILTERS, points);
        renderPoints(points, destinations, offers, api);

        for (const switchBtn of switchBtns) {
          switchBtn.addEventListener(`click`, (evt) => onSwitchBtnsClick(evt, points));
        }
      }
    });
};

init();
