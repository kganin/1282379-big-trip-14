import dayjs from 'dayjs';

const isDateExpired = (date) => {
  return dayjs().isAfter(dayjs(date), 'm');
};

const isDateInFuture = (date) => {
  return dayjs().isBefore(dayjs(date), 'm');
};

const isDateCurrent = (date) => {
  return dayjs().isSame(dayjs(date), 'm');
};

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

const createFilterItemTemplate = (filter, isChecked) => {
  const {name, count} = filter;

  return `<div class="trip-filters__filter">
    <input id="filter-${name}" class="trip-filters__filter-input visually-hidden"  type="radio"  name="trip-filter"  value="${name}"  ${isChecked ? 'checked' : ''} ${count === 0 ? 'disabled' : ''}>
    <label class="trip-filters__filter-label" for="filter-${name}">${name} ${count}</label>
  </div>`;
};

export const createTripFiltersTemplate = (filters) => {
  const filterItemsTemplate = filters
    .map((filter, index) => createFilterItemTemplate(filter, index === 0))
    .join('');

  return `<form class="trip-filters" action="#" method="get">
  ${filterItemsTemplate}
  <button class="visually-hidden" type="submit">Accept filter</button>
</form>`;
};
