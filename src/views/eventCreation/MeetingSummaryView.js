import React, { Component } from "react";
import { MeetingSummaryLayout } from "@/ui/Layouts";
import { observer } from "mobx-react";
import { CreateNewEvent } from "@/apis";

class MeetingSummaryView extends Component
{
  constructor(props) {
    super(props);
    this.handleSubmit = this.handleSubmit.bind(this);
  }

  componentDidMount() {
    const {router, userStore} = this.props;
    if (userStore.id === "") {
      router.replace('/events-dashboard');
    }
  }

  handleSubmit() {
    const {userStore, eventStore, router, axios} = this.props;
    const submitParams = {
      user_id: userStore.id,
      third_party_name: "zoom",
      name: eventStore.eventName,
      customized_url: eventStore.calendlyUrl,
      duration: eventStore.selectedDuration.value,
      available_dates_times: eventStore.selectedAvailableDatesAndTimes,
    }
    CreateNewEvent(submitParams, calendlyLink => {
      eventStore.setCalendlyUrl(calendlyLink);
      router.push('successful-creation');
    }, axios)
  }

  render() {
    const {userStore, eventStore} = this.props;
    return (
      <MeetingSummaryLayout
        userName={userStore.name}
        onClickContinue={this.handleSubmit}
        duration={eventStore.selectedDuration.value}
        numberOfDays={eventStore.selectedDates.length}
        allowContinue={eventStore.onChangeMeetingName!==""}
        onChangeMeetingAgenda={value => {eventStore.agenda = value}}
        onChangeCustomUrl={value => {eventStore.calendlyUrl = value}}
        onChangeMeetingName={value => {eventStore.setEventName(value)}}
        numberOfTimes={eventStore.selectedAvailableDatesAndTimes.length}
      />
    )
  }
}

export default observer(MeetingSummaryView);