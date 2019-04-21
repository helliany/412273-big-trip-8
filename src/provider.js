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
    return object && Object.keys(object).map((id) => object[id]);
  }

  updatePoint({id, data}) {
    if (this._isOnline()) {
      return this._api.updatePoint({id, data})
        .then((point) => {
          this._store.setItem({key: `points`, item: point.toRAW()});
          return point;
        });
    } else {
      this._needSync = true;
      this._store.updateItem({key: `points`, id, data});
      return Promise.resolve(ModelPoint.parsePoint(data));
    }
  }

  createPoint({point}) {
    if (this._isOnline()) {
      return this._api.createPoint({point})
        .then((it) => {
          this._store.setItem({key: `points`, item: it.toRAW()});
          return it;
        });
    } else {
      point.id = this._generateId();
      this._needSync = true;
      this._store.createItem({key: `points`, data: point});
      return Promise.resolve(ModelPoint.parsePoint(point));
    }
  }

  deletePoint({id}) {
    if (this._isOnline()) {
      return this._api.deletePoint({id})
        .then(() => {
          this._store.removeItem({key: `points`, id});
        });
    } else {
      this._needSync = true;
      this._store.removeItem({key: `points`, id});
      return Promise.resolve(true);
    }
  }

  getPoints() {
    if (this._isOnline()) {
      return this._api.getPoints()
        .then((points) => {
          this._store.setItem({key: `points`, item: points.map((it) => it.toRAW())});
          return points;
        });
    } else {
      const rawPointsMap = this._store.getItem({key: `points`});
      const rawPoints = this._objectToArray(rawPointsMap);
      const points = ModelPoint.parsePoints(rawPoints);
      return Promise.resolve(points);
    }
  }

  getDestinations() {
    if (this._isOnline()) {
      return this._api.getDestinations()
        .then((destinations) => {
          this._store.setItem({key: `destinations`, item: destinations});
          return destinations;
        });
    } else {
      const rawDestinationsMap = this._store.getItem({key: `destinations`});
      const rawDestinations = this._objectToArray(rawDestinationsMap);
      return Promise.resolve(rawDestinations);
    }
  }

  getOffers() {
    if (this._isOnline()) {
      return this._api.getOffers()
        .then((offers) => {
          this._store.setItem({key: `offers`, item: offers});
          return offers;
        });
    } else {
      const rawOffersMap = this._store.getItem({key: `offers`});
      const rawOffers = this._objectToArray(rawOffersMap);
      return Promise.resolve(rawOffers);
    }
  }

  syncPoints() {
    return this._api.syncPoints({points: this._objectToArray(this._store.getItem({key: `points`}))});
  }
}
