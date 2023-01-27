import UserStore from "./UserStore";
import EventStore from "./EventStore";
import AttendeeStore from "./AttendeeStore";

export default class RootStore
{
  constructor() {
    this.userStore = UserStore;
    this.eventStore = EventStore;
    this.attendeeStore = AttendeeStore;
  }
}