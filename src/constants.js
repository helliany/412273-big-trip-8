const METHOD = {
  get: `GET`,
  post: `POST`,
  put: `PUT`,
  delete: `DELETE`
};

const MESSAGE = {
  load: `Loading route...`,
  error: `Something went wrong while loading your route info. Check your connection or try again later`,
};

const SERVER = {
  authorization: `Basic dXNlckBwYXNzd29yZAo=${Math.random()}`,
  endPoint: `https://es8-demo-srv.appspot.com/big-trip`,
  key: `points-store-key`,
};

const FILTERS = [
  `Everything`,
  `Future`,
  `Past`,
];

const SORTS = [
  `event`,
  `time`,
  `price`,
];

const ICONS = {
  'taxi': `🚕`,
  'bus': `🚌`,
  'train': `🚂`,
  'ship': `🛳`,
  'transport': `🚊`,
  'drive': `🚗`,
  'flight': `✈`,
  'check-in': `🏨`,
  'sightseeing': `🏛`,
  'restaurant': `🍴`,
};

const TRANSPORT = [
  {name: `taxi`, icon: `🚕`},
  {name: `bus`, icon: `🚌`},
  {name: `train`, icon: `🚂`},
  {name: `ship`, icon: `🛳`},
  {name: `transport`, icon: `🚊`},
  {name: `drive`, icon: `🚗`},
  {name: `flight`, icon: `✈️`},
];

const SERVICES = [
  {name: `check-in`, icon: `🏨`},
  {name: `sightseeing`, icon: `🏛️`},
  {name: `restaurant`, icon: `🍴`},
];

const ICONS_ARRAY = [
  ...TRANSPORT,
  ...SERVICES
];

export {METHOD, MESSAGE, SERVER, FILTERS, SORTS, ICONS, TRANSPORT, ICONS_ARRAY};
