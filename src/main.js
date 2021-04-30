import { createSiteMenuTemplate } from './view/site-menu.js';
import { createTripInfoTemplate } from './view/trip-info.js';
import { createTripFiltersTemplate } from './view/trip-filters.js';
import { createEventsSortTemplate } from './view/events-sort.js';
import { createEventListTemplate } from './view/event-list.js';
import { createNewEventTemplate } from './view/new-event.js';
import { createEventTemplate } from './view/event.js';
import { createEditEventTemplate } from './view/edit-event.js';
import {} from './mock/event.js';

const TASK_COUNT = 3;

const render = (container, template, place) => {
  container.insertAdjacentHTML(place, template);
};

const siteMenuContainer = document.querySelector('.trip-controls__navigation');
const tripInfoContainer = document.querySelector('.trip-main');
const tripFiltersContainer = document.querySelector('.trip-controls__filters');
const tripEventsContainer = document.querySelector('.trip-events');


render(tripInfoContainer, createTripInfoTemplate(), 'afterbegin');
render(siteMenuContainer, createSiteMenuTemplate(), 'beforeend');
render(tripFiltersContainer, createTripFiltersTemplate(), 'beforeend');
render(tripEventsContainer, createEventsSortTemplate(), 'beforeend');
render(tripEventsContainer, createEventListTemplate(), 'beforeend');

const tripEventslist = document.querySelector('.trip-events__list');
render(tripEventslist, createNewEventTemplate(), 'beforeend');
render(tripEventslist, createEditEventTemplate(), 'afterbegin');

for (let i = 0; i < TASK_COUNT; i++) {
  render(tripEventslist, createEventTemplate(), 'beforeend');
}

