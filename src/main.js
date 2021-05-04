import { createSiteMenuTemplate } from './view/site-menu';
import { createTripInfoTemplate } from './view/trip-info';
import { createTripFiltersTemplate, generateFilter } from './view/trip-filters';
import { createEventsSortTemplate } from './view/events-sort';
import { createEventListTemplate } from './view/event-list';
import { createEventTemplate } from './view/event';
import { createEditEventTemplate } from './view/edit-event';
import { getEvent } from './mock/mock';

const EVENTS_COUNT = 20;

const events = new Array(EVENTS_COUNT).fill().map(getEvent).sort((a, b) => Date.parse(a.dates[0]) - Date.parse(b.dates[0]));
const filters = generateFilter(events);

const render = (container, template, place) => {
  container.insertAdjacentHTML(place, template);
};

const siteMenuContainer = document.querySelector('.trip-controls__navigation');
const tripInfoContainer = document.querySelector('.trip-main');
const tripFiltersContainer = document.querySelector('.trip-controls__filters');
const tripEventsContainer = document.querySelector('.trip-events');

render(tripInfoContainer, createTripInfoTemplate(events), 'afterbegin');
render(siteMenuContainer, createSiteMenuTemplate(), 'beforeend');
render(tripFiltersContainer, createTripFiltersTemplate(filters), 'beforeend');
render(tripEventsContainer, createEventsSortTemplate(), 'beforeend');
render(tripEventsContainer, createEventListTemplate(), 'beforeend');

const tripEventslist = document.querySelector('.trip-events__list');
render(tripEventslist, createEditEventTemplate(events[0]), 'afterbegin');

for (let i = 1; i < EVENTS_COUNT; i++) {
  render(tripEventslist, createEventTemplate(events[i]), 'beforeend');
}

