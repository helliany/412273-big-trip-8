import renderCharts from './presenters/render-charts';

export default (data) => {
  const main = document.querySelector(`main`);
  const statistic = document.querySelector(`.statistic`);
  const switchBtns = document.querySelectorAll(`.trip-controls__menus .view-switch__item`);

  for (const switchBtn of switchBtns) {
    switchBtn.addEventListener(`click`, (evt) => onSwitchBtnsClick(evt, data));
  }

  const onSwitchBtnsClick = (evt, points) => {
    evt.preventDefault();
    for (const switchBtn of switchBtns) {
      switchBtn.classList.remove(`view-switch__item--active`);
    }
    if (evt.target.getAttribute(`href`) === `#stats`) {
      main.classList.add(`visually-hidden`);
      statistic.classList.remove(`visually-hidden`);
      evt.target.classList.add(`view-switch__item--active`);
      renderCharts(points);
    } else {
      main.classList.remove(`visually-hidden`);
      statistic.classList.add(`visually-hidden`);
      evt.target.classList.add(`view-switch__item--active`);
    }
  };
};
