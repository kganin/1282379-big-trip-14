import dayjs from 'dayjs';

export const getTripTitle = (events) => {
  const cities = new Set(events.map(( {destination }) => destination.city));
  return Array.from(cities).join(' &mdash; ');
};

export const getTripDates = (events) => {
  const fromDate = dayjs(events[0].dates[0]);
  const toDate = dayjs(events[events.length - 1].dates[1]);

  return `${fromDate.format('MMM DD')}&nbsp;&mdash;&nbsp;${toDate.format('MMM') === toDate.format('MMM') ? toDate.format('DD') : toDate.format('MMM DD')}`;
};

export const getTripTotalCost = (events) => {
  return events.reduce((accumulator, currentEvent) => {
    return accumulator + currentEvent.price;
  }, 0);
};

export const getTripOffersCost = (events) => {
  return events.reduce((eventsAccumulator, currentEvent) => {
    return eventsAccumulator + currentEvent.offers.reduce((offersAccumulator, currentOffer) => {
      if (currentOffer.isChecked) {
        return offersAccumulator + currentOffer.price;
      }
      return offersAccumulator;
    },0);
  },0);
};

export const RenderPosition = {
  AFTERBEGIN: 'afterbegin',
  BEFOREEND: 'beforeend',
};

export const render = (container, element, place) => {
  switch (place) {
    case RenderPosition.AFTERBEGIN:
      container.prepend(element);
      break;
    case RenderPosition.BEFOREEND:
      container.append(element);
      break;
  }
};

export const createElement = (template) => {
  const newElement = document.createElement('div');
  newElement.innerHTML = template;

  return newElement.firstChild;
};
