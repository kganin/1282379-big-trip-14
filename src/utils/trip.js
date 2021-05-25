import dayjs from 'dayjs';

export const getTripTitle = (events) => {
  const citiesSet = new Set(events.map(({destination}) => destination.city));
  const cities = Array.from(citiesSet);
  let tripTitle = '';

  if (cities.length === 1) {
    tripTitle = `<h1 class="trip-info__title">${cities[0]}</h1>`;
  } else if (cities.length === 2) {
    tripTitle = `<h1 class="trip-info__title">${cities[0]} &mdash; ${cities[1]}</h1>`;
  } else if (cities.length === 3) {
    tripTitle = `<h1 class="trip-info__title">${cities[0]} &mdash; ${cities[1]} &mdash; ${cities[2]}</h1>`;
  } else if (cities.length > 3) {
    tripTitle = `<h1 class="trip-info__title">${cities[0]} &mdash; ... &mdash; ${cities[cities.length - 1]}</h1>`;
  }

  return tripTitle;

};

export const getTripDates = (events) => {
  const startDate = dayjs(events[0].dates[0]);
  const endDate = dayjs(events[events.length - 1].dates[1]);

  return `${startDate.format('MMM DD')}&nbsp;&mdash;&nbsp;${endDate.format('MMM') === endDate.format('MMM') ? endDate.format('DD') : endDate.format('MMM DD')}`;
};

export const getTripTotalCost = (events) => {
  return events.reduce((accumulator, currentEvent) => {
    return accumulator + currentEvent.price;
  }, 0);
};

export const getTripOffersCost = (events) => {
  return events.reduce((eventsAccumulator, currentEvent) => {
    return eventsAccumulator + currentEvent.offers.reduce((offersAccumulator, currentOffer) => {
      if (currentOffer) {
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
