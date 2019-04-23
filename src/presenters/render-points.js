import Point from '../views/point';
import PointEdit from '../views/point-edit';
import {getIcon, getNewData} from '../utils.js';
import renderTotalCost from './render-total-cost';
import {icons} from '../constants';
import switchBtns from '../switch-btns';

const pointWrapper = document.querySelector(`.trip-day__items`);

const deletePoint = (points, i) => {
  points.splice(i, 1);
  return points;
};

export default (points, destinations, offers, provider) => {
  pointWrapper.textContent = ``;
  const fragment = document.createDocumentFragment();

  points.forEach((point, i) => {
    const PointComponent = new Point(point);
    const PointEditComponent = new PointEdit(point, destinations, offers);

    const disableForm = (isDisabled) => {
      const inputs = PointEditComponent.element.querySelectorAll(`input`);
      PointEditComponent.element.querySelector(`[type=submit]`).disabled = isDisabled;
      PointEditComponent.element.querySelector(`[type=reset]`).disabled = isDisabled;
      for (const input of inputs) {
        input.disabled = isDisabled;
      }
    };

    PointComponent.onClick = () => {
      PointEditComponent.render();
      pointWrapper.replaceChild(PointEditComponent.element, PointComponent.element);
      PointComponent.unrender();
    };

    PointEditComponent.onSubmit = (data) => {
      PointEditComponent.element.querySelector(`[type=submit]`).innerText = `Saving...`;
      disableForm(true);

      point.title = data.title;
      point.destination = data.destination;
      point.pictures = data.pictures;
      point.description = data.description;
      point.dateFrom = data.dateFrom;
      point.dateTo = data.dateTo;
      point.price = Number(data.price);
      point.offers = data.offers;
      point.isFavorite = data.isFavorite;

      provider.updatePoint({id: point.id, data: point.toRAW()})
        .then((updatedData) => {
          PointEditComponent.update(updatedData);
          PointComponent.update(updatedData);
          PointComponent.render();
          pointWrapper.replaceChild(PointComponent.element, PointEditComponent.element);
          PointEditComponent.unrender();
        })
        .then(() => provider.getPoints())
        .then(renderTotalCost(points))
        .catch(() => {
          PointEditComponent.element.querySelector(`[type=submit]`).innerText = `Save`;
          PointEditComponent.shake();
          disableForm(false);
        });
    };

    PointEditComponent.onDelete = () => {
      PointEditComponent.element.querySelector(`[type=reset]`).innerText = `Deleting...`;
      disableForm(true);

      provider.deletePoint({id: point.id})
        .then(() => {
          deletePoint(points, i);
          PointEditComponent.unrender();
          renderTotalCost(points);
        })
        .then(() => provider.getPoints())
        .catch(() => {
          PointEditComponent.element.querySelector(`[type=reset]`).innerText = `Delete`;
          PointEditComponent.shake();
          disableForm(false);
        });
    };

    PointEditComponent.onEsc = () => {
      PointComponent.render();
      pointWrapper.replaceChild(PointComponent.element, PointEditComponent.element);
      PointEditComponent.unbind();
    };

    PointEditComponent.onSelect = () => {
      const label = PointEditComponent.element.querySelector(`.travel-way__label`);
      const toggleInput = PointEditComponent.element.querySelector(`#travel-way__toggle`);
      const iconInput = PointEditComponent.element.querySelector(`#travel-way__icon`);

      const title = PointEditComponent.element.querySelector(`.travel-way__select-input:checked`).value;
      const icon = getIcon(icons, title);

      toggleInput.value = title;
      iconInput.value = icon;
      const newOffers = points.find((it) => it.title === toggleInput.value).offers;

      label.textContent = icon;
      toggleInput.checked = false;

      const newData = getNewData(points, i, {title, icon, offers: newOffers});
      PointEditComponent.update(newData);
      PointEditComponent.rerender();
    };
    fragment.appendChild(PointComponent.render());
  });
  pointWrapper.appendChild(fragment);
  switchBtns(points);
};
