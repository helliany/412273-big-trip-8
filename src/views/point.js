import Component from "../component";
import {Icon} from '../constants';
import {getTime} from '../utils';

export default class Point extends Component {
  constructor(data) {
    super();
    this._destination = data.destination;
    this._title = data.title;
    this._offers = data.offers || [];
    this._dateFrom = getTime({dateFrom: data.dateFrom, dateTo: data.dateTo}).from;
    this._dateTo = getTime({dateFrom: data.dateFrom, dateTo: data.dateTo}).to;
    this._dateDuration = getTime({dateFrom: data.dateFrom, dateTo: data.dateTo}).duration;
    this._price = data.price;

    this._onClick = null;
    this._onPointClick = this._onPointClick.bind(this);
  }

  get template() {
    return `
    <article class="trip-point">
      <i class="trip-icon">${Icon[this._title]}</i>
      <h3 class="trip-point__title">${this._title} to ${this._destination}</h3>
      <p class="trip-point__schedule">
        <span class="trip-point__timetable">${this._dateFrom} — ${this._dateTo}</span>
        <span class="trip-point__duration">${this._dateDuration}</span>
      </p>
      <p class="trip-point__price">&euro;&nbsp;${this._price}</p>
      <ul class="trip-point__offers">
      ${this._offers.map((offer) => `
            ${offer.accepted ? `
            <li>
              <button class="trip-point__offer">${offer.title || offer.name} +€ ${offer.price}</button>
            </li>` : ``}`).join(``)}
      </ul>
    </article>
	`.trim();
  }

  set onClick(fn) {
    this._onClick = fn;
  }

  update(data) {
    this._title = data.title;
    this._destination = data.destination;
    this._dateFrom = getTime({dateFrom: data.dateFrom, dateTo: data.dateTo}).from;
    this._dateTo = getTime({dateFrom: data.dateFrom, dateTo: data.dateTo}).to;
    this._dateDuration = getTime({dateFrom: data.dateFrom, dateTo: data.dateTo}).duration;
    this._price = data.price;
    this._offers = data.offers;
  }

  _onPointClick() {
    if (typeof this._onClick === `function`) {
      this._onClick();
    }
  }

  bind() {
    this._element.addEventListener(`click`, this._onPointClick);
  }

  unbind() {
    this._element.removeEventListener(`click`, this._onPointClick);
  }
}
