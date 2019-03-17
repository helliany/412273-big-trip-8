import * as utils from './utils.js';

export default (point) => {
  return `
    <article class="trip-point">
      <i class="trip-icon">${point.icon}</i>
      <h3 class="trip-point__title">${point.title}</h3>
      <p class="trip-point__schedule">
        <span class="trip-point__timetable">${point.timeFrom} — ${point.timeTo}</span>
        <span class="trip-point__duration">${utils.getDuration(point.timeFrom, point.timeTo)}</span>
      </p>
      <p class="trip-point__price">${point.price}</p>
      <ul class="trip-point__offers">
      ${point.offers.map((el) => `
        <li>
          <button class="trip-point__offer">${el}</button>
        </li>`).join(``)}
      </ul>
    </article>
  `;
};
