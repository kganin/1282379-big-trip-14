import { getRandomArrayElement, getRandomArray, getRandomInt } from '../utils/helpers';
import dayjs from 'dayjs';

const getType = () => {
  const types = [
    'Taxi',
    'Bus',
    'Train',
    'Ship',
    'Transport',
    'Drive',
    'Flight',
    'Check-in',
    'Sightseeing',
    'Restaurant',
  ];

  return getRandomArrayElement(types);
};

const getOffers = (type) => {
  const offers = {
    'Taxi': [
      {
        title: 'Taxi offer 1',
        price: 120,
      },
      {
        title: 'Taxi offer 2',
        price : 100,
      },
      {
        title: 'Taxi offer 3',
        price : 60,
      },
      {
        title: 'Taxi offer 4',
        price : 80,
      },
      {
        title: 'Taxi offer 5',
        price : 50,
      },
    ],
  };

  return getRandomArray((type === 'Taxi' ? offers[type] : []).map((offer) => {
    offer.isChecked = Boolean(getRandomInt(0, 1));
    return offer;
  }));

};

const getDestination = () => {
  const cities = [
    'Ryazan',
    'Moscow',
    'Riga',
    'London',
    'Istanbul',
  ];

  const descriptions = [
    'Lorem ipsum dolor sit amet, consectetur adipiscing elit.',
    'Cras aliquet varius magna, non porta ligula feugiat eget.',
    'Fusce tristique felis at fermentum pharetra.',
    'Aliquam id orci ut lectus varius viverra.',
    'Nullam nunc ex, convallis sed finibus eget, sollicitudin eget ante.',
  ];

  const city = getRandomArrayElement(cities);
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
    type: type,
    destination: getDestination(),
    offers: getOffers(type),
    dates: getDates(),
    price: getRandomInt(20, 100),
    isFavorite: Boolean(getRandomInt(0, 1)),
  };
};
