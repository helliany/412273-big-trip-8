import Component from '../component';

export default class BtnAddPoint extends Component {
  constructor() {
    super();

    this._onClick = null;
    this._onBtnAddClick = this._onBtnAddClick.bind(this);
  }

  _onBtnAddClick() {
    return typeof this._onClick === `function` && this._onClick();
  }

  set onClick(fn) {
    this._onClick = fn;
  }

  get template() {
    return `<button class="trip-controls__new-event new-event">+ New Event</button>`;
  }

  bind() {
    this._element.addEventListener(`click`, this._onBtnAddClick);
  }

  unbind() {
    this._element.removeEventListener(`click`, this._onBtnAddClick);
  }
}
