import Component from "../component";

export default class Message extends Component {
  constructor(message) {
    super();

    this._message = message;
  }

  get template() {
    return `<div class="message">${this._message}</div>`.trim();
  }
}
