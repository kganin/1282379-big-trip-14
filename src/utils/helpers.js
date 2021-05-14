export const getRandomInt = (min, max) => {
  min = Math.ceil(min);
  max = Math.floor(max);
  return Math.floor(Math.random() * (max - min + 1) + min);
};

export const shuffleArray = (elements) => {
  const clonedElements = elements.slice(0);
  for (let i = clonedElements.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    const swap = clonedElements[i];
    clonedElements[i] = clonedElements[j];
    clonedElements[j] = swap;
  }
  return clonedElements;
};

export const getRandomArray = (elements) => shuffleArray(elements).slice(getRandomInt(0, elements.length));

export const getRandomArrayElement = (elements) => elements[getRandomInt(0, elements.length - 1)];

export const updateElement = (elements, update) => {
  const index = elements.findIndex((element) => element.id === update.id);

  if (index === -1) {
    return elements;
  }

  return [
    ...elements.slice(0, index),
    update,
    ...elements.slice(index + 1),
  ];
};
