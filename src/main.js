import TripInfo from './view/trip-info';
import SiteMenu from './view/site-menu';
import TripFilters from './view/trip-filters';
import EventsSort from './view/events-sort';
import EventsList from './view/events-list';
import EditEvent from './view/edit-event';
import Event from './view/event';

import { RenderPosition, render } from './utils';
import { generateFilter } from './mock/filter';
import { getEvent } from './mock/mock';

const EVENTS_COUNT = 20;

const events = new Array(EVENTS_COUNT).fill().map(getEvent).sort((a, b) => Date.parse(a.dates[0]) - Date.parse(b.dates[0]));
const filters = generateFilter(events);

const siteMenuContainer = document.querySelector('.trip-controls__navigation');
const tripInfoContainer = document.querySelector('.trip-main');
const tripFiltersContainer = document.querySelector('.trip-controls__filters');
const tripEventsContainer = document.querySelector('.trip-events');

render(tripInfoContainer, new TripInfo(events).getElement(), RenderPosition.AFTERBEGIN);
render(siteMenuContainer, new SiteMenu().getElement(), RenderPosition.BEFOREEND);
render(tripFiltersContainer, new TripFilters(filters).getElement(), RenderPosition.BEFOREEND);

const eventsListComponent = new EventsList();

render(tripEventsContainer,  new EventsSort().getElement(), RenderPosition.BEFOREEND);
render(tripEventsContainer, eventsListComponent.getElement(), RenderPosition.BEFOREEND);

const renderEvent = (container, event) => {
  const newEvent = new Event(event);
  const editEvent = new EditEvent(event);

  const replaceNewToEditEvent = () => {
    container.replaceChild(editEvent.getElement(), newEvent.getElement());
  };

  const replaceEditToNewEvent = () => {
    container.replaceChild(newEvent.getElement(), editEvent.getElement());
  };

  const onEscKeyDown = (evt) => {
    if (evt.key === 'Escape' || evt.key === 'Esc') {
      evt.preventDefault();
      replaceEditToNewEvent();
      document.removeEventListener('keydown', onEscKeyDown);
    }
  };

  newEvent.getElement().querySelector('.event__rollup-btn').addEventListener('click', () => {
    replaceNewToEditEvent();
    document.addEventListener('keydown', onEscKeyDown);
  });

  editEvent.getElement().querySelector('form').addEventListener('submit', (evt) => {
    evt.preventDefault();
    replaceEditToNewEvent();
    document.removeEventListener('keydown', onEscKeyDown);
  });

  render(container, newEvent.getElement(), RenderPosition.BEFOREEND);
};

for (let i = 0; i < EVENTS_COUNT; i++) {
  renderEvent(eventsListComponent.getElement(), events[i]);
}

