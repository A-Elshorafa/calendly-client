import pages from "@/constants/pages";
import { observer } from "mobx-react";
import React, { Component } from "react";
import messages from "@/constants/messages";
import { GetPendingEventDetails } from "@/apis";
import { AppointmentSelectionLayout } from "@/ui/Layouts";
import { ScreenContentNotFound } from "@/ui/components/actionComponents";

class AppointmentSelectionView extends Component
{
  constructor(props) {
    super(props);
    this.state = {
      notFoundContent: ''
    }
  }

  componentDidMount() {
    const {axios, query, router, eventStore, attendeeStore} = this.props;
    if (query && query.id) {
      eventStore.clearData();
      attendeeStore.clearData();
      const event_id = query.id;
      if (event_id) {
        GetPendingEventDetails(eventDetails => {
          if (eventDetails && eventDetails.is_subscribed === true) {
            this.setState({notFoundContent: messages.EVENT_SUBSCRIBED_BEFORE})
          } else {
            eventStore.setEventDetails(eventDetails.data)
          }
        },  errorCallback => {
          this.setState({notFoundContent: messages.ERROR_WHILE_FETCHING_EVENT});
        }, event_id, axios)
      }
    }

    router.beforePopState(({url}) => {
      if (url !== pages.APPOINTMENT_SELECTION && url !==  pages.ATTENDEE_DETAILS) {
        eventStore.clearData();
        router.replace(pages.EVENTS_DASHBORAD);
      }
      return true;
    })
  }

  // for refresh the page
  // on type the url forcefully on the browser
  componentDidUpdate(prevProps) {
    const {axios, query, eventStore} = this.props;
    if (prevProps.query !== query && query && query.id) {
      const event_id = query.id;
      if (event_id) {
        GetPendingEventDetails(eventDetails => {
          if (eventDetails && eventDetails.is_subscribed === true) {
            this.setState({notFoundContent: messages.EVENT_SUBSCRIBED_BEFORE})
          } else {
            eventStore.clearData();
            eventStore.setEventDetails(eventDetails.data)
          }
        }, errorCallback => {
          this.setState({notFoundContent: messages.ERROR_WHILE_FETCHING_EVENT});
        }, event_id, axios)
      }
    }
  }

  render() {
    const {notFoundContent} = this.state;
    const {router, eventStore} = this.props;
    return (
      notFoundContent !== ''?
        <ScreenContentNotFound
          message={notFoundContent}
          onClick={()=>router.back()}
        />
      :
        <AppointmentSelectionLayout
          eventAgenda={eventStore.agenda}
          hostName={eventStore.host?.name}
          meetingName={eventStore.eventName}
          duration={eventStore.selectedDuration.value}
          filteredDates={eventStore.selectedAvailableDatesAndTimes}
          onClickContinue={() => router.push(pages.ATTENDEE_DETAILS)}
          allowContinue={eventStore.selectedAvailableDateAndTime !== null}
          initialAppiontmentValue={eventStore.selectedAvailableDateAndTime}
          onSelectFilteredDates={value => eventStore.setSelectedAvailableDateAndTime(value)}
        />
    )
  }
}

export default observer(AppointmentSelectionView);