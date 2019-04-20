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

  const Time = {
    TIME: `9:00, 10:00, 11:00, 12:00, 13:00, 14:00, 15:00, 16:00, 17:00, 18:00, 19:00, 20:00, 21:00, 22:00, 23:00, 00:00`,
    MAX: 1,
  };

  const Price = {
    PRICE: `20, 30, 40, 50`,
    MAX: 1,
  };

  const Offers = {
    OFFERS: `Add luggage, Switch to comfort class, Add meal, Choose seats`,
    MIN: 0,
    MAX: 3,
  };

  const Description = {
    DESCRIPTION: `Lorem ipsum dolor sit amet, consectetur adipiscing elit. Cras aliquet varius magna, non porta ligula feugiat eget. Fusce tristique felis at fermentum pharetra. Aliquam id orci ut lectus varius viverra. Nullam nunc ex, convallis sed finibus eget, sollicitudin eget ante. Phasellus eros mauris, condimentum sed nibh vitae, sodales efficitur ipsum. Sed blandit, eros vel aliquam faucibus, purus ex euismod diam, eu luctus nunc ante ut dui. Sed sed nisi sed augue convallis suscipit in sed felis. Aliquam erat volutpat. Nunc fermentum tortor ac porta dapibus. In rutrum ac purus sit amet tempus.`,
    MIN: 1,
    MAX: 4,
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
    offers: utils.getRandomValue(Offers.OFFERS, Offers.MAX, Offers.MIN),
    description: utils.getRandomValue(Description.DESCRIPTION, Description.MAX, Description.MIN, `.`),
    pictures: `http://picsum.photos/300/150?r=${Math.random()}`,
    dateFrom: utils.getRandomValue(Time.TIME, Time.MAX, Time.MIN),
    dateTo: utils.getRandomValue(Time.TIME, Time.MAX, Time.MIN),
    dueDate: `2019-04-09`,
    price: `${utils.getRandomValue(Price.PRICE, Price.MAX, Price.MAX)}`,
  };
};

