import moment from 'moment';

const getRandomNumber = (max, min) => {
  return Math.floor(Math.random() * (max - min)) + min;
};

const getRandomValue = (data, max, min, split = `,`) => {
  const arr = data.split(split);
  const n = getRandomNumber(max, min);
  const getIndex = () => Math.floor(Math.random() * arr.length);
  return [...new Array(n)].map(() => arr[getIndex()].trim());
};

const getDuration = (dateFrom, dateTo) => {
  const from = moment(dateFrom);
  const to = moment(dateTo);
  const diffTime = moment.duration(to.diff(from));
  return moment(+diffTime).format(`HH:mm`);
};

const getDurationHours = (dateFrom, dateTo) => {
  const from = moment(dateFrom);
  const to = moment(dateTo);
  const diffTime = moment.duration(to.diff(from));
  return moment(+diffTime).format(`h`);
};

const getRandomArray = (arr) => arr[getRandomNumber(0, arr.length)];

const getIcon = (icons, title) => icons.find((item) => item.name === title).icon;

const getNewData = (elements, i, data) => {
  elements[i] = Object.assign({}, elements[i], data);
  return elements[i];
};

const createElement = (template) => {
  const newElement = document.createElement(`div`);
  newElement.innerHTML = template;
  return newElement.firstChild;
};

export {
  getRandomNumber,
  getRandomValue,
  getDuration,
  getDurationHours,
  getRandomArray,
  getIcon,
  getNewData,
  createElement,
};
