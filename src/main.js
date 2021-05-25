
import SiteMenu from './view/site-menu';
import TripFilters from './view/trip-filters';
import BoardPresenter from './presenter/board';

import { render, RenderPosition } from './utils/render';
import { getFilter } from './mock/filter';
import { getEvents } from './mock/mock';
import { sortEventsByDate } from './utils/event.js';

const events = getEvents().sort(sortEventsByDate);
const filters = getFilter(events);

const siteMenuContainer = document.querySelector('.trip-controls__navigation');
const tripInfoContainer = document.querySelector('.trip-main');
const tripFiltersContainer = document.querySelector('.trip-controls__filters');
const tripEventsContainer = document.querySelector('.trip-events');

const boardPresenter = new BoardPresenter(tripEventsContainer, tripInfoContainer);

render(siteMenuContainer, new SiteMenu(), RenderPosition.BEFOREEND);
render(tripFiltersContainer, new TripFilters(filters), RenderPosition.BEFOREEND);

boardPresenter.init(events);
