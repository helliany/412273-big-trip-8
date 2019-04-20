import PointEdit from '../views/point-edit';
import BtnAddPoint from '../views/btn-add-point';
import ModelPoint from '../model/model-point';
import renderPoints from './render-points';
import renderTotalCost from './render-total-cost';
import {getIcon} from '../utils.js';
import {ICONS_ARRAY} from '../constants';
import lodash from 'lodash';

export default (destinations, offers, provider) => {
  const pointWrapper = document.querySelector(`.trip-points`);
  const btnWrapper = document.querySelector(`.trip-controls`);

  const BtnComponent = new BtnAddPoint();

  BtnComponent.onClick = () => {
    const PointEditComponent = new PointEdit({dateFrom: new Date(), dateTo: new Date()}, destinations, offers);

    const disableForm = (isDisabled) => {
      const inputs = PointEditComponent.element.querySelectorAll(`input`);
      PointEditComponent.element.querySelector(`[type=submit]`).disabled = isDisabled;
      PointEditComponent.element.querySelector(`[type=reset]`).disabled = isDisabled;
      for (const input of inputs) {
        input.disabled = isDisabled;
      }
    };

    PointEditComponent.onSubmit = (data) => {
      PointEditComponent.element.querySelector(`[type=submit]`).innerText = `Saving...`;
      disableForm(true);

      if (data.title !== `` &&
        data.destination !== `` &&
        Number(data.price) > 0 &&
        data.dateFrom &&
        data.dateTo
      ) {
        const newPoint = new ModelPoint(data);
        newPoint.title = data.title;
        newPoint.destination = data.destination;
        newPoint.pictures = data.pictures;
        newPoint.description = data.description;
        newPoint.price = Number(data.price);
        newPoint.dateFrom = data.dateFrom;
        newPoint.dateTo = data.dateTo;
        newPoint.offers = data.offers;
        newPoint.isFavorite = data.isFavorite;

        provider.createPoint({point: newPoint.toRAW()})
          .then(() => provider.getPoints())
          .then((points) => {
            renderPoints(lodash.sortBy(points, [(it) => it.dateFrom]), destinations, offers, provider);
            PointEditComponent.unrender();
            renderTotalCost(points);
          })
          .catch(() => {
            PointEditComponent.element.querySelector(`[type=submit]`).innerText = `Save`;
            PointEditComponent.shake();
            disableForm(false);
          });
      } else {
        PointEditComponent.element.querySelector(`[type=submit]`).innerText = `Save`;
        PointEditComponent.shake();
        disableForm(false);
      }
    };

    PointEditComponent.onSelect = () => {
      const label = PointEditComponent.element.querySelector(`.travel-way__label`);
      const toggleInput = PointEditComponent.element.querySelector(`#travel-way__toggle`);
      const iconInput = PointEditComponent.element.querySelector(`#travel-way__icon`);

      const title = PointEditComponent.element.querySelector(`.travel-way__select-input:checked`).value;
      const destination = PointEditComponent.element.querySelector(`.point__destination-input`).value;
      const price = PointEditComponent.element.querySelector(`[name=price]`).value;
      const icon = getIcon(ICONS_ARRAY, title);

      toggleInput.value = title;
      iconInput.value = icon;

      label.textContent = icon;
      toggleInput.checked = false;

      const newOffers = offers.find((it) => it.type === title).offers;
      const newData = {dateFrom: new Date(), dateTo: new Date()};

      newData.title = title;
      newData.destination = destination;
      newData.price = Number(price);
      newData.offers = newOffers || [];

      PointEditComponent.update(newData);
      PointEditComponent.rerender();
    };

    PointEditComponent.onEsc = () => {
      pointWrapper.removeChild(PointEditComponent.element);
      PointEditComponent.unbind();
    };

    PointEditComponent.onDelete = () => {
      pointWrapper.removeChild(PointEditComponent.element);
      PointEditComponent.unbind();
    };

    pointWrapper.prepend(PointEditComponent.render());
  };
  btnWrapper.appendChild(BtnComponent.render());
};
