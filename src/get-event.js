import * as data from './data.js';
import * as utils from './utils.js';

const getEvent = (event) => ({
  id: event.id,
  title: event.title,
  icon: utils.getIcon(data.pointData.icons, event.icon),
  offers: utils.getRandomValue(data.OFFERS.offers, data.OFFERS.max, data.OFFERS.min),
  desc: utils.getRandomValue(data.DESCRIPTION.desc, data.DESCRIPTION.max, data.DESCRIPTION.min, `.`),
  picture: `http://picsum.photos/300/150?r=${Math.random()}`,
  timeFrom: utils.getRandomValue(data.TIME.time, data.TIME.max, data.TIME.max),
  timeTo: utils.getRandomValue(data.TIME.time, data.TIME.max, data.TIME.max),
  price: `&euro;&nbsp;${utils.getRandomValue(data.PRICE.price, data.PRICE.max, data.PRICE.max)}`,
});

export const events = data.pointData.events.map(getEvent);
