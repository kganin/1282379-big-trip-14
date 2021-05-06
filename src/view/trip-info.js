import { getTripOffersCost, getTripTotalCost, getTripTitle, getTripDates } from '../utils/trip';
import { createElement } from '../utils/render';

const createTripInfoTemplate = (events) => {
  const totalTripCost = getTripTotalCost(events) + getTripOffersCost(events);

  return events.length === 0 ? ' ' : `<section class="trip-main__trip-info  trip-info">
  <div class="trip-info__main">
    <h1 class="trip-info__title">${getTripTitle(events)}</h1>

    <p class="trip-info__dates">${getTripDates(events)}</p>
  </div>

  <p class="trip-info__cost">
    Total: &euro;&nbsp;<span class="trip-info__cost-value">${totalTripCost}</span>
  </p>
  </section>`;
};
export default class TripInfo {
  constructor(event) {
    this._event = event;
    this._element = null;
  }

  getTemplate() {
    return createTripInfoTemplate(this._event);
  }

  getElement() {
    if (!this._element) {
      this._element = createElement(this.getTemplate());
    }

    return this._element;
  }

  removeElement() {
    this._element = null;
  }
}
