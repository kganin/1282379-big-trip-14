import { isDateCurrent, isDateExpired, isDateInFuture } from '../utils/event';

const eventToFilterMap = {
  everything: (events) => events.length,
  future: (events) => events.filter((event) => isDateCurrent(event.dates[0]) || isDateInFuture(event.dates[1])).length,
  past: (events) => events.filter((event) => isDateExpired(event.dates[1])).length,
};

export const generateFilter = (events) => {
  return Object.entries(eventToFilterMap).map(([filterName, countEvents]) => {
    return {
      name: filterName,
      count: countEvents(events),
    };
  });
};
