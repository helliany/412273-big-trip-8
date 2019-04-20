import TotalCost from '../views/total-cost';
import lodash from 'lodash';

const costWrapper = document.querySelector(`.trip__total`);

export default (points) => {
  if (document.querySelector(`.trip__total-cost`)) {
    document.querySelector(`.trip__total-cost`).remove();
  }
  const pointsOffers = lodash.map(points, `offers`);
  const offersPrice = [];

  for (const offer of pointsOffers) {
    offersPrice.push(...lodash.filter(offer, `accepted`));
  }

  const resultPrice = lodash.sumBy(points, `price`);
  const resultOffersCost = lodash.sumBy(offersPrice, `price`);

  const resultCost = resultPrice + resultOffersCost;

  const CostComponent = new TotalCost(resultCost);

  costWrapper.appendChild(CostComponent.render());
};
