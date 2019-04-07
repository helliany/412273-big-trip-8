import Component from './component';
import flatpickr from 'flatpickr';
import 'flatpickr/dist/flatpickr.css';

export default class RouteEditComponent extends Component {
  constructor({day, icon, type, destination, timeFrom, timeTo, price, offers, description, photos, types, destinations}) {
    super();

    this._day = day;
    this._icon = icon;
    this._type = type;
    this._destination = destination;
    this._timeFrom = timeFrom;
    this._timeTo = timeTo;
    this._price = price;
    this._offers = offers;
    this._description = description;
    this._photos = photos;
    this._types = types;
    this._destinations = destinations;

    this._onSubmit = null;
    this._onReset = null;

    this._state.isFavorite = false;
    this._state.routeType = false;
    this._dateFlatpickr = null;
    this._timeFromFlatpickr = null;
    this._timeToFlatpickr = null;

    this._onRoutePointSubmitClick = this._onRoutePointSubmitClick.bind(this);
    this._onRoutePointResetClick = this._onRoutePointResetClick.bind(this);
    this._onChangeFavorite = this._onChangeFavorite.bind(this);
    this._onChangeRouteType = this._onChangeRouteType.bind(this);
  }

  _onRoutePointSubmitClick(evt) {
    evt.preventDefault();
    const fieldsData = new FormData(this._element.querySelector(`.point form`));
    const fieldsObject = this._getDataObject(fieldsData);
    this.update(fieldsObject);
    return typeof this._onSubmit === `function` && this._onSubmit(fieldsObject);
  }

  _onRoutePointResetClick(evt) {
    evt.preventDefault();
    return typeof this._onReset === `function` && this._onReset();
  }

  _onChangeRouteType() {
    this._state.routeType = ``;
  }

  _onChangeFavorite() {
    this._state.isFavorite = !this._state.isFavorite;
  }

  _getDataObject(formFields) {
    const result = {
      day: new Date(),
      type: this._type,
      icon: ``,
      destination: ``,
      timeFrom: ``,
      timeTo: ``,
      price: ``,
      offers: new Set()
    };

    const routeEditMapper = RouteEditComponent.createMapper(result);

    for (const pair of formFields.entries()) {
      const [key, value] = pair;
      routeEditMapper[key] && routeEditMapper[key](value);
    }

    result.offers = [...result.offers];

    return result;
  }

  set onSubmit(fn) {
    this._onSubmit = fn;
  }

  set onReset(fn) {
    this._onReset = fn;
  }

