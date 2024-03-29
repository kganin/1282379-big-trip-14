import dayjs from 'dayjs';
import { getDuration } from '../utils/event';
import Component from './component';

const createEventOfferTemplate = ({title, price}) => {
  return `
    <li class="event__offer">
      <span class="event__offer-title">${title}</span>
      &plus;&euro;&nbsp;
      <span class="event__offer-price">${price}</span>
    </li>
  `;
};

const createEventTemplate = ({type, destination, offers, price, dates, isFavorite}) => {
  return `<li class="trip-events__item">
  <div class="event">
    <time class="event__date" datetime="${dayjs(dates[0]).format('YYYY-MM-DD')}">${dayjs(dates[0]).format('MMM DD').toUpperCase()}</time>
    <div class="event__type">
      <img class="event__type-icon" width="42" height="42" src="img/icons/${type.toLowerCase()}.png" alt="Event type icon">
    </div>
    <h3 class="event__title">${type} ${destination.city}</h3>
    <div class="event__schedule">
      <p class="event__time">
        <time class="event__start-time" datetime="${dayjs(dates[0]).format('YYYY-MM-DD')}">${dayjs(dates[0]).format('HH:mm')}</time>
        &mdash;
        <time class="event__end-time" datetime="${dayjs(dates[1]).format('YYYY-MM-DD')}">${dayjs(dates[1]).format('HH:mm')}</time>
      </p>
      <p class="event__duration">${getDuration(dates[0], dates[1])}</p>
    </div>
    <p class="event__price">
      &euro;&nbsp;<span class="event__price-value">${price}</span>
    </p>
    <h4 class="visually-hidden">Offers:</h4>
    <ul class="event__selected-offers">
     ${offers.map(createEventOfferTemplate).join('')}
    </ul>
    <button class="event__favorite-btn ${ isFavorite ? 'event__favorite-btn--active' : '' }" type="button">
      <span class="visually-hidden">Add to favorite</span>
      <svg class="event__favorite-icon" width="28" height="28" viewBox="0 0 28 28">
        <path d="M14 21l-8.22899 4.3262 1.57159-9.1631L.685209 9.67376 9.8855 8.33688 14 0l4.1145 8.33688 9.2003 1.33688-6.6574 6.48934 1.5716 9.1631L14 21z"/>
      </svg>
    </button>
    <button class="event__rollup-btn" type="button">
      <span class="visually-hidden">Open event</span>
    </button>
  </div>
</li>`;
};

export default class Event extends Component {
  constructor(event) {
    super();
    this._event = event;

    this._rollupButtonClickHandler = this._rollupButtonClickHandler.bind(this);
    this._favoriteClickHandler = this._favoriteClickHandler.bind(this);
  }

  getTemplate() {
    return createEventTemplate(this._event);
  }

  _favoriteClickHandler(evt) {
    evt.preventDefault();
    this._callback.favoriteClick();
  }

  _rollupButtonClickHandler(evt) {
    evt.preventDefault();
    this._callback.buttonClick();
  }

  setRollupButtonClickHandler(callback) {
    this._callback.buttonClick = callback;
    this.getElement().querySelector('.event__rollup-btn').addEventListener('click', this._rollupButtonClickHandler);
  }

  setFavoriteClickHandler(callback) {
    this._callback.favoriteClick = callback;
    this.getElement().querySelector('.event__favorite-btn').addEventListener('click', this._favoriteClickHandler);
  }
}
