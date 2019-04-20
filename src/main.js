import renderPoints from './presenters/render-points';
import renderFilters from './presenters/render-filters';
import renderSort from './presenters/render-sort';
import renderTotalCost from './presenters/render-total-cost';
import renderNewPoint from './presenters/render-new-point';

import Message from './views/message';
import Api from './api';
import Provider from './provider';
import Store from './store';
import {MessageText, Server, FILTERS, SORTS} from './constants';

import uuid from 'uuid/v4';

const pointWrapper = document.querySelector(`.trip-day__items`);

const api = new Api({endPoint: Server.END_POINT, authorization: Server.AUTHORIZATION});
const store = new Store({key: Server.KEY, storage: localStorage});
const provider = new Provider({api, store, generateId: () => uuid()});

const LoadComponent = new Message(MessageText.LOAD);
const ErrorComponent = new Message(MessageText.ERROR);

const initApp = () => {
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
        renderFilters(FILTERS, points, destinations, offers, provider);
        renderSort(SORTS, points, destinations, offers, provider);
        renderPoints(points, destinations, offers, provider);
        renderNewPoint(destinations, offers, provider);
        renderTotalCost(points);
      }
    });
};

window.addEventListener(`offline`, () => {
  document.title = `${document.title} [OFFLINE]`;
});

window.addEventListener(`online`, () => {
  document.title = document.title.split(`[OFFLINE]`)[0];
  provider.syncPoints();
});

initApp();
