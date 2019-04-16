import Component from "../component";

export default class Sort extends Component {
  constructor(label) {
    super();

    this._label = label;

    this._onClick = null;
    this._onInputSortClick = this._onInputSortClick.bind(this);
  }

  _onInputSortClick(evt) {
    if (typeof this._onClick === `function`) {
      this._onClick(evt);
    }
  }

  set onClick(fn) {
    this._onClick = fn;
  }

  get template() {
    return `
      <div>
        <input type="radio" name="trip-sorting" id="sorting-${this._label}" value="${this._label}" ${this._label === `event` ? `checked` : ``}>
        <label class="trip-sorting__item trip-sorting__item--${this._label}" for="sorting-${this._label}">${this._label}</label>
      </div>
    `.trim();
  }

  bind() {
    this._element.querySelector(`input[type="radio"]`)
      .addEventListener(`change`, this._onInputSortClick);
  }

  unbind() {
    this._element.querySelector(`input[type="radio"]`)
      .removeEventListener(`change`, this._onInputSortClick);
  }
}
