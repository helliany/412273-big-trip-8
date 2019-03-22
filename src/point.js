import {createElement} from "./create-element";
import * as utils from './utils.js';

export class Point {
  constructor(data) {
    this._id = data.id;
    this._title = data.title;
    this._icon = data.icon;
    this._offers = data.offers;
    this._desc = data.desc;
    this._picture = data.picture;
    this._timeFrom = data.timeFrom;
    this._timeTo = data.timeTo;
    this._price = data.price;

    this._element = null;
    this._onClick = null;
    this._onPointClick = this._onPointClick.bind(this);
  }

  _onPointClick() {
    if (typeof this._onClick === `function`) {
      this._onClick();
    }
  }

  get element() {
    return this._element;
  }
  set onClick(fn) {
    this._onClick = fn;
  }
  get template() {
    return `
    <article class="trip-point">
      <i class="trip-icon">${this._icon}</i>
      <h3 class="trip-point__title">${this._title}</h3>
      <p class="trip-point__schedule">
        <span class="trip-point__timetable">${this._timeFrom} — ${this._timeTo}</span>
        <span class="trip-point__duration">${utils.getDuration(this._timeFrom, this._timeTo)}</span>
      </p>
      <p class="trip-point__price">&euro;&nbsp;${this._price}</p>
      <ul class="trip-point__offers">
      ${this._offers.map((el) => `
        <li>
          <button class="trip-point__offer">${el}</button>
        </li>`).join(``)}
      </ul>
    </article>
	`.trim();
  }

  bind() {
    this._element.addEventListener(`click`, this._onPointClick);
  }

  unbind() {
    this._element.removeEventListener(`click`, this._onPointClick);
  }
  render() {
    this._element = createElement(this.template);
    this.bind();
    return this._element;
  }

  unrender() {
    this.unbind();
    this._element = null;
  }
}
