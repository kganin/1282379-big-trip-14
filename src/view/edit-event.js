import dayjs from 'dayjs';
import flatpickr from 'flatpickr';
import Smart from './smart';
import { getDestination } from '../mock/mock';
import { CITIES, TYPES, Offers } from '../const';
import '../../node_modules/flatpickr/dist/flatpickr.min.css';

const BLANK_EVENT = {
  destination: {
    name: '',
    description: '',
    pictures: [],
  },
  price: '',
  dates: [
    dayjs(),
    dayjs(),
  ],
  type: 'taxi',
  offers: [],
};

const createEditEventOffersTemplate = (currentType, offers) => {

  let typeOffers = [];

  if (currentType === 'Taxi') {
    typeOffers = Offers[currentType];
  }

  if (typeOffers.length > 0) {
    const generateOffers = () => {
      return typeOffers.map(({title, price}) => {
        const isChecked = offers.some((offer) => offer.title === title) ? 'checked' : '';

        return `<div class="event__offer-selector">
          <input class="event__offer-checkbox  visually-hidden" id="event-offer-${title.replaceAll(' ', '-').toLowerCase()}-1" type="checkbox" name="event-offer-${title.replaceAll(' ', '-').toLowerCase()}"${isChecked ? 'checked' : ''}>
          <label class="event__offer-label" for="event-offer-${title.replaceAll(' ', '-').toLowerCase()}-1">
            <span class="event__offer-title">${title}</span>
            &plus;&euro;&nbsp;
            <span class="event__offer-price">${price}</span>
          </label>
        </div>
        `;
      }).join('');
    };

    return `<section class="event__section  event__section--offers">
      <h3 class="event__section-title  event__section-title--offers">Offers</h3>
      <div class="event__available-offers">
        ${generateOffers()}
      </div>
    </section>`;
  }

  return '';
};

const createEventPhotoTemplate = (photo) => {
  return `<img class="event__photo" src="${photo.src}" alt="${photo.alt}">`;
};

const createEditEventPhotosListTemplate = (destination) => {
  return `
    <h3 class="event__section-title  event__section-title--destination">Destination</h3>
    <p class="event__destination-description">${destination.description}</p>
    <div class="event__photos-container">
      <div class="event__photos-tape">
        ${destination.photos.map(createEventPhotoTemplate).join('')}
      </div>
    </div>
    `;
};

const createEditEventTypeTemplate = (currentType) => {
  return TYPES.map((type) => {
    return `<div class="event__type-item">
      <input id="event-type-${type.toLowerCase()}-1" class="event__type-input  visually-hidden" type="radio" name="event-type" value="${type.toLowerCase()}" ${type === currentType ? 'checked' : ''}>
      <label class="event__type-label  event__type-label--${type.toLowerCase()}" for="event-type-${type.toLowerCase()}-1">${type}</label>
    </div>`;
  }).join('');
};

const createDestinationTemplate = (cities) => {
  return cities.map((city) => `<option value="${city}"></option>`).join('');
};

const createEditEventTemplate = ({type, destination, offers, price, dates, isDescriptionExist, isOffersExist, isPhotosExist}) => {
  return `<li class="trip-events__item">
  <form class="event event--edit" action="#" method="post">
    <header class="event__header">
      <div class="event__type-wrapper">
        <label class="event__type  event__type-btn" for="event-type-toggle-1">
          <span class="visually-hidden">Choose event type</span>
          <img class="event__type-icon" width="17" height="17" src="img/icons/${type.toLowerCase()}.png" alt="Event type icon">
        </label>
        <input class="event__type-toggle  visually-hidden" id="event-type-toggle-1" type="checkbox">

        <div class="event__type-list">
          <fieldset class="event__type-group">
            <legend class="visually-hidden">Event type</legend>
            ${createEditEventTypeTemplate(type)}
          </fieldset>
        </div>
      </div>

      <div class="event__field-group  event__field-group--destination">
        <label class="event__label  event__type-output" for="event-destination-1">
          ${type}
        </label>
        <input class="event__input  event__input--destination" id="event-destination-1" type="text" name="event-destination" value="${destination.city}" list="destination-list-1">
        <datalist id="destination-list-1">
        ${createDestinationTemplate(CITIES)}
        </datalist>
      </div>

      <div class="event__field-group  event__field-group--time">
        <label class="visually-hidden" for="event-start-time-1">From</label>
        <input class="event__input  event__input--time" id="event-start-time-1" type="text" name="event-start-time" value="${dayjs(dates[0]).format('YY/MM/DD HH:mm')}">
        &mdash;
        <label class="visually-hidden" for="event-end-time-1">To</label>
        <input class="event__input  event__input--time" id="event-end-time-1" type="text" name="event-end-time" value="${dayjs(dates[1]).format('YY/MM/DD HH:mm')}">
      </div>

      <div class="event__field-group  event__field-group--price">
        <label class="event__label" for="event-price-1">
          <span class="visually-hidden">Price</span>
          &euro;
        </label>
        <input class="event__input  event__input--price" id="event-price-1" type="text" name="event-price" value="${price}">
      </div>

      <button class="event__save-btn  btn  btn--blue" type="submit">Save</button>
      <button class="event__reset-btn" type="reset">Delete</button>
      <button class="event__rollup-btn" type="button">
        <span class="visually-hidden">Open event</span>
      </button>
    </header>
      ${isDescriptionExist || isPhotosExist || isOffersExist ? `<section class="event__details">
      ${createEditEventOffersTemplate(type, offers)}
      ${isDescriptionExist || isPhotosExist ? `<section class="event__section  event__section--destination">
      ${createEditEventPhotosListTemplate(destination)}
    </section>` : ''}
  </section>` : ''}
  </form>
</li>`;
};

