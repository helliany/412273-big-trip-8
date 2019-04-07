import Component from './component';

export default class Filter extends Component {
  constructor(caption) {
    super();
    this._caption = caption;

    this._onFilter = null;
    this._onFilterClick = this._onFilterClick.bind(this);
  }

  set onFilter(fn) {
    this._onFilter = fn;
  }

  _onFilterClick() {
    if (typeof this._onFilter === `function`) {
      this._onFilter();
    }
  }

  get template() {
    return `
        <label class="trip-filter__item" for="filter-${this._caption.toLowerCase()}">${this._caption}
            <input type="radio" id="filter-${this._caption.toLowerCase()}" name="filter" value="${this._caption.toLowerCase()}">
        </label>
    `.trim();
  }

  bind() {
    this._element.addEventListener(`click`, this._onFilterClick);
  }

  unbind() {
    this._element.removeEventListener(`click`, this._onFilterClick);
  }
}
