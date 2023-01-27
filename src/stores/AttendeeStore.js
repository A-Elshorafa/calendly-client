import { observable, makeObservable, action } from "mobx";

class AttendeeStoreClass
{
  name = "";
  email = "";
  notes = "";

  setAttendeeName = name => {
    this.name = name;
  }

  setAttendeeEmail = email => {
    this.email = email;
  }

  setAttendeeNotes = notes => {
    this.notes = notes;
  }

  constructor() {
    makeObservable(this, {
      name: observable,
      email: observable,
      notes: observable,
      setAttendeeName: action,
      setAttendeeEmail: action,
      setAttendeeNotes: action
    });
  }
}

const AttendeeStore = new AttendeeStoreClass();
export default AttendeeStore;