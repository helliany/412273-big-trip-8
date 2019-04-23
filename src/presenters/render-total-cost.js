import TotalCost from '../views/total-cost';
import lodash from 'lodash';

const costWrapper = document.querySelector(`.trip__total`);

export default (points) => {
  if (document.querySelector(`.trip__total-cost`)) {
    document.querySelector(`.trip__total-cost`).remove();
  }
  const pointsOffers = lodash.map(points, `offers`);
  const offersPrices = [];

  for (const offer of pointsOffers) {
    offersPrices.push(...lodash.filter(offer, `accepted`));
  }

  const resultPrice = lodash.sumBy(points, `price`);
  const resultOffersCost = lodash.sumBy(offersPrices, `price`);

  const resultCost = resultPrice + resultOffersCost;

  const CostComponent = new TotalCost(resultCost);

  costWrapper.appendChild(CostComponent.render());
};
