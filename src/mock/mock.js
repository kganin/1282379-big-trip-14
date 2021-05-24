import { getRandomArrayElement, getRandomArray, getRandomInt } from '../utils/helpers';
import dayjs from 'dayjs';
import { nanoid } from 'nanoid';
import { CITIES, TYPES, Offers } from '../const';

const EVENTS_COUNT = 5;

const getType = () => {
  return getRandomArrayElement(TYPES);
};

export const getOffers = (type) => {
  return getRandomArray((type === 'Taxi' ? Offers[type] : []));
};

const getCity = () => getRandomArrayElement(CITIES);

export const getDestination = (city = getCity()) => {

  const descriptions = [
    'Lorem ipsum dolor sit amet, consectetur adipiscing elit.',
    'Cras aliquet varius magna, non porta ligula feugiat eget.',
    'Fusce tristique felis at fermentum pharetra.',
    'Aliquam id orci ut lectus varius viverra.',
    'Nullam nunc ex, convallis sed finibus eget, sollicitudin eget ante.',
  ];

  const description = getRandomArray(descriptions).join(' ');

  return {
    city: city,
    photos: new Array(getRandomInt(0, 5)).fill().map(() => {
      return {
        src: `http://picsum.photos/248/152?r=${Math.random()}`,
        alt: city,
      };
    }),
    description: description,
  };
};

const getDates = () => {
  const Gap = {
    days: 2,
    hours: 6,
    mins: 30,
  };

  const dates = [];

  const initDate = dayjs().add(getRandomInt(-Gap.days, Gap.days), 'd').toDate();

  for (let i = 0; i < 2; i++) {
    const date = dayjs(initDate).add(getRandomInt(-Gap.hours, Gap.hours), 'h').add(getRandomInt(-Gap.mins, Gap.mins), 'm');
    dates.push(date);
  }

  return dates.sort((a, b) => a - b).map((date) => date.toDate());
};

export const getEvent = () => {
  const type = getType();

  return {
    id: nanoid(),
    type: type,
    destination: getDestination(),
    offers: getOffers(type),
    dates: getDates(),
    price: getRandomInt(20, 100),
    isFavorite: Boolean(getRandomInt(0, 1)),
  };
};

export const getEvents = () => {
  return new Array(EVENTS_COUNT)
    .fill()
    .map(getEvent);
};

