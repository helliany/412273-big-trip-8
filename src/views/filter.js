import Component from '../component';

export default class Filter extends Component {
  constructor(caption) {
    super();
    this._caption = caption;

    this._onFilter = null;
    this._onFilterChange = this._onFilterChange.bind(this);
  }

  set onFilter(fn) {
    this._onFilter = fn;
  }

  _onFilterChange(evt) {
    if (typeof this._onFilter === `function`) {
      this._onFilter(evt);
    }
  }

  get template() {
    return `
      <div>
        <input type="radio" id="filter-${this._caption.toLowerCase()}" name="filter" value="${this._caption.toLowerCase()}">
        <label class="trip-filter__item" for="filter-${this._caption.toLowerCase()}">${this._caption}</label>
      </div>  
    `.trim();
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
