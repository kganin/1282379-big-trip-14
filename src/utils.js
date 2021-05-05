import dayjs from 'dayjs';
import duration from 'dayjs/plugin/duration';

export const getRandomInt = (min, max) => {
  min = Math.ceil(min);
  max = Math.floor(max);
  return Math.floor(Math.random() * (max - min + 1) + min);
};

export const shuffleArray = (elements) => {
  const clonedElements = elements.slice(0);
  for (let i = clonedElements.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    const swap = clonedElements[i];
    clonedElements[i] = clonedElements[j];
    clonedElements[j] = swap;
  }
  return clonedElements;
};

export const getRandomArray = (elements) => shuffleArray(elements).slice(getRandomInt(0, elements.length));

export const getRandomArrayElement = (elements) => elements[getRandomInt(0, elements.length - 1)];

export const getDuration = (fromDate, toDate) => {

  dayjs.extend(duration);

  const difference = dayjs(toDate).diff(dayjs(fromDate));
  const timeDuration = dayjs.duration(difference);

  if (dayjs(toDate).diff(dayjs(fromDate), 'minute') < 60) {
    return timeDuration.format('mm[M]');
  } else if (dayjs(toDate).diff(dayjs(fromDate), 'hour') < 24) {
    return timeDuration.format('HH[H] mm[M]');
  } else {
    return timeDuration.format('DD[D] HH[H] mm[M]');
  }
};

export const isDateExpired = (date) => {
  return dayjs().isAfter(dayjs(date), 'm');
};

export const isDateInFuture = (date) => {
  return dayjs().isBefore(dayjs(date), 'm');
};

export const isDateCurrent = (date) => {
  return dayjs().isSame(dayjs(date), 'm');
};

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
      return offersAccumulator + currentOffer.price;
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
