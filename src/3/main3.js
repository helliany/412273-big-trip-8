import renderFilter from './renderFilter';
import getRouteData from './getRouteData';

import RoutePointComponent from './route-point-component';
import RouteEditComponent from './route-edit-component';

const Filter = {
  COUNT_MIN: 2,
  COUNT_MAX: 7,
  INDEX_CHECKED: 0
};

const routeData = getRouteData();
const PointComponent = new RoutePointComponent(routeData);
const EditComponent = new RouteEditComponent(routeData);

const filters = [`everything`, `future`, `past`];

const filtersParent = document.querySelector(`.trip-filter`);
const routeParent = document.querySelector(`.trip-day__items`);

const app = {
  bind() {
    PointComponent.onClick = () => {
      EditComponent.render();
      routeParent.replaceChild(EditComponent.element, PointComponent.element);
      PointComponent.unmount();
    };

    EditComponent.onSubmit = ({day, type, destination, timeFrom, timeTo, price, offers}) => {
      routeData.day = day;//
      routeData.type = type;//
      routeData.destination = destination;//
      routeData.timeFrom = timeFrom;//
      routeData.timeTo = timeTo;//
      routeData.price = price;//
      routeData.offers = offers;

      PointComponent.update(routeData);
      PointComponent.render();
      routeParent.replaceChild(PointComponent.element, EditComponent.element);
      EditComponent.unmount();
    };
  },
  render() {
    filters.map((filter, i) => filtersParent.insertAdjacentHTML(`beforeend`,
        renderFilter(filter, i === Filter.INDEX_CHECKED)));

    routeParent.appendChild(PointComponent.render());
  },
  init() {
    this.render();
    this.bind();
  }
};

app.init();