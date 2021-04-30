import dayjs from 'dayjs';

const getTripTitle = (events) => {
  const cities = new Set(events.map(( {destination }) => destination.city));
  return Array.from(cities).join(' &mdash; ');
};

const getTripDates = (events) => {
  const fromDate = dayjs(events[0].dates[0]);
  const toDate = dayjs(events[events.length - 1].dates[1]);

  return `${fromDate.format('MMM DD')}&nbsp;&mdash;&nbsp;${toDate.format('MMM') === toDate.format('MMM') ? toDate.format('DD') : toDate.format('MMM DD')}`;
};

const getTripTotalCost = (events) => {
  return events.reduce((accumulator, currentEvent) => {
    return accumulator + currentEvent.price;
  }, 0);
};

const getTripOffersCost = (events) => {
  return events.reduce((eventsAccumulator, currentEvent) => {
    return eventsAccumulator + currentEvent.offers.reduce((offersAccumulator, currentOffer) => {
      return offersAccumulator + currentOffer.price;
    },0);
  },0);
};

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