  get template() {
    return `
      <article class="point">
        <form action="" method="get">
          <header class="point__header">
            <label class="point__date">
              choose day
              <input class="point__input" type="text" placeholder="MAR 18" name="day" value="${this._day}">
            </label>
            <div class="travel-way">
              <label class="travel-way__label" for="travel-way__toggle">${this._icon}️</label>
              <input type="checkbox" class="travel-way__toggle visually-hidden" name="type" id="travel-way__toggle">
              <div class="travel-way__select">
              
              ${Object.keys(this._types).map((type) => `
                <div class="travel-way__select-group">
                  ${this._types[type].map(({name, icon}) => `
                    <input class="travel-way__select-input visually-hidden" type="radio" id="travel-way-${name.toLowerCase()}" name="travel-way" value="${name.toLowerCase()}">
                    <label class="travel-way__select-label" for="travel-way-${name.toLowerCase()}">${icon} ${name}</label>
                  `).join(``)}
                </div>
              `).join(``)}
              </div>
            </div>
            <div class="point__destination-wrap">
              <label class="point__destination-label" for="destination">${this._type} to</label>
              <input class="point__destination-input" list="destination-select" id="destination" value="${this._destination}" name="destination">
              <datalist id="destination-select">
                ${this._destinations.map((destination) => `
                  <option value="${destination}"></option>
                `).join(``)}
              </datalist>
            </div>
            <label class="point__time">
              choose time
              <input class="point__input" id="timefrom" type="text" value="${this._timeFrom}" name="timeFrom" placeholder="00:00 — 00:00">
              <input class="point__input" id="timeto" type="text" value="${this._timeTo}" name="timeTo" placeholder="00:00 — 00:00">
            </label>
            <label class="point__price">
              write price
              <span class="point__price-currency">€</span>
              <input class="point__input" type="text" value="${this._price}" name="price">
            </label>
            <div class="point__buttons">
              <button class="point__button point__button--save" type="submit">Save</button>
              <button class="point__button" type="reset">Delete</button>
            </div>
            <div class="paint__favorite-wrap">
              <input type="checkbox" class="point__favorite-input visually-hidden" id="favorite" name="favorite">
              <label class="point__favorite" for="favorite">favorite</label>
            </div>
          </header>
          <section class="point__details">
            ${this._offers && this._offers.length > 0 ? `
              <section class="point__offers">
                  <h3 class="point__details-title">offers</h3>
  
                  <div class="point__offers-wrap">
                    ${this._offers.map((offer) => `<input class="point__offers-input visually-hidden" type="checkbox"
                      id="${offer.toLowerCase().trim()}" name="offer" value="${offer.toLowerCase().trim()}" checked>
                      <label for="${offer.toLowerCase().trim()}" class="point__offers-label">
                        <span class="point__offer-service">${offer}</span>
                        <!--+ €<span class="point__offer-price">30</span>-->
                      </label>`).join(``)}
                  </div>
                </section>` : ``}
            <section class="point__destination">
              <h3 class="point__details-title">Destination</h3>
              ${this._description ? `<p class="point__destination-text">${this._description}</p>` : ``}
              ${this._photos && this._photos.length ? `
                <div class="point__destination-images">
                  ${this._photos.map((photo) => `<img src="${photo}" alt="picture from place" class="point__destination-image">`).join(``)}
                </div>` : ``}
            </section>
            <input type="hidden" class="point__total-price" name="total-price" value="">
          </section>
        </form>
      </article>
    `.trim();
  }

  bind() {
    this._element.querySelector(`.point__buttons [type=submit]`)
      .addEventListener(`click`, this._onRoutePointSubmitClick);
    this._element.querySelector(`.point__buttons [type=reset]`)
      .addEventListener(`click`, this._onRoutePointResetClick);

    this._dateFlatpickr = flatpickr(this._element.querySelector(`.point__date .point__input`), {altInput: true, altFormat: `j M y`, dateFormat: `j M y`});
    this._timeFromFlatpickr = flatpickr(this._element.querySelector(`.point__time #timefrom`), {enableTime: true, noCalendar: true, altInput: true, altFormat: `h:i`, dateFormat: `h:i`});
    this._timeToFlatpickr = flatpickr(this._element.querySelector(`.point__time #timeto`), {enableTime: true, noCalendar: true, altInput: true, altFormat: `h:i`, dateFormat: `h:i`});
  }

  unbind() {
    this._element.querySelector(`.point__buttons [type=submit]`)
      .removeEventListener(`click`, this._onRoutePointSubmitClick);
    this._element.querySelector(`.point__buttons [type=reset]`)
      .removeEventListener(`click`, this._onRoutePointResetClick);
    if (this._dateFlatpickr) {
      this._dateFlatpickr.destroy();
      this._timeFromFlatpickr.destroy();
      this._timeToFlatpickr.destroy();
    }
  }

  update({day, type, destination, timeFrom, timeTo, price}) {
    this._day = day;
    this._type = type;
    this._destination = destination;
    this._timeFrom = timeFrom;
    this._timeTo = timeTo;
    this._price = price;
  }

  static createMapper(target) {
    return {
      'day': (value) => {
        target.day = value;
      },
      'destination': (value) => {
        target.destination = value;
      },
      'timeFrom': (value) => {
        target.timeFrom = value;
      },
      'timeTo': (value) => {
        target.timeTo = value;
      },
      'price': (value) => {
        target.price = value;
      },
      'total-price': (value) => {
        target[`total-price`] = value;
      },
      'offer': (value) => {
        target.offers.add(value);
      }
    };
  }
}