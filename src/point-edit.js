import Component from "./component";
import flatpickr from 'flatpickr';

export default class PointEdit extends Component {
  constructor(data) {
    super();
    this._destination = data.destination;
    this._destinations = data.destinations;
    this._title = data.title;
    this._icon = data.icon;
    this._icons = data.icons;
    this._offers = data.offers;
    this._description = data.description;
    this._picture = data.picture;
    this._timeFrom = data.timeFrom;
    this._timeTo = data.timeTo;
    this._dueDate = data.dueDate;
    this._price = data.price;

    this._onSubmit = null;
    this._onDelete = null;
    this._onSelect = null;
    this._dateFlatpickr = null;
    this._timeFromFlatpickr = null;
    this._timeToFlatpickr = null;
    this._state.isFavorite = false;

    this._onSubmitButtonClick = this._onSubmitButtonClick.bind(this);
    this._onDeleteButtonClick = this._onDeleteButtonClick.bind(this);
    this._onChangeFavorite = this._onChangeFavorite.bind(this);
    // this._onEscPress = this._onEscPress.bind(this);
    this._onInputSelect = this._onInputSelect.bind(this);
  }

  _processForm(formData) {
    const entry = {
      title: this._title,
      price: ``,
      destination: ``,
      isFavorite: false,
      offers: this._offers,
      icon: ``,
      timeFrom: ``,
      timeTo: ``,
      dueDate: new Date(),
    };

    const pointEditMapper = PointEdit.createMapper(entry);

    for (const pair of formData.entries()) {
      const [property, value] = pair;
      if (pointEditMapper[property]) {
        pointEditMapper[property](value);
      }
    }

    return entry;
  }

  _partialUpdate() {
    this._element.innerHTML = this.template;
  }

  _onSubmitButtonClick(evt) {
    evt.preventDefault();
    const formData = new FormData(this._element.querySelector(`.point-form`));
    const newData = this._processForm(formData);
    if (typeof this._onSubmit === `function`) {
      this._onSubmit(newData);
    }
    this.update(newData);
  }

  _onDeleteButtonClick(evt) {
    evt.preventDefault();
    if (typeof this._onDelete === `function`) {
      this._onDelete();
    }
  }

  _onChangeFavorite() {
    this._state.isFavorite = !this._state.isFavorite;
  }

  _onInputSelect() {
    if (typeof this._onSelect === `function`) {
      this._onSelect();
    }
  }

  set onSubmit(fn) {
    this._onSubmit = fn;
  }

  set onDelete(fn) {
    this._onDelete = fn;
  }

  set onSelect(fn) {
    this._onSelect = fn;
  }

  set onEsc(fn) {
    this._onEsc = fn;
  }
  get template() {
    return `
    <article class="point">
      <form class="point-form" action="" method="get">
        <header class="point__header">
          <label class="point__date">
            choose day
            <input class="point__input" type="text" placeholder="MAR 18" name="day" value="${this._dueDate}">
          </label>
          <div class="travel-way">
            <label class="travel-way__label" for="travel-way__toggle">${this._icon}</label>
            <input type="checkbox" class="travel-way__toggle visually-hidden" id="travel-way__toggle">
            <input type="text" class="travel-way__toggle visually-hidden" name="icon" id="travel-way__icon" value="${this._icon}">
            <div class="travel-way__select">
              <div class="travel-way__select-group">
                ${this._icons.map(({name, icon}) => `
                  <input class="travel-way__select-input visually-hidden" type="radio" id="travel-way-${name.toLowerCase()}" name="travel-way" value="${name.toLowerCase()}">
                  <label class="travel-way__select-label" for="travel-way-${name.toLowerCase()}">${icon} ${name}</label>
                `).join(``)}
              </div>
            </div>
          </div>
          <div class="point__destination-wrap">
            <label class="point__destination-label" for="destination">${this._title} to</label>
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
            <input class="point__input" type="text" value="${this._price.trim()}" name="price">
          </label>
          <div class="point__buttons">
            <button class="point__button point__button--save" type="submit">Save</button>
            <button class="point__button" type="reset">Delete</button>
          </div>
          <div class="paint__favorite-wrap">
            <input type="checkbox" class="point__favorite-input visually-hidden" id="favorite" name="favorite" ${this._state.isFavorite ? `checked` : ``}>
            <label class="point__favorite" for="favorite">favorite</label>
          </div>
        </header>
        <section class="point__details">
          <section class="point__offers">
            <h3 class="point__details-title">offers</h3>

            <div class="point__offers-wrap">
              ${this._offers.map((offer) => `
              <input class="point__offers-input visually-hidden" type="checkbox" id="${offer.toLowerCase()}" name="offer" value="${offer.toLowerCase()}">
              <label for="${offer.toLowerCase()}" class="point__offers-label">
                <span class="point__offer-service">${offer}</span> + €<span class="point__offer-price">${this._price}</span>
              </label>`).join(``)}
            </div>

          </section>
          <section class="point__destination">
            <h3 class="point__details-title">Destination</h3>
            <p class="point__destination-text">${this._description}</p>
            <div class="point__destination-images">
              <img src="${this._picture}" alt="picture from place" class="point__destination-image">
            </div>
          </section>
          <input type="hidden" class="point__total-price" name="total-price" value="">
        </section>
      </form>
    </article>
	`.trim();
  }

  bind() {
    this._element.addEventListener(`submit`, this._onSubmitButtonClick);
    this.element.addEventListener(`reset`, this._onDeleteButtonClick);
    document.addEventListener(`keydown`, this._onKeyPress);
    this._element.querySelector(`#favorite`)
      .addEventListener(`change`, this._onChangeFavorite);
    this._element.querySelector(`.travel-way__select-group`)
      .addEventListener(`change`, this._onInputSelect);
    this._dateFlatpickr = flatpickr(this._element.querySelector(`.point__date .point__input`), {altInput: true, mode: `range`, altFormat: `j M y`, dateFormat: `j M y`});
    this._timeFromFlatpickr = flatpickr(this._element.querySelector(`#timefrom`), {enableTime: true, noCalendar: true, altInput: true, altFormat: `h:i`, dateFormat: `h:i`});
    this._timeToFlatpickr = flatpickr(this._element.querySelector(`#timeto`), {enableTime: true, noCalendar: true, altInput: true, altFormat: `h:i`, dateFormat: `h:i`});
  }

  unbind() {
    this._element.removeEventListener(`submit`, this._onSubmitButtonClick);
    this.element.removeEventListener(`reset`, this._onDeleteButtonClick);
    document.removeEventListener(`keydown`, this._onKeyPress);
    this._element.querySelector(`#favorite`)
      .removeEventListener(`change`, this._onChangeFavorite);
    this._element.querySelector(`.travel-way__select-group`)
      .removeEventListener(`change`, this._onInputSelect);
  }

  update(data) {
    this._destination = data.destination;
    this._title = data.title;
    this._timeFrom = data.timeFrom;
    this._timeTo = data.timeTo;
    this._dueDate = data.dueDate;
    this._price = data.price;
    this._icon = data.icon;
  }

  static createMapper(target) {
    return {
      destination: (value) => (target.destination = value),
      timeFrom: (value) => (target.timeFrom = value),
      timeTo: (value) => (target.timeTo = value),
      day: (value) => (target.dueDate = value),
      icon: (value) => (target.icon = value),
      price: (value) => (target.price = value),
    };
  }
}
