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

  static parsePoint(data) {
    return new ModelPoint(data);
  }

  static parsePoints(data) {
    return data.map(ModelPoint.parsePoint);
  }
}
