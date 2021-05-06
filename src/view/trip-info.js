import { getTripOffersCost, getTripTotalCost, getTripTitle, getTripDates } from '../utils/trip';
import Component from './component';

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
export default class TripInfo extends Component {
  constructor(event) {
    super();
    this._event = event;
  }

  getTemplate() {
    return createTripInfoTemplate(this._event);
  }
}
