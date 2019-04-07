import Component from './component';

export default class RoutePointComponent extends Component {
  constructor({day, icon, type, destination, timeFrom, timeTo, price, offers}) {
    super();

    this._day = day
    this._icon = icon;
    this._type = type;
    this._destination = destination;
    this._timeFrom = timeFrom;
    this._timeTo = timeTo;
    this._price = price;
    this._offers = offers;

    this._onClick = null;
    this._onRoutePointClick = this._onRoutePointClick.bind(this);
  }

  _onRoutePointClick() {
    return typeof this._onClick === `function` && this._onClick();
  }

  set onClick(fn) {
    this._onClick = fn;
  }

  get template() {
    return `
      <article class="trip-point">
        <i class="trip-icon">${this._icon}</i>
        <h3 class="trip-point__title">${this._type} to ${this._destination}</h3>
        <p class="trip-point__schedule">
          <span class="trip-point__timetable">${this._timeFrom}&nbsp;&mdash; ${this._timeTo}</span>
          <span class="trip-point__duration">1h 30m</span>
        </p>
        <p class="trip-point__price">&euro;&nbsp;${this._price}</p>
        <ul class="trip-point__offers">
          ${this._offers.map((offer) => `
            <li>
              <button class="trip-point__offer">${offer}</button>
            </li>
          `).join(``)}
        </ul>
      </article>`.trim();
  }

  bind() {
    this._element.addEventListener(`click`, this._onRoutePointClick);
  }

  unbind() {
    this._element.removeEventListener(`click`, this._onRoutePointClick);
  }

  update({day, type, destination, timeFrom, timeTo, price, offers}) {
    this._day = day;
    this._type = type;
    this._destination = destination;
    this._timeFrom = timeFrom;
    this._timeTo = timeTo;
    this._price = price;
    this._offers = offers;
  }
}