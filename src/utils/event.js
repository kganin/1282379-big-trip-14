import dayjs from 'dayjs';
import duration from 'dayjs/plugin/duration';

export const getDuration = (startDate, endDate) => {

  dayjs.extend(duration);

  const difference = dayjs(endDate).diff(dayjs(startDate));
  const timeDuration = dayjs.duration(difference);

  if (dayjs(endDate).diff(dayjs(startDate), 'minute') < 60) {
    return timeDuration.format('mm[M]');
  } else if (dayjs(endDate).diff(dayjs(startDate), 'hour') < 24) {
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

const getWeightForNullValue = (valueA, valueB) => {
  if (valueA === null && valueB === null) {
    return 0;
  }

  if (valueA === null) {
    return 1;
  }

  if (valueB === null) {
    return -1;
  }

  return null;
};

export const sortEventsByDate = (eventA, eventB) => {
  const weight = getWeightForNullValue(eventA.dates[0], eventB.dates[0]);

  if (weight !== null) {
    return weight;
  }

  return eventA.dates[0] - eventB.dates[0];
};

export const sortEventsByTime = (eventA, eventB) => {
  const durationEventA = dayjs(eventA.dates[1]).diff(dayjs(eventA.dates[0]));
  const durationEventB = dayjs(eventB.dates[1]).diff(dayjs(eventB.dates[0]));

  const weight = getWeightForNullValue(durationEventA, durationEventB);

  if (weight !== null) {
    return weight;
  }

  return durationEventB - durationEventA;
};

export const sortEventsByPrice = (eventA, eventB) => {
  const weight = getWeightForNullValue(eventA.price, eventB.price);

  if (weight !== null) {
    return weight;
  }

  return eventB.price - eventA.price;
};
