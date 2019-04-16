export default class ModelPoint {
  constructor(data) {
    this.id = data[`id`];
    this.title = data[`type`];
    this.offers = data[`offers`] || [];
    this.dateFrom = data[`date_from`];
    this.dateTo = data[`date_to`];
    this.price = data[`base_price`];
    this.destination = data[`destination`][`name`];
    this.description = data[`destination`][`description`] || ``;
    this.pictures = data[`destination`][`pictures`] || [];
    this.isFavorite = data[`is_favorite`];
  }

  toRAW() {
    return {
      'id': this.id,
      'type': this.title,
      'destination': {
        name: this.destination,
        pictures: this.pictures,
        description: this.description,
      },
      'offers': this.offers,
      'date_from': this.dateFrom,
      'date_to': this.dateTo,
      'base_price': this.price,
      'is_favorite': this.isFavorite
    };
  }

  static parsePoint(data) {
    return new ModelPoint(data);
  }

  static parsePoints(data) {
    return data.map(ModelPoint.parsePoint);
  }
}
