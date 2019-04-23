import Component from "../component";
import flatpickr from 'flatpickr';
import {ANIMATION_TIMEOUT, Icon} from '../constants';
import moment from 'moment';

export default class PointEdit extends Component {
  constructor(data, destinations, offers) {
    super();
    this._id = data.id;
    this._title = data.title || ``;
    this._offers = data.offers || [];
    this._dateFrom = data.dateFrom;
    this._dateTo = data.dateTo;
    this._price = data.price || 0;
    this._destination = data.destination || ``;
    this._description = data.description || ``;
    this._pictures = data.pictures || [];
    this._isFavorite = data.isFavorite || false;

    this._destinations = destinations;
    this._selectOffers = offers;

    this._onSubmit = null;
    this._onDelete = null;
    this._onSelect = null;
    this._onEsc = null;
    this._dayFlatpickr = null;
    this._dateFromFlatpickr = null;
    this._dateToFlatpickr = null;

    this._onSubmitButtonClick = this._onSubmitButtonClick.bind(this);
    this._onDeleteButtonClick = this._onDeleteButtonClick.bind(this);
    this._onChangeFavorite = this._onChangeFavorite.bind(this);
    this._onEscPress = this._onEscPress.bind(this);
    this._onInputTitleChange = this._onInputTitleChange.bind(this);
    this._onInputOfferChange = this._onInputOfferChange.bind(this);
    this._onInputDestinationChange = this._onInputDestinationChange.bind(this);
    this._onLabelClick = this._onLabelClick.bind(this);
  }

