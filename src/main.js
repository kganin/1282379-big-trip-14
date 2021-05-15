
import SiteMenu from './view/site-menu';
import TripFilters from './view/trip-filters';
import BoardPresenter from './presenter/board';

import { render, RenderPosition } from './utils/render';
import { generateFilter } from './mock/filter';
import { getEvent } from './mock/mock';

const EVENTS_COUNT = 10;

const events = new Array(EVENTS_COUNT).fill().map(getEvent).sort((a, b) => Date.parse(a.dates[0]) - Date.parse(b.dates[0]));
const filters = generateFilter(events);

const siteMenuContainer = document.querySelector('.trip-controls__navigation');
const tripInfoContainer = document.querySelector('.trip-main');
const tripFiltersContainer = document.querySelector('.trip-controls__filters');
const tripEventsContainer = document.querySelector('.trip-events');

const boardPresenter = new BoardPresenter(tripEventsContainer, tripInfoContainer);

render(siteMenuContainer, new SiteMenu(), RenderPosition.BEFOREEND);
render(tripFiltersContainer, new TripFilters(filters), RenderPosition.BEFOREEND);

boardPresenter.init(events);
