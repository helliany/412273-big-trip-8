const BAR_HEIGHT = 55;
const ANIMATION_TIMEOUT = 600;

const Method = {
  GET: `GET`,
  POST: `POST`,
  PUT: `PUT`,
  DELETE: `DELETE`
};

const ResponseCode = {
  SUCCESS: 200,
  REDIRECT: 300,
};

const MessageText = {
  LOAD: `Loading route...`,
  ERROR: `Something went wrong while loading your route info. Check your connection or try again later`,
};

const Server = {
  AUTHORIZATION: `Basic dXNlckBwYXNzd29yZAo=${Math.random()}`,
  END_POINT: `https://es8-demo-srv.appspot.com/big-trip`,
  KEY: `points-store-key`,
};

const filters = [
  `Everything`,
  `Future`,
  `Past`,
];

const sorts = [
  `event`,
  `time`,
  `price`,
];

const Icon = {
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
  '': ``,
};

const transportTypes = [
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
  ...transportTypes,
  ...services
];

export {
  BAR_HEIGHT,
  ANIMATION_TIMEOUT,
  Method,
  ResponseCode,
  MessageText,
  Server,
  filters,
  sorts,
  Icon,
  transportTypes,
  icons,
};
