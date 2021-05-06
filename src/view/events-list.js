import Component from './component';

const createEventsListTemplate = () => {
  return `<ul class="trip-events__list">
  </ul>`;
};
export default class EventsList extends Component {
  getTemplate() {
    return createEventsListTemplate();
  }
}
