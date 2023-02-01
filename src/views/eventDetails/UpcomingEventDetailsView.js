import moment from "moment";
import { observer } from "mobx-react";
import pages from "@/constants/pages";
import React, { Component } from "react";
import messages from "@/constants/messages";
import { UpComingEventDetailsLayout } from "@/ui/Layouts";
import { GetUpcomingEventDetails, UpdateEventNotes } from "@/apis";
import { ScreenContentNotFound } from "@/ui/components/actionComponents";

class UpcomingEventDetailsView extends Component
{
  constructor(props) {
    super(props);

    this.state = {
      eventNotes: null,
      isLoading: false,
      modalMessage: "",
      pageNotAllowed: false
    }

    this.handleOnClickUpdate = this.handleOnClickUpdate.bind(this);
  }

  componentDidMount() { 
    const {axios, router, eventStore, attendeeStore} = this.props;
    const eventId = router.query.id;
    const {isLoading} = this.state;
    if (eventId && !isLoading) {
      this.setState({isLoading: true})
      GetUpcomingEventDetails(eventDetails => {
        eventStore.setEventDetails(eventDetails)
        if (eventDetails?.attendee) {
          attendeeStore.setFromResponse(eventDetails.attendee)
        }
        if (eventDetails?.notes) {
          this.setState({eventNotes: eventDetails.notes})
        }
        this.setState({isLoading: false})
      }, () => {
        this.setState({pageNotAllowed: true, isLoading: false})
      }, eventId, axios);
    }

    router.beforePopState(({url}) => {
      if (url !== pages.EVENT_DETAILS_UPCOMING(eventId)) {
        eventStore.clearData();
        router.replace(pages.EVENTS_DASHBORAD);
      }
      return true;
    })
  }

  componentDidUpdate(prevProps) { 
    const {axios, router, eventStore, attendeeStore} = this.props;
    if (prevProps.router.query !==  router.query && router.query.id) {
      const eventId = router.query.id;
      const {isLoading} = this.state;
      if (eventId && !isLoading) {
        this.setState({isLoading: true})
        GetUpcomingEventDetails(eventDetails => {
          eventStore.setEventDetails(eventDetails)
          if (eventDetails?.attendee) {
            attendeeStore.setFromResponse(eventDetails.attendee)
          }
          if (eventDetails?.notes) {
            this.setState({eventNotes: eventDetails.notes})
          }
          this.setState({isLoading: false})
        }, () => {
          this.setState({pageNotAllowed: true, isLoading: false})
        }, eventId, axios);
      }
    }
  }

  handleOnClickUpdate() {
    const {axios, router, eventStore} = this.props;
    const eventId = router.query.id;
    const {eventNotes} = this.state;
    this.setState({isLoading: true});
    UpdateEventNotes(response => {
      eventStore.setEventNotes(eventNotes)
      this.setState({
        isLoading: false,
        eventNotes: eventNotes,
        modalMessage: response?.message
      })
      setTimeout(() => {
        this.setState({modalMessage: ""})
      }, 1500)
    }, {event_id: eventId, notes: eventNotes}, axios)
  }

  render() {
    const {router} = this.props;
    const {name, email, notes} = this.props.attendeeStore;
    const {
      expireAt,
      createdAt,
      eventName,
      subscribedOn,
      thirdPartyName,
    } = this.props.eventStore;
    const {isLoading, modalMessage, eventNotes, pageNotAllowed} = this.state;
    return (
      pageNotAllowed?
        <ScreenContentNotFound 
          onClick={()=>router.back()} 
          message={messages.ERROR_WHILE_FETCHING_EVENT}
        />
      :
        <UpComingEventDetailsLayout
          attendeeName={name}
          eventName={eventName}
          attendeeNotes={notes}
          attendeeEmail={email}
          eventNotes={eventNotes}
          isScreenLoading={isLoading}
          modalMessage={modalMessage}
          thirdParityName={thirdPartyName}
          onClickUpdate={this.handleOnClickUpdate}
          allowUpdate={eventNotes !== this.props.eventStore.notes}
          onChangeNotes={notes => this.setState({eventNotes: notes})}
          appointmentTime={moment(subscribedOn, "DD-MM-YYYY kk:mm:ss").format('HH:mm')}
          createdAtDate={moment(createdAt, "DD-MM-YYYY kk:mm:ss").format('DD MMMM YYYY')}
          appointmentTimePlusDuration={moment(expireAt, "DD-MM-YYYY kk:mm:ss").format('HH:mm')}
          selectedAppointmentDate={moment(subscribedOn, "DD-MM-YYYY kk:mm:ss").format('dddd, DD MMMM YYYY')}
        />
    )
  }
}

export default observer(UpcomingEventDetailsView);