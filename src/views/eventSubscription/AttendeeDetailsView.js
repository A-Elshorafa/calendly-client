import pages from "@/constants/pages";
import { observer } from "mobx-react";
import React, { Component } from "react";
import { SubscribeToEvent } from "@/apis";
import { AttendeeDetailsLayout } from "@/ui/Layouts";
import moment from "moment";

class AttendeeDetailsView extends Component
{
  constructor(props) {
    super(props);
    this.state = {
      modalType: '',
      validationErrors: [],
      isScreenLoading: false
    }
    this.validateInputs = this.validateInputs.bind(this);
    this.handleCancelModal = this.handleCancelModal.bind(this);
    this.handleConfirmModal = this.handleConfirmModal.bind(this);
    this.handleSubscribeEvent = this.handleSubscribeEvent.bind(this);
    this.handleChangeAttendeeName = this.handleChangeAttendeeName.bind(this);
    this.handleChangeAttendeeEmail = this.handleChangeAttendeeEmail.bind(this);
  }

  componentDidMount() {
    const {router, eventStore} = this.props;

    if (eventStore.selectedAvailableDateAndTime === null) {
      router.back()
    }
  }

  componentDidUpdate() {
    const {router, eventStore} = this.props;

    if (eventStore.selectedAvailableDateAndTime === null) {
      router.back()
    }
  }

  handleSubscribeEvent() {
    const {axios, router, eventStore, attendeeStore} = this.props;
    const {date, time} = eventStore.selectedAvailableDateAndTime;
    const utcValue = moment(`${date}T${time}+00:00`);
    const requestBody = {
      "event_id": eventStore.id,
      "name": attendeeStore.name,
      "email": attendeeStore.email,
      "notes": attendeeStore.notes,
      "subscribed_on": utcValue,
    };
    this.setState({isScreenLoading: true});
    
    SubscribeToEvent(response => {
      if (response.success) {
        // for successful subscription screen
        eventStore.setEventDetails(response.data)
        this.setState({modalType: 'success', isScreenLoading: false})
        
        setTimeout(()=>{
          this.setState({modalType: ''})
          router.push(pages.SUCCESSFUL_SUBSCRIPTION);
        }, 1500)
      
      } else {
        this.setState({isScreenLoading: false});
        this.setState({modalType: 'error'})
      }
    }, errorCallback => {
      this.setState({isScreenLoading: false});
      this.setState({modalType: 'error'})
    }, requestBody, eventStore.thirdPartyName, axios);
  }

  // validate name and email inputs
  validateInputs() {
    const {attendeeStore} = this.props;

    // email regex
    const emailRegEx = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/;
    if (attendeeStore.name === "" && !emailRegEx.test(attendeeStore.email)) {
      this.setState({validationErrors: {name: 'name is required', email: 'email is not valid'}})
    } else if (attendeeStore.name === "" && attendeeStore.email === "") {
      this.setState({validationErrors: {name: 'name is required', email: 'email is required'}})
    } else if (!emailRegEx.test(attendeeStore.email)) {
      this.setState({validationErrors: {email: 'email is is invalid'}})
    } else if (attendeeStore.email === "") {
      this.setState({validationErrors: {email: 'email is required'}})
    } else if (attendeeStore.name === "") {
      this.setState({validationErrors: {name: 'name is required'}})
    } else {
      this.handleSubscribeEvent();
    }
  }

  // remove errors on change the name input
  handleChangeAttendeeName(name) {
    const {attendeeStore} = this.props;

    if (this.state.validationErrors.name) {
      delete this.state.validationErrors.name;
    }
    attendeeStore.setAttendeeName(name)
  }

  // remove errors on change the email input
  handleChangeAttendeeEmail(email) {
    const {attendeeStore} = this.props;

    if (this.state.validationErrors.email) {
      delete this.state.validationErrors.email;
    }
    attendeeStore.setAttendeeEmail(email)
  }

  handleCancelModal() {
    const {router, eventStore, attendeeStore} = this.props;
    router.replace(pages.EVENTS_DASHBORAD);
    setTimeout(() => {
      eventStore.clearData();
      attendeeStore.clearData();
    },100)
  }

  handleConfirmModal() {
    const {router, eventStore, attendeeStore} = this.props;
    router.back();
    eventStore.clearData();
    attendeeStore.clearData();
  }

  render() {
    const {
      host,
      agenda,
      eventName,
      selectedDuration,
      selectedAvailableDateAndTime
    } = this.props.eventStore;
    const {
      name,
      email,
      setAttendeeNotes
    } = this.props.attendeeStore;
    const {
      modalType,
      isScreenLoading,
      validationErrors
    } = this.state;
    return (
      <AttendeeDetailsLayout
        attendeeName={name}
        eventAgenda={agenda}
        attendeeEmail={email}
        hostName={host?.name}
        eventName={eventName}
        modalType={modalType}
        allowContinue={name && email}
        isScreenLoading={isScreenLoading}
        duration={selectedDuration?.value}
        validationErrors={validationErrors}
        onClickContinue={this.validateInputs}
        onCancelModal={this.handleCancelModal}
        onConfirmModal={this.handleConfirmModal}
        durationString={selectedDuration?.string}
        onChangeNotes={notes => setAttendeeNotes(notes)}
        selectedAppointmentDate={selectedAvailableDateAndTime?.date}
        selectedAppointmentTime={selectedAvailableDateAndTime?.time}
        onChangeGuestName={name => this.handleChangeAttendeeName(name)}
        onChangeGuestEmail={email => this.handleChangeAttendeeEmail(email)}
        // authorizationLink="http://localhost:3000" todo: link autorization
      />
    )
  }
}

export default observer(AttendeeDetailsView);