export const TIME = {
  time: `9:00, 10:00, 11:00, 12:00, 13:00, 14:00, 15:00, 16:00, 17:00, 18:00, 19:00, 20:00, 21:00, 22:00, 23:00, 00:00`,
  max: 1,
};

export const PRICE = {
  price: `20, 30, 40, 50`,
  max: 1,
};

export const OFFERS = {
  offers: `Add luggage, Switch to comfort class, Add meal, Choose seats`,
  min: 0,
  max: 3,
};

export const DESCRIPTION = {
  desc: `Lorem ipsum dolor sit amet, consectetur adipiscing elit. Cras aliquet varius magna, non porta ligula feugiat eget. Fusce tristique felis at fermentum pharetra. Aliquam id orci ut lectus varius viverra. Nullam nunc ex, convallis sed finibus eget, sollicitudin eget ante. Phasellus eros mauris, condimentum sed nibh vitae, sodales efficitur ipsum. Sed blandit, eros vel aliquam faucibus, purus ex euismod diam, eu luctus nunc ante ut dui. Sed sed nisi sed augue convallis suscipit in sed felis. Aliquam erat volutpat. Nunc fermentum tortor ac porta dapibus. In rutrum ac purus sit amet tempus.`,
  min: 1,
  max: 4,
};

export const FILTERS = [
  {id: `Everything`, checked: true},
  {id: `Future`},
  {id: `Past`},
];

export const POINT_NUMBER = {
  max: 5,
  min: 1,
};

export const pointData = {
  icons: {
    Taxi: `🚕`,
    Bus: `🚌`,
    Train: `🚂`,
    Ship: `🛳️`,
    Transport: `🚊`,
    Drive: `🚗`,
    Flight: `✈️`,
    Checkin: `🏨`,
    Sightseeing: `🏛️`,
    Restaurant: `🍴`,
  },
  events: [{
    id: `Airport`,
    title: `Taxi to`,
    icon: `Taxi`,
  },
  {
    id: `Geneva`,
    title: `Flight to`,
    icon: `Flight`,
  },
  {
    id: `Chamonix`,
    title: `Drive to`,
    icon: `Drive`,
  },
  {
    id: `hotel`,
    title: `Check into a`,
    icon: `Checkin`,
  }],
};
