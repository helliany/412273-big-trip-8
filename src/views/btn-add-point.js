import Component from '../component';

export default class BtnAddPoint extends Component {
  constructor() {
    super();

    this._onClick = null;
    this._onBtnAddClick = this._onBtnAddClick.bind(this);
  }

  get template() {
    return `<button class="trip-controls__new-event new-event">+ New Event</button>`;
  }

  set onClick(fn) {
    this._onClick = fn;
  }

  _onBtnAddClick() {
    return typeof this._onClick === `function` && this._onClick();
  }

  bind() {
    this._element.addEventListener(`click`, this._onBtnAddClick);
  }

  unbind() {
    this._element.removeEventListener(`click`, this._onBtnAddClick);
  }
}
