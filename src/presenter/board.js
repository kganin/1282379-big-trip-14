import { updateElement } from '../utils/helpers';
import {render, RenderPosition } from '../utils/render';
import {sortEventsByTime, sortEventsByPrice} from '../utils/event';
import {SortType} from '../const';

import EventsList from '../view/events-list';
import EventsSort from '../view/events-sort';
import NoEvent from '../view/no-event';
import TripInfo from '../view/trip-info';
import EventPresenter from './event';

export default class BoardPresenter {
  constructor(eventsContainer, tripInfoContainer) {
    this._eventsContainer = eventsContainer;
    this._tripInfoContainer = tripInfoContainer;
    this._eventPresenter = {};
    this._currentSortType = SortType.DAY;

    this._tripInfoComponent = null;
    this._sortComponent = new EventsSort();
    this._eventsListComponent = new EventsList();
    this._noEventsComponent = new NoEvent();

    this._handleEventChange = this._handleEventChange.bind(this);
    this._handleModeChange = this._handleModeChange.bind(this);
    this._handleSortTypeChange = this._handleSortTypeChange.bind(this);
  }

  init(events) {
    this._events = events.slice();
    this._sourceEvents = events.slice();
    this._renderBoard();
  }

  _handleSortTypeChange(sortType) {
    if (this._currentSortType === sortType) {
      return;
    }

    this._sortEvents(sortType);
    this._clearEvents();
    this._renderEvents();
  }

  _handleModeChange() {
    Object
      .values(this._eventPresenter)
      .forEach((presenter) => presenter.resetView());
  }

  _handleEventChange(updatedEvent) {
    this._events = updateElement(this._events, updatedEvent);
    this._sourceEvents = updateElement(this._sourceEvents, updatedEvent);
    this._eventPresenter[updatedEvent.id].init(updatedEvent);
  }
  _sortEvents(sortType) {
    switch (sortType) {
      case SortType.TIME:
        this._events = this._sourceEvents.slice().sort(sortEventsByTime);
        break;
      case SortType.PRICE:
        this._events = this._sourceEvents.slice().sort(sortEventsByPrice);
        break;
      default:
        this._events = this._sourceEvents.slice();
        break;
    }

    this._currentSortType = sortType;
  }

  _renderTripInfo() {
    this._tripInfoComponent = new TripInfo(this._events);
    render(this._tripInfoContainer, this._tripInfoComponent, RenderPosition.AFTERBEGIN);
  }

  _renderSort() {
    render(this._eventsContainer, this._sortComponent, RenderPosition.BEFOREEND);
    this._sortComponent.setSortTypeChangeHandler(this._handleSortTypeChange);
  }

  _renderEventList() {
    render(this._eventsContainer, this._eventsListComponent, RenderPosition.BEFOREEND);
  }

  _clearEvents() {
    Object
      .values(this._eventPresenter)
      .forEach((presenter) => presenter.destroy());
    this._eventPresenter = {};
  }

  _renderNoEvents() {
    render(this._eventsContainer, this._noEventsComponent, RenderPosition.BEFOREEND);
  }

  _renderEvent(event) {
    const eventPresenter = new EventPresenter(this._eventsListComponent, this._handleEventChange, this._handleModeChange);
    eventPresenter.init(event);
    this._eventPresenter[event.id] = eventPresenter;
  }

  _renderEvents() {
    for (let i = 0; i < this._events.length; i++) {
      this._renderEvent(this._events[i]);
    }
  }

  _renderBoard() {
    if (this._events.length === 0) {
      this._renderNoEvents();
    } else {
      this._renderTripInfo();
      this._renderSort();
      this._renderEventList();
      this._renderEvents();
    }
  }
}
