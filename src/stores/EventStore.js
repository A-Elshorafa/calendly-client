import { action, observable, makeObservable} from "mobx";

class EventStoreClass
{
  id = -1;
  host = "";
  agenda = "";
  eventName = "";
  calendlyUrl = "";
  hoursRangeTo = 17; // initial from 5 pm
  selectedDates = [];
  hoursRangeFrom = 9; // initial from 9 am
  thirdPartyName = "";
  thirdPartyLink = "";
  availableDatesAndTimes = [];
  selectedAvailableDateAndTime = null;
  selectedAvailableDatesAndTimes = [];
  selectedDuration = {value: 0, string: "Minutes"}; // todo: dynamic duration string

  setEventName = value => {
    this.eventName = value;
  };

  setHoursRangeTo = value => {
    this.hoursRangeTo = value;
  };

  setHoursRangeFrom = value => {
    this.hoursRangeFrom = value;
  };

  setCalendlyUrl = value => {
    this.calendlyUrl = value;
  };

  setSelectedDuration = value => {
    this.selectedDuration.value = value.value;
    this.selectedDuration.string = value.string;
  }
  
  setAvailableDatesAndTimes = values => {
    this.availableDatesAndTimes.splice(0, this.availableDatesAndTimes.length);

    values.forEach(element => {
      this.availableDatesAndTimes.push(element);
    });
  }
  
  setSelectedAvailableDateAndTime = value => {
    this.selectedAvailableDateAndTime = value;
  }

  setSelectedDates = actionObject => {
    const ACTIONS = {PUSH: 0, DEL: 1};
    const {value, elementIndex, ACTION} = actionObject
    if (this.selectedDates.length < 1 || elementIndex === -1) {
      this.selectedDates.push(value);
    } else if (ACTION === ACTIONS.PUSH) {
      this.selectedDates.splice(elementIndex, ACTION, value);
    } else {
      this.selectedDates.splice(elementIndex, ACTIONS.DEL);
      this.selectedAvailableDatesAndTimes.splice(elementIndex, ACTIONS.DEL);
    }
  };

  setEventDetails = eventDetails => {
    this.id = eventDetails.id;
    this.host = eventDetails.host;
    this.agenda = eventDetails.agenda;
    this.eventName = eventDetails.name;
    this.calendlyUrl = eventDetails.calendly_link;
    this.selectedDuration.value = eventDetails.duration;
    this.thirdPartyName = eventDetails.third_parity_name;
    this.thirdPartyLink = eventDetails.third_parity_link;
    this.availableDatesAndTimes = eventDetails.available_dates;
  }

  setSelectedAvailableDatesAndTimes = actionObject => {
    const ACTIONS = {PUSH: 0, DEL: 1};
    const {value, objectFounded, dateIndex, timeIndex, ACTION} = actionObject;
    if (ACTION === ACTIONS.DEL) {
      this.selectedAvailableDatesAndTimes[dateIndex]['times'].splice(timeIndex, ACTIONS.DEL);
    } else if (dateIndex !== -1 && objectFounded) {
      if (timeIndex === -1) {
        this.selectedAvailableDatesAndTimes[dateIndex]['times'].push(value);
      } else {
        this.selectedAvailableDatesAndTimes[dateIndex]['times'].splice(timeIndex, ACTIONS.PUSH, value);
      }
    } else if (dateIndex !== -1 && !objectFounded) {
      this.selectedAvailableDatesAndTimes.splice(dateIndex, ACTIONS.PUSH, value);
    }  else {
      this.selectedAvailableDatesAndTimes.push(value);
    }
  };

  clearData = () => {
    this.agenda = "";
    this.eventName = "";
    this.calendlyUrl = "";
    this.hoursRangeTo = 17;
    this.selectedDates = [];
    this.hoursRangeFrom = 9;
    this.availableDatesAndTimes = [];
    this.selectedAvailableDateAndTime = null;
    this.selectedAvailableDatesAndTimes = [];
    this.selectedDuration = {value: 0, string: "Minutes"};
  }

  constructor() {
    makeObservable(this, {
      id: observable,
      host: observable,
      agenda: observable,
      eventName: observable,
      calendlyUrl: observable,
      hoursRangeTo: observable,
      selectedDates: observable,
      hoursRangeFrom: observable,
      thirdPartyName: observable,
      thirdPartyLink: observable,
      selectedDuration: observable,
      availableDatesAndTimes: observable.deep,
      selectedAvailableDateAndTime: observable,
      selectedAvailableDatesAndTimes: observable.deep,
      clearData: action,
      setEventName: action,
      setCalendlyUrl: action,
      setEventDetails: action,
      setSelectedDates: action,
      setAvailableDatesAndTimes: action,
    });
  }
}

const EventStore = new EventStoreClass();
export default EventStore;