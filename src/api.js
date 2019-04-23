import ModelPoint from './model/model-point';
import {Method, ResponseCode} from './constants';

export default class Api {
  constructor({endPoint, authorization}) {
    this._endPoint = endPoint;
    this._authorization = authorization;
  }

  getPoints() {
    return this._load({url: `points`})
      .then(this._toJSON)
      .then(ModelPoint.parsePoints);
  }

  getDestinations() {
    return this._load({url: `destinations`})
      .then(this._toJSON);
  }

  getOffers() {
    return this._load({url: `offers`})
      .then(this._toJSON);
  }

  createPoint({point}) {
    return this._load({
      url: `points`,
      method: Method.POST,
      body: JSON.stringify(point),
      headers: new Headers({'Content-Type': `application/json`})
    })
      .then(this._toJSON)
      .then(ModelPoint.parsePoint);
  }

  updatePoint({id, data}) {
    return this._load({
      url: `points/${id}`,
      method: Method.PUT,
      body: JSON.stringify(data),
      headers: new Headers({'Content-Type': `application/json`})
    })
      .then(this._toJSON)
      .then(ModelPoint.parsePoint);
  }

  deletePoint({id}) {
    return this._load({
      url: `points/${id}`,
      method: Method.DELETE
    });
  }

  syncPoints({points}) {
    return this._load({
      url: `points/sync`,
      method: Method.POST,
      body: JSON.stringify(points),
      headers: new Headers({'Content-Type': `application/json`})
    })
      .then(this._toJSON);
  }

  _checkStatus(response) {
    if (response.status >= ResponseCode.SUCCESS && response.status < ResponseCode.REDIRECT) {
      return response;
    } else {
      throw new Error(`${response.status}: ${response.statusText}`);
    }
  }

  _toJSON(response) {
    return response.json();
  }

  _load({url, method = Method.GET, body = null, headers = new Headers()}) {
    headers.append(`Authorization`, this._authorization);

    return fetch(`${this._endPoint}/${url}`, {method, body, headers})
      .then(this._checkStatus)
      .catch((err) => {
        throw err;
      });
  }
}
