import {getRandom, getSorted, getArrRand} from './utils';

export default () => {
  const transport = [
    {name: `Taxi`, icon: `🚕`},
    {name: `Bus`, icon: `🚌`},
    {name: `Train`, icon: `🚂`},
    {name: `Ship`, icon: `🛳`},
    {name: `Transport`, icon: `🚊`},
    {name: `Drive`, icon: `🚗`},
    {name: `Flight`, icon: `✈️`},
  ];
  const service = [
    {name: `Check-in`, icon: `🏨`},
    {name: `Sightseeing`, icon: `🏛️`},
    {name: `Restaurant`, icon: `🍴`},
  ];
  const types = [
    ...transport,
    ...service
  ];
  const destinations = [...new Set(
      [
        `Amsterdam`,
        `Geneva`,
        `Chamonix`,
        `Athens`,
        `Atlanta`,
        `Airport`,
        `Barcelona`,
        `Bali`,
        `Berlin`,
        `Vancouver`
      ])];
  const typeName = getArrRand([...new Set(types.map((type) => type.name))]);
  return {
    type: typeName,
    types: {transport, service},
    icon: types.find((type) => type.name === typeName).icon,
    destination: getArrRand(destinations),
    destinations,
    photos: new Array(getRandom(1, 6)).fill(``).map(() => `http://picsum.photos/300/150?r=${Math.random()}`),
    offers: [...new Set([
      `Add luggage +€ ${getRandom(5, 20)}`,
      `Switch to comfort class +€ ${getRandom(40, 200)}`,
      `Add meal +€ ${getRandom(10, 80)}`, `Choose seats ${getArrRand([``, `+€ ${getRandom(20, 40)}`])}`
    ])].sort(getSorted).slice(0, getRandom(0, 3)),
    time: getArrRand([
      {
        from: `10:25`,
        to: `12:00`
      },
      {
        from: `11:40`,
        to: `12:50`
      },
      {
        from: `15:45`,
        to: `17:10`
      },
      {
        from: `19:15`,
        to: `22:02`
      }]),
    price: getArrRand([20, 40, 60, 100]),
    description: [
      `Sed sed nisi sed augue convallis suscipit in sed felis. Aliquam erat volutpat. Nunc fermentum tortor ac porta 
      dapibus. In rutrum ac purus sit amet tempus.`, `Phasellus eros mauris, condimentum sed nibh vitae, sodales 
      efficitur ipsum. Sed blandit, eros vel aliquam faucibus, purus ex euismod diam, eu luctus nunc ante ut dui.`,
      `Lorem ipsum dolor sit amet, consectetur adipiscing elit. Cras aliquet varius magna, non porta ligula feugiat eget.
       Fusce tristique felis at fermentum pharetra. Aliquam id orci ut lectus varius viverra. Nullam nunc ex, convallis 
       sed finibus eget, sollicitudin eget ante.`].sort(getSorted).slice(0, getRandom(1, 4))
  };
};