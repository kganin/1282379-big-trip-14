import { getTripOffersCost, getTripTotalCost, getTripTitle, getTripDates } from '../utils';

export const createTripInfoTemplate = (events) => {
  const totalTripCost = getTripTotalCost(events) + getTripOffersCost(events);
  return `<section class="trip-main__trip-info  trip-info">
  <div class="trip-info__main">
    <h1 class="trip-info__title">${getTripTitle(events)}</h1>

    <p class="trip-info__dates">${getTripDates(events)}</p>
  </div>

  <p class="trip-info__cost">
    Total: &euro;&nbsp;<span class="trip-info__cost-value">${totalTripCost}</span>
  </p>
  </section>`;
};
