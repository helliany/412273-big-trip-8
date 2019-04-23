import Component from '../component';

export default class Filter extends Component {
  constructor(caption) {
    super();
    this._caption = caption;

    this._onFilter = null;
    this._onFilterChange = this._onFilterChange.bind(this);
  }

  get template() {
    return `
      <div>
        <input type="radio" id="filter-${this._caption.toLowerCase()}" name="filter" value="${this._caption.toLowerCase()}">
        <label class="trip-filter__item" for="filter-${this._caption.toLowerCase()}">${this._caption}</label>
      </div>  
    `.trim();
  }

  set onFilter(fn) {
    this._onFilter = fn;
  }

  _onFilterChange(e) {
    if (typeof this._onFilter === `function`) {
      this._onFilter(e);
    }
  }

  bind() {
    this._element.querySelector(`input[type="radio"]`)
      .addEventListener(`change`, this._onFilterChange);
  }

  unbind() {
    this._element.querySelector(`input[type="radio"]`)
      .removeEventListener(`change`, this._onFilterChange);
  }
}