export default class EditEvent extends Smart {
  constructor(event = BLANK_EVENT) {
    super();
    this._data = EditEvent.parseEventToData(event);
    this._startDatepicker = null;
    this._endDatepicker = null;

    this._formSubmitHandler = this._formSubmitHandler.bind(this);
    this._rollupButtonClickHandler = this._rollupButtonClickHandler.bind(this);
    this._eventTypeToggleHandler = this._eventTypeToggleHandler.bind(this);
    this._destinationToggleHandler = this._destinationToggleHandler.bind(this);
    this._offerToggleHandler = this._offerToggleHandler.bind(this);
    this._startDateChangeHandler = this._startDateChangeHandler.bind(this);
    this._endDateChangeHandler = this._endDateChangeHandler.bind(this);

    this._setInnerHandlers();
  }

  reset(event) {
    this.updateData(
      EditEvent.parseEventToData(event),
    );
  }

  getTemplate() {
    return createEditEventTemplate(this._data);
  }

  restoreHandlers() {
    this._setInnerHandlers();
    this.setDatepickers();
    this.setFormSubmitHandler(this._callback.formSubmit);
    this.setRollupButtonClickHandler(this._callback.rollupButtonClick);
  }

  _eventTypeToggleHandler(evt) {
    evt.preventDefault();

    if (evt.target.tagName !== 'INPUT') {
      return;
    }

    this.updateData({
      type: evt.target.value,
      offers: [],
    });
  }

  _destinationToggleHandler(evt) {
    evt.preventDefault();

    if (!CITIES.includes(evt.target.value)) {
      return;
    }

    const destination = getDestination(evt.target.value);
    this.updateData({
      destination,
    });
  }

  _offerToggleHandler(evt) {
    evt.preventDefault();

    if (evt.target.tagName !== 'INPUT') {
      return;
    }

    const offerTitle = evt.target.closest('.event__offer-selector').querySelector('.event__offer-title').textContent;
    let offers = this._data.offers.slice();

    if (this._data.offers.some((offer) => offer.title === offerTitle)) {
      const checkedOffer = this._data.offers.find((offer) => offer.title === offerTitle);
      offers = offers.filter((offer) => offer !== checkedOffer);
    } else {
      const checkedOffer = Offers[this._data.type].find((offer) => offer.title === offerTitle);
      offers.push(checkedOffer);
    }

    this.updateData({
      offers,
    }, true);
  }

  _formSubmitHandler(evt) {
    evt.preventDefault();
    this.removeDatepickers();
    this._callback.formSubmit(EditEvent.parseDataToEvent(this._data));
  }

  _rollupButtonClickHandler(evt) {
    evt.preventDefault();
    this._callback.rollupButtonClick();
  }

  _setInnerHandlers() {
    this.getElement().querySelector('.event__type-group').addEventListener('change', this._eventTypeToggleHandler);
    this.getElement().querySelector('.event__input--destination').addEventListener('change', this._destinationToggleHandler);

    const offersContainer = this.getElement().querySelector('.event__available-offers');
    if (offersContainer) {
      offersContainer.addEventListener('change', this._offerToggleHandler);
    }
  }

  _startDateChangeHandler([userDate]) {
    this.updateData({
      dates: [userDate, this._data.dates[1]],
    }, true);
  }

  _endDateChangeHandler([userDate]) {
    this.updateData({
      dates: [this._data.dates[0], userDate],
    }, true);
  }

  setDatepickers() {
    if (this._startDatepicker) {
      this._startDatepicker.destroy();
      this._startDatepicker = null;
    }

    this._startDatepicker = flatpickr(
      this.getElement().querySelector('#event-start-time-1'),
      {
        dateFormat: 'd/m/y H:i',
        defaultDate: this._data.dates[0],
        maxDate: this._data.dates[1],
        enableTime: true,
        time_24hr: true,
        onClose: this._startDateChangeHandler,
      },
    );

    if (this._endDatepicker) {
      this._endDatepicker.destroy();
      this._endDatepicker = null;
    }

    this._endDatepicker = flatpickr(
      this.getElement().querySelector('#event-end-time-1'),
      {
        dateFormat: 'd/m/y H:i',
        defaultDate: this._data.dates[1],
        minDate: this._data.dates[0],
        enableTime: true,
        time_24hr: true,
        onClose: this._endDateChangeHandler,
      },
    );
  }

  removeDatepickers() {
    if (this._startDatepicker) {
      this._startDatepicker.destroy();
      this._startDatepicker = null;
    }
    if (this._endDatepicker) {
      this._endDatepicker.destroy();
      this._endDatepicker = null;
    }
  }

  setFormSubmitHandler(callback) {
    this._callback.formSubmit = callback;
    this.getElement().querySelector('.event--edit').addEventListener('submit', this._formSubmitHandler);
  }

  setRollupButtonClickHandler(callback) {
    this._callback.rollupButtonClick = callback;
    this.getElement().querySelector('.event__rollup-btn').addEventListener('click', this._rollupButtonClickHandler);
  }

  static parseEventToData(event) {
    return Object.assign(
      {},
      event,
      {
        isDescriptionExist: (event.destination.description).length > 0,
        isPicturesExist: (event.destination.photos).length > 0,
        isOffersExist: (event.offers).length > 0,
      },
    );
  }

  static parseDataToEvent(data) {
    data = Object.assign(
      {},
      data,
    );

    delete data.isDescriptionExist;
    delete data.isPhotosExist;
    delete data.isOffersExist;

    return data;
  }
}
