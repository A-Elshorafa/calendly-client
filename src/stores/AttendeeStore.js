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

  setFromResponse = data => {
    this.name = data.name;
    this.email = data.email;
    this.notes = data.notes;
  }

  clearData = () => {
    this.name = "";
    this.email = "";
    this.notes = "";
  }

  constructor() {
    makeObservable(this, {
      name: observable,
      email: observable,
      notes: observable,
      clearData: action,
      setFromResponse: action,
      setAttendeeName: action,
      setAttendeeEmail: action,
      setAttendeeNotes: action,
    });
  }
}

const AttendeeStore = new AttendeeStoreClass();
export default AttendeeStore;