  get template() {
    return `
    <article class="point">
      <form class="point-form" action="" method="get">
        <header class="point__header">
          <label class="point__date">
            choose day
            <input class="point__input" type="text" placeholder="MAR 18" name="day" value="${moment.utc(this._dateFrom).format(`MMM DD`)}">
          </label>
          <div class="travel-way">
            <label class="travel-way__label" for="travel-way__toggle">${Icon[this._title]}</label>
            <input type="checkbox" class="travel-way__toggle visually-hidden" id="travel-way__toggle">
            <input type="text" class="travel-way__toggle visually-hidden" name="icon" id="travel-way__icon" value="${this._icon}">
            <div class="travel-way__select">
              <div class="travel-way__select-group">
                ${this._selectOffers.map(({type}) => `
                  <input class="travel-way__select-input visually-hidden" type="radio" id="travel-way-${type}" name="travel-way" value="${type}">
                  <label class="travel-way__select-label" for="travel-way-${type}">${Icon[type]} ${type}</label>
                `).join(``)}
              </div>
            </div>
          </div>
          <div class="point__destination-wrap">
            <label class="point__destination-label" for="destination">${this._title} to</label>
            <input class="point__destination-input" list="destination-select" id="destination" value="${this._destination}" name="destination">
            <datalist id="destination-select">
              ${this._destinations.map((destinationItem) => `
                <option value="${destinationItem.name}"></option>
              `).join(``)}
            </datalist>
          </div>
          <div class="point__time">
            choose time
            <input class="point__input" type="text" name="date-start" placeholder="00:00" value="${this._dateFrom}"><span class="point__span">—</span>
            <input class="point__input" type="text" name="date-end" placeholder="00:00" value="${this._dateTo}">
          </div>
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
            <input type="checkbox" class="point__favorite-input visually-hidden" id="favorite" name="favorite" ${this._isFavorite ? `checked` : ``}>
            <label class="point__favorite" for="favorite">favorite</label>
          </div>
        </header>
        <section class="point__details">
          <section class="point__offers">
            <h3 class="point__details-title">offers</h3>

            <div class="point__offers-wrap">
              ${this._offers.map((offer) => `
              ${offer.accepted ? `
              <input class="point__offers-input visually-hidden" type="checkbox" id="${offer.title || offer.name}" name="offer" value="${offer.title || offer.name}" checked>
              <label for="${offer.title || offer.name}" class="point__offers-label">
                <span class="point__offer-service">${offer.title || offer.name}</span> + €<span class="point__offer-price">${offer.price}</span>
              </label>` : `
              <input class="point__offers-input visually-hidden" type="checkbox" id="${offer.title || offer.name}" name="offer" value="${offer.title || offer.name}">
              <label for="${offer.title || offer.name}" class="point__offers-label">
                <span class="point__offer-service">${offer.title || offer.name}</span> + €<span class="point__offer-price">${offer.price}</span>
              </label>
              `}`).join(``)}
            </div>

          </section>
          <section class="point__destination">
            <h3 class="point__details-title">Destination</h3>
            <p class="point__destination-text">${this._description}</p>
            <div class="point__destination-images">
              ${this._pictures.map((picture) => `<img src="${picture.src}" alt="picture from ${picture.description}" class="point__destination-image">`).join(``)}
            </div>
          </section>
          <input type="hidden" class="point__total-price" name="total-price" value="">
        </section>
      </form>
    </article>
	`.trim();
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

  update(data) {
    this._destination = data.destination;
    this._title = data.title;
    this._offers = data.offers;
    this._dateFrom = data.dateFrom;
    this._dateTo = data.dateTo;
    this._price = data.price;
  }

  shake() {
    this._element.style.animation = `shake ${ANIMATION_TIMEOUT / 1000}s`;
    this._element.style.border = `2px solid #e41818`;
    setTimeout(() => {
      this._element.style.animation = ``;
      this._element.style.border = ``;
    }, ANIMATION_TIMEOUT);
  }

  _onSubmitButtonClick(e) {
    e.preventDefault();
    const formData = new FormData(this._element.querySelector(`.point-form`));
    const newData = this._processForm(formData);
    if (typeof this._onSubmit === `function`) {
      this._onSubmit(newData);
    }
    this.update(newData);
  }

  _onDeleteButtonClick(e) {
    e.preventDefault();
    if (typeof this._onDelete === `function`) {
      this._onDelete();
    }
  }

  _onChangeFavorite() {
    this._isFavorite = !this._isFavorite;
  }

  _onInputTitleChange() {
    if (typeof this._onSelect === `function`) {
      this._onSelect();
    }
  }

  _onInputOfferChange(e) {
    const changedValue = this._offers.find((it) => (it.title || it.name) === e.target.value);
    changedValue.accepted = !changedValue.accepted;
  }

  _onInputDestinationChange(e) {
    const changedValue = this._destinations.find((it) => it.name === e.target.value);
    this._destination = changedValue.name;
    this._description = changedValue.description;
    this._pictures = changedValue.pictures;

    this.rerender();
  }

  _onLabelClick() {
    let selectWrapper = this._element.querySelector(`.travel-way__select`);
    selectWrapper.classList.toggle(`active`);
  }

  _onEscPress(e) {
    if (typeof this._onSelect === `function` && e.key === `Escape`) {
      this._onEsc();
    }
  }

  _processForm(formData) {
    const entry = {
      title: this._title,
      price: ``,
      destination: ``,
      pictures: this._pictures,
      description: this._description,
      offers: this._offers,
      dateFrom: ``,
      dateTo: ``,
      isFavorite: this._isFavorite,
    };
    const pointEditMapper = PointEdit.createMapper(entry);

    for (const pair of formData.entries()) {
      const [property, value] = pair;
      if (pointEditMapper[property]) {
        pointEditMapper[property](value);
      }
    }

    entry.dateFrom = new Date((moment(this._dateFrom).format(`YYYY-MM-DD`)) + `T` + entry.dateFrom).getTime();
    entry.dateTo = new Date((moment(this._dateTo).format(`YYYY-MM-DD`)) + `T` + entry.dateTo).getTime();

    return entry;
  }

  bind() {
    this._element.addEventListener(`submit`, this._onSubmitButtonClick);
    this.element.addEventListener(`reset`, this._onDeleteButtonClick);
    document.addEventListener(`keydown`, this._onEscPress);
    this._element.querySelector(`#favorite`)
      .addEventListener(`change`, this._onChangeFavorite);
    this._element.querySelector(`.travel-way__label`)
      .addEventListener(`click`, this._onLabelClick);
    this._element.querySelector(`.travel-way__select-group`)
      .addEventListener(`change`, this._onInputTitleChange);
    this._element.querySelector(`.point__offers-wrap`)
      .addEventListener(`change`, this._onInputOfferChange);
    this._element.querySelector(`#destination`)
      .addEventListener(`change`, this._onInputDestinationChange);
    this._dayFlatpickr = flatpickr(this._element.querySelector(`input[name="day"]`),
        {
          dateFormat: `M d`,
          defaultDate: this._dateFrom,
          minDate: this._dateFrom,
          onChange: (date) => {
            this._dateFrom = date[0];
            this._dateFromFlatpickr.config.minDate = date[0];
            this._dateToFlatpickr.config.minDate = date[0];
          }
        });

    this._dateFromFlatpickr = flatpickr(this._element.querySelector(`input[name="date-start"]`),
        {
          enableTime: true,
          dateFormat: `H:i`,
          defaultDate: this._dateFrom,
          minDate: this._dateFrom,
          [`time_24hr`]: true,
          onChange: (date) => {
            this._dateFrom = date[0];
            this._dateToFlatpickr.config.minDate = date[0];
          }
        });

    this._dateToFlatpickr = flatpickr(this._element.querySelector(`input[name="date-end"]`),
        {
          enableTime: true,
          dateFormat: `H:i`,
          defaultDate: this._dateTo,
          minDate: this._dateFrom,
          [`time_24hr`]: true,
          onChange: (date) => {
            this._dateTo = date[0];
          }
        });
  }

  unbind() {
    this._element.removeEventListener(`submit`, this._onSubmitButtonClick);
    this.element.removeEventListener(`reset`, this._onDeleteButtonClick);
    document.removeEventListener(`keydown`, this._onEscPress);
    this._element.querySelector(`#favorite`)
      .removeEventListener(`change`, this._onChangeFavorite);
    this._element.querySelector(`.travel-way__label`)
      .removeEventListener(`click`, this._onLabelClick);
    this._element.querySelector(`.travel-way__select-group`)
      .removeEventListener(`change`, this._onInputTitleChange);
    this._element.querySelector(`.point__offers-wrap`)
      .removeEventListener(`change`, this._onInputOfferChange);
    this._element.querySelector(`#destination`)
      .removeEventListener(`change`, this._onInputDestinationChange);
    this._dayFlatpickr.destroy();
    this._dateFromFlatpickr.destroy();
    this._dateToFlatpickr.destroy();
  }

  static createMapper(target) {
    return {
      'type': (value) => (target.title = value),
      'destination': (value) => (target.destination = value),
      'date-start': (value) => (target.dateFrom = value),
      'date-end': (value) => (target.dateTo = value),
      'price': (value) => (target.price = value),
      'favorite': (value) => (target.isFavorite = value),
    };
  }
}
