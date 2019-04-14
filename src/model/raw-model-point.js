export default class RawModelPoint {
  constructor(data) {
    this[`id`] = data.id;
    this[`type`] = data.title;
    this[`destination`] = {
      name: data.destination,
      pictures: data.pictures,
      description: data.description,
    };
    this[`offers`] = data.offers;
    this[`date_from`] = data.dateFrom;
    this[`date_to`] = data.dateTo;
    this[`base_price`] = data.price;
    this[`is_favorite`] = data.isFavorite;
  }
}
