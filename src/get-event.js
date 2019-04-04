import * as data from './data.js';
import * as utils from './utils.js';

const getEvent = (event) => ({
  destination: event.destination,
  destinations: data.pointData.destinations,
  title: event.title,
  icon: data.pointData.icons.find(() => event.icon).icon,
  icons: data.pointData.icons,
  offers: utils.getRandomValue(data.OFFERS.offers, data.OFFERS.max, data.OFFERS.min),
  description: utils.getRandomValue(data.DESCRIPTION.description, data.DESCRIPTION.max, data.DESCRIPTION.min, `.`),
  picture: `http://picsum.photos/300/150?r=${Math.random()}`,
  timeFrom: utils.getRandomValue(data.TIME.time, data.TIME.max, data.TIME.max),
  timeTo: utils.getRandomValue(data.TIME.time, data.TIME.max, data.TIME.max),
  price: `${utils.getRandomValue(data.PRICE.price, data.PRICE.max, data.PRICE.max)}`,
});

export const events = data.pointData.events.map(getEvent);
