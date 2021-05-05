import TripInfo from './view/trip-info';
import SiteMenu from './view/site-menu';
import TripFilters from './view/trip-filters';
import EventsSort from './view/events-sort';
import EventList from './view/event-list';
import EditEvent from './view/edit-event';
import Event from './view/event';

import { RenderPosition, renderElement } from './utils';
import { generateFilter } from './mock/filter';
import { getEvent } from './mock/mock';

const EVENTS_COUNT = 20;

const events = new Array(EVENTS_COUNT).fill().map(getEvent).sort((a, b) => Date.parse(a.dates[0]) - Date.parse(b.dates[0]));
const filters = generateFilter(events);

const siteMenuContainer = document.querySelector('.trip-controls__navigation');
const tripInfoContainer = document.querySelector('.trip-main');
const tripFiltersContainer = document.querySelector('.trip-controls__filters');
const tripEventsContainer = document.querySelector('.trip-events');

renderElement(tripInfoContainer, new TripInfo(events).getElement(), RenderPosition.AFTERBEGIN);
renderElement(siteMenuContainer, new SiteMenu().getElement(), RenderPosition.BEFOREEND);
renderElement(tripFiltersContainer, new TripFilters(filters).getElement(), RenderPosition.BEFOREEND);
renderElement(tripEventsContainer, new EventsSort().getElement(), RenderPosition.BEFOREEND);
renderElement(tripEventsContainer, new EventList().getElement(), RenderPosition.BEFOREEND);

const tripEventslist = document.querySelector('.trip-events__list');
renderElement(tripEventslist, new EditEvent(events[0]).getElement(), RenderPosition.AFTERBEGIN);

for (let i = 1; i < EVENTS_COUNT; i++) {
  renderElement(tripEventslist, new Event(events[i]).getElement(), RenderPosition.BEFOREEND);
}

