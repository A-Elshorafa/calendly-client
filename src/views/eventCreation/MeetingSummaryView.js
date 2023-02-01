import pages from "@/constants/pages";
import { observer } from "mobx-react";
import { CreateNewEvent } from "@/apis";
import React, { Component } from "react";
import { MeetingSummaryLayout } from "@/ui/Layouts";

class MeetingSummaryView extends Component
{
  constructor(props) {
    super(props);
    this.state= {
      modalType: '',
      validationErrors: [],
      isScreenLoading: false
    }

    this.handleSubmit = this.handleSubmit.bind(this);
    this.validateInputs = this.validateInputs.bind(this);
    this.handleOnCancelModal = this.handleOnCancelModal.bind(this);
    this.handleOnConfirmModal = this.handleOnConfirmModal.bind(this);
    this.handleOnChangeEventName = this.handleOnChangeEventName.bind(this);
  }

  componentDidMount() {
    const {router, userStore} = this.props;
    if (userStore.id === -1) {
      router.replace('/events-dashboard');
    }
  }

  handleSubmit() {
    const {userStore, eventStore, router, axios} = this.props;
    this.setState({isScreenLoading: true})
    const submitParams = {
      user_id: userStore.id,
      third_party_name: "zoom",
      agenda: eventStore.agenda,
      name: eventStore.eventName,
      customized_url: eventStore.calendlyLink,
      duration: eventStore.selectedDuration.value,
      available_dates_times: eventStore.selectedAvailableDatesAndTimes,
    }
    CreateNewEvent(calendlyLink => {
      this.setState({isScreenLoading: false, modalType: 'success'})
      setTimeout(() => {
        this.setState({modalType: ''})
        router.push('successful-creation');
        eventStore.setCalendlyLink(calendlyLink);
      }, 1500)
    }, errors => {
      // show errors if there's input errors else will show modal error
      if (errors) {
        this.setState({validationErrors: errors});
      } else {
        this.setState({modalType: 'error'});
      }
      this.setState({isScreenLoading: false})
    },submitParams, axios)
  }

  handleOnConfirmModal() {
    const {router, eventStore} = this.props;
    eventStore.clearData();
    router.back();
  }

  handleOnCancelModal() {
    const {router, eventStore} = this.props;
    eventStore.clearData();
    router.push(pages.EVENTS_DASHBORAD);
  }

  handleOnChangeEventName(name) {
    const {eventStore} = this.props;
    const {validationErrors} = this.state;
    if (validationErrors?.name) {
      delete validationErrors.name;
    }
    eventStore.setEventName(name)
    eventStore.setCalendlyLink(name)
  }

  getSelectedNumberOfTimes() {
    const {eventStore} = this.props;
    let dateCounter = 0;
    let timesCounter = 0;
    if (eventStore.selectedAvailableDatesAndTimes.length > 0)
      eventStore.selectedAvailableDatesAndTimes.forEach(element => {
        if (element['times']) {
          dateCounter++;
          timesCounter += element['times'].length;
        }
      });
    return {date: dateCounter, times: timesCounter};
  }

  validateInputs() {
    const {eventStore} = this.props;
    if (eventStore.eventName === "") {
      this.setState({validationErrors: {name: "The name field is required."}})
    } else {
      this.handleSubmit()
    }
  }

  render() {
    const {userStore, eventStore} = this.props;
    const {date, times} = this.getSelectedNumberOfTimes();
    const {validationErrors, isScreenLoading} = this.state;
    return (
      <MeetingSummaryLayout
        numberOfDays={date}
        numberOfTimes={times}
        userName={userStore.name}
        eventName={eventStore.eventName}
        modalType={this.state.modalType}
        isScreenLoading={isScreenLoading}
        validationErrors={validationErrors}
        onClickContinue={this.validateInputs}
        calendlyLink={eventStore.calendlyLink}
        onCancelModal={this.handleOnCancelModal}
        onConfirmModal={this.handleOnConfirmModal}
        allowContinue={eventStore.eventName !== ""}
        duration={eventStore.selectedDuration.value}
        onChangeMeetingName={this.handleOnChangeEventName}
        onChangeMeetingAgenda={value => {eventStore.setAgenda(value)}}
        onChangeCustomUrl={value => {eventStore.setCalendlyLink(value)}}
      />
    )
  }
}

export default observer(MeetingSummaryView);