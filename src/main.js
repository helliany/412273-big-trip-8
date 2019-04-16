import renderPoints from './presenters/render-points';
import renderCharts from './presenters/render-charts';
import renderFilters from './presenters/render-filters';
import renderSort from './presenters/render-sort';
import Message from './views/message';
import Api from './api';
import Provider from './provider';
import Store from './store';
import {MESSAGE, SERVER, FILTERS, SORTS} from './constants';

import uuid from 'uuid/v4';

const pointWrapper = document.querySelector(`.trip-day__items`);
const main = document.querySelector(`main`);
const statistic = document.querySelector(`.statistic`);
const switchBtns = document.querySelectorAll(`.trip-controls__menus .view-switch__item`);

const api = new Api({endPoint: SERVER.endPoint, authorization: SERVER.authorization});
const store = new Store({key: SERVER.key, storage: localStorage});
const provider = new Provider({api, store, generateId: uuid()});

const LoadComponent = new Message(MESSAGE.load);
const ErrorComponent = new Message(MESSAGE.error);

window.addEventListener(`offline`, () => {
  document.title = `${document.title} [OFFLINE]`;
});

window.addEventListener(`online`, () => {
  document.title = document.title.split(`[OFFLINE]`)[0];
  provider.syncPoints();
});

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
    provider.getPoints(),
    provider.getDestinations(),
    provider.getOffers()
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
        renderSort(SORTS, points);
        renderPoints(points, destinations, offers, provider);

        for (const switchBtn of switchBtns) {
          switchBtn.addEventListener(`click`, (evt) => onSwitchBtnsClick(evt, points));
        }
      }
    });
};

init();
