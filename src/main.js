import TripInfo from './view/trip-info';
import SiteMenu from './view/site-menu';
import TripFilters from './view/trip-filters';
import EventsSort from './view/events-sort';
import EventsList from './view/events-list';
import EditEvent from './view/edit-event';
import Event from './view/event';
import NoEvent from './view/no-event';

import { RenderPosition, render } from './utils/render';
import { generateFilter } from './mock/filter';
import { getEvent } from './mock/mock';

const EVENTS_COUNT = 10;

const events = new Array(EVENTS_COUNT).fill().map(getEvent).sort((a, b) => Date.parse(a.dates[0]) - Date.parse(b.dates[0]));
const filters = generateFilter(events);

const siteMenuContainer = document.querySelector('.trip-controls__navigation');
const tripInfoContainer = document.querySelector('.trip-main');
const tripFiltersContainer = document.querySelector('.trip-controls__filters');
const tripEventsContainer = document.querySelector('.trip-events');

const renderEvent = (container, event) => {
  const newEvent = new Event(event);
  const editEvent = new EditEvent(event);

  const replaceNewToEditEvent = () => {
    container.replaceChild(editEvent.getElement(), newEvent.getElement());
  };

  const replaceEditToNewEvent = () => {
    container.replaceChild(newEvent.getElement(), editEvent.getElement());
  };

  const closeEvent = () => {
    replaceEditToNewEvent();
    document.removeEventListener('keydown', onEscKeyDown);
  };

  const onEscKeyDown = (evt) => {
    if (evt.key === 'Escape' || evt.key === 'Esc') {
      evt.preventDefault();
      closeEvent();
    }
  };

  newEvent.getElement().querySelector('.event__rollup-btn').addEventListener('click', () => {
    replaceNewToEditEvent();
    document.addEventListener('keydown', onEscKeyDown);
  });

  editEvent.getElement().querySelector('form').addEventListener('submit', (evt) => {
    evt.preventDefault();
    closeEvent();
  });

  render(container, newEvent.getElement(), RenderPosition.BEFOREEND);
};

const renderEvents = (container, events) => {
  const eventsListComponent = new EventsList();

  if (!events.length) {
    render(container, new NoEvent().getElement(), RenderPosition.BEFOREEND);
  } else {
    render(container, new EventsSort().getElement(), RenderPosition.BEFOREEND);
    render(container, eventsListComponent.getElement(), RenderPosition.BEFOREEND);

    events.forEach((event) => renderEvent(eventsListComponent.getElement(), event));
  }
};

render(tripInfoContainer, new TripInfo(events).getElement(), RenderPosition.AFTERBEGIN);
render(siteMenuContainer, new SiteMenu().getElement(), RenderPosition.BEFOREEND);
render(tripFiltersContainer, new TripFilters(filters).getElement(), RenderPosition.BEFOREEND);

renderEvents(tripEventsContainer, events);
