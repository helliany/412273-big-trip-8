import ModelPoint from './model/model-point';

export default class Provider {
  constructor({api, store, generateId}) {
    this._api = api;
    this._store = store;
    this._generateId = generateId;
    this._needSync = false;
  }

  _isOnline() {
    return window.navigator.onLine;
  }

  _objectToArray(object) {
    return Object.keys(object).map((id) => object[id]);
  }

  updatePoint({id, data}) {
    if (this._isOnline()) {
      return this._api.updatePoint({id, data})
      .then((point) => {
        this._store.setItem({key: point.id, item: point});
        return point;
      });
    } else {
      const point = data;
      this._needSync = true;
      this._store.setItem({key: point.id, item: point});
      return Promise.resolve(point);
    }
  }

  createPoint({point}) {
    if (this._isOnline()) {
      return this._api.createPoint({point})
        .then((it) => {
          this._store.setItem({key: it.id, item: it.toRAW()});
          return point;
        });
    } else {
      point.id = this._generateId();
      this._needSync = true;
      this._store.setItem({key: point.id, item: point});
      return Promise.resolve(ModelPoint.parsePoint(point));
    }
  }

  deletePoint({id}) {
    if (this._isOnline()) {
      return this._api.deletePoint({id})
        .then(() => {
          this._store.removeItem({key: id});
        });
    } else {
      this._needSync = true;
      this._store.removeItem({key: id});
      return Promise.resolve(true);
    }
  }

  getPoints() {
    if (this._isOnline()) {
      return this._api.getPoints()
        .then((points) => {
          points.map((it) => this._store.setItem({key: it.id, item: it.toRAW()}));
          return points;
        });
    } else {
      const rawPointsMap = this._store.getAll();
      const rawPoints = this._objectToArray(rawPointsMap);
      const points = ModelPoint.parsePoints(rawPoints);
      return Promise.resolve(points);
    }
  }

  getDestinations() {
    if (this._isOnline()) {
      return this._api.getDestinations()
        .then((destinations) => {
          destinations.map((it) => this._store.setItem({key: it.name, item: it}));
          return destinations;
        });
    } else {
      const rawDestinationsMap = this._store.getAll();
      const rawDestinations = this._objectToArray(rawDestinationsMap);
      const destinations = ModelPoint.parsePoints(rawDestinations);
      return Promise.resolve(destinations);
    }
  }

  getOffers() {
    if (this._isOnline()) {
      return this._api.getOffers()
        .then((offers) => {
          offers.map((it) => this._store.setItem({key: it.type, item: it}));
          return offers;
        });
    } else {
      const rawOffersMap = this._store.getAll();
      const rawOffers = this._objectToArray(rawOffersMap);
      const offers = ModelPoint.parsePoints(rawOffers);
      return Promise.resolve(offers);
    }
  }

  syncPoints() {
    return this._api.syncPoints({points: this._objectToArray(this._store.getAll())});
  }
}
