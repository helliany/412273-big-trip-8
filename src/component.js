export default class Component {
  constructor() {
    if (new.target === Component) {
      throw new Error(`Can't instantiate BaseComponent, only concrete one.`);
    }

    this._element = null;
    this._state = {};
  }

  get element() {
    return this._element;
  }

  get template() {
    throw new Error(`You have to define template.`);
  }

  update() {}

  render() {
    this._element = this._createElement(this.template);
    this.bind();
    return this._element;
  }

  rerender() {
    this.unbind();
    const newElement = this._element;
    this.element.parentNode.replaceChild(this.render(), newElement);
  }

  unrender() {
    this.unbind();
    this._element.remove();
    this._element = null;
  }

  reset() {
    this.unbind();
    this._element = null;
  }

  _createElement(template) {
    const newElement = document.createElement(`div`);
    newElement.innerHTML = template;
    return newElement.firstChild;
  }

  bind() { }

  unbind() { }
}
