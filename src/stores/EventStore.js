import { action, observable, makeObservable} from "mobx";

class EventStoreClass
{
  id = -1;
  host = "";
  notes = "";
  agenda = "";
  expireAt = "";
  eventName = "";
  createdAt = "";
  calendlyLink = "";
  subscribedOn = "";
  hoursRangeTo = 17; // initial from 5 pm
  selectedDates = [];
  hoursRangeFrom = 9; // initial from 9 am
  thirdPartyName = "";
  thirdPartyLink = "";
  isSubscribed = false;
  availableDatesAndTimes = [];
  selectedAvailableDateAndTime = null;
  selectedAvailableDatesAndTimes = [];
  selectedDuration = {value: 0, string: "Minutes"}; // todo: dynamic duration string

  setEventName = value => {
    this.eventName = value;
  };

  setAgenda = value => {
    this.agenda = value;
  };

  setEventNotes = value => {
    this.notes = value;
  };

  setHoursRangeTo = value => {
    this.hoursRangeTo = value;
  };

  setHoursRangeFrom = value => {
    this.hoursRangeFrom = value;
  };

  setCalendlyLink = value => {
    this.calendlyLink = value;
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
      // remove selected times related to this date
      const dateIndex = this.selectedAvailableDatesAndTimes.findIndex(ele => ele && ele.date === value);
      if (dateIndex !== -1)
        this.selectedAvailableDatesAndTimes.splice(dateIndex, ACTIONS.DEL);
    }
  };

  setEventDetails = eventDetails => {
    this.id = eventDetails.id;
    this.host = eventDetails.host;
    this.notes = eventDetails.notes;
    this.agenda = eventDetails.agenda;
    this.eventName = eventDetails.name;
    this.expireAt = eventDetails.expire_at;
    this.createdAt = eventDetails.created_at;
    this.calendlyLink = eventDetails.calendly_link;
    this.isSubscribed = eventDetails.is_subscribed;
    this.subscribedOn = eventDetails.subscribed_on;
    this.selectedDuration.value = eventDetails.duration;
    this.thirdPartyName = eventDetails.third_party_name;
    this.thirdPartyLink = eventDetails.third_party_link;
    this.selectedAvailableDatesAndTimes = eventDetails.available_dates;
  }

  clearSelectedAvailableDatesAndTimes = () => {
    this.selectedAvailableDatesAndTimes.splice(0, this.selectedAvailableDatesAndTimes.length);
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
    this.id = -1;
    this.host = "";
    this.notes = "";
    this.agenda = "";
    this.expireAt = "";
    this.eventName = "";
    this.createdAt = "";
    this.calendlyLink = "";
    this.hoursRangeTo = 17;
    this.subscribedOn = "";
    this.selectedDates = [];
    this.hoursRangeFrom = 9;
    this.thirdPartyName = "";
    this.thirdPartyLink = "";
    this.isSubscribed = false;
    this.availableDatesAndTimes = [];
    this.selectedAvailableDateAndTime = null;
    this.selectedAvailableDatesAndTimes = [];
    this.selectedDuration = {value: 0, string: "Minutes"};
  }

  constructor() {
    makeObservable(this, {
      id: observable,
      host: observable,
      notes: observable,
      agenda: observable,
      expireAt: observable,
      eventName: observable,
      createdAt: observable,
      calendlyLink: observable,
      isSubscribed: observable,
      hoursRangeTo: observable,
      subscribedOn: observable,
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
      setCalendlyLink: action,
      setEventDetails: action,
      setSelectedDates: action,
      setAvailableDatesAndTimes: action,
      clearSelectedAvailableDatesAndTimes: action
    });
  }
}

const EventStore = new EventStoreClass();
export default EventStore;