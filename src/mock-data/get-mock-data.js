import * as utils from '../utils.js';

export const getMockData = () => {
  const transport = [
    {name: `taxi`, icon: `🚕`},
    {name: `bus`, icon: `🚌`},
    {name: `train`, icon: `🚂`},
    {name: `ship`, icon: `🛳`},
    {name: `transport`, icon: `🚊`},
    {name: `drive`, icon: `🚗`},
    {name: `flight`, icon: `✈️`},
  ];
  const services = [
    {name: `check-in`, icon: `🏨`},
    {name: `sightseeing`, icon: `🏛️`},
    {name: `restaurant`, icon: `🍴`},
  ];
  const icons = [
    ...transport,
    ...services
  ];

  const TIME = {
    time: `9:00, 10:00, 11:00, 12:00, 13:00, 14:00, 15:00, 16:00, 17:00, 18:00, 19:00, 20:00, 21:00, 22:00, 23:00, 00:00`,
    max: 1,
  };

  const PRICE = {
    price: `20, 30, 40, 50`,
    max: 1,
  };

  const OFFERS = {
    offers: `Add luggage, Switch to comfort class, Add meal, Choose seats`,
    min: 0,
    max: 3,
  };

  const DESCRIPTION = {
    description: `Lorem ipsum dolor sit amet, consectetur adipiscing elit. Cras aliquet varius magna, non porta ligula feugiat eget. Fusce tristique felis at fermentum pharetra. Aliquam id orci ut lectus varius viverra. Nullam nunc ex, convallis sed finibus eget, sollicitudin eget ante. Phasellus eros mauris, condimentum sed nibh vitae, sodales efficitur ipsum. Sed blandit, eros vel aliquam faucibus, purus ex euismod diam, eu luctus nunc ante ut dui. Sed sed nisi sed augue convallis suscipit in sed felis. Aliquam erat volutpat. Nunc fermentum tortor ac porta dapibus. In rutrum ac purus sit amet tempus.`,
    min: 1,
    max: 4,
  };
  const destinations = [
    `Airport`,
    `Geneva`,
    `Chamonix`,
    `hotel`,
  ];

  const title = utils.getRandomArray([...(icons.map((icon) => icon.name))]);

  return {
    destination: utils.getRandomArray(destinations),
    destinations,
    title,
    icon: utils.getIcon(icons, title),
    icons,
    offers: utils.getRandomValue(OFFERS.offers, OFFERS.max, OFFERS.min),
    description: utils.getRandomValue(DESCRIPTION.description, DESCRIPTION.max, DESCRIPTION.min, `.`),
    pictures: `http://picsum.photos/300/150?r=${Math.random()}`,
    dateFrom: utils.getRandomValue(TIME.time, TIME.max, TIME.max),
    dateTo: utils.getRandomValue(TIME.time, TIME.max, TIME.max),
    dueDate: `2019-04-09`,
    price: `${utils.getRandomValue(PRICE.price, PRICE.max, PRICE.max)}`,
  };
};

