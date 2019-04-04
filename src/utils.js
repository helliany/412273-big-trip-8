import moment from 'moment';

export const getRandomNumber = (max, min) => {
  return Math.floor(Math.random() * (max - min)) + min;
};

export const getRandomValue = (data, max, min, split = `,`) => {
  const arr = data.split(split);
  const n = getRandomNumber(max, min);
  const getIndex = () => Math.floor(Math.random() * arr.length);
  return [...new Array(n)].map(() => arr[getIndex()]);
};

export const getDuration = (timeFrom, timeTo) => {
  return moment.utc(moment.duration(timeTo) - moment.duration(timeFrom)).format(`h[h] m[m]`);
};

export const getArrRand = (arr) => arr[getRandomNumber(0, arr.length)];
