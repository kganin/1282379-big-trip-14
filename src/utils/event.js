import dayjs from 'dayjs';
import duration from 'dayjs/plugin/duration';

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
