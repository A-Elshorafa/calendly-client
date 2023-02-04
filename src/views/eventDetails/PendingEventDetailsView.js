import moment from "moment";
import pages from "@/constants/pages";
import { observer } from "mobx-react";
import React, { Component } from "react";
import { PendingEventDetailsLayout } from "@/ui/Layouts";
import { DeleteEvent, GetPendingEventDetails } from "@/apis";
import { ScreenContentNotFound } from "@/ui/components/actionComponents";

class PendingEventDetailsView extends Component
{
  constructor(props) {
    super(props);
    this.state = {
      modalType: "",
      isLoading: false,
      pageNotAllowed: false,
      deleteModalMessage: ""
    }

    this.handleDeleteEvent = this.handleDeleteEvent.bind(this);
    this.handleGoToDashboard = this.handleGoToDashboard.bind(this);
    this.handleCancelDeleteEventModal = this.handleCancelDeleteEventModal.bind(this);
    this.handleConfrimDeleteEventModal = this.handleConfrimDeleteEventModal.bind(this);
  }

  componentDidMount() { 
    const {axios, router, eventStore} = this.props;
    const eventId = router.query.id;
    if (eventId && eventStore.eventName === "") {
      this.setState({isLoading: true});
      GetPendingEventDetails(eventDetails => {
        if (eventDetails?.data?.id) {
          eventStore.setEventDetails(eventDetails.data)
        }
        this.setState({isLoading: false});
      }, errorCallback => {
        this.setState({pageNotAllowed: true, isLoading: false});
      }, eventId, axios);
    }

    router.beforePopState(({url}) => {
      if (url !== pages.EVENT_DETAILS_PENDING(eventId)) {
        eventStore.clearData();
        router.replace(pages.EVENTS_DASHBORAD);
      }
      return true;
    })
  }

  componentDidUpdate(prevProps) { 
    const {axios, router, eventStore} = this.props;
    if (prevProps.router.query !==  router.query && router.query.id) {
      const eventId = router.query.id;
      if (eventId && eventStore.eventName === "") {
        this.setState({isLoading: true});
        GetPendingEventDetails(eventDetails => {
          if (eventDetails?.data?.id) {
            eventStore.setEventDetails(eventDetails.data)
          }
          this.setState({isLoading: false});
        }, errorCallback => {
          this.setState({pageNotAllowed: true, isLoading: false});
        }, eventId, axios);
      }
    }
  }

  handleDeleteEvent(eventName) {
    this.setState({
      modalType: "warning",
      deleteModalMessage: `Are you sure you want to delete this event ${eventName}?`
    })
  }

  handleCancelDeleteEventModal() {
    this.setState({
      modalType: "",
      deleteModalMessage: ""
     })
  }

  handleConfrimDeleteEventModal() {
    const {axios, router} = this.props;
    const {id} = this.props.eventStore;

    DeleteEvent(response => {
      if (response) {
        this.setState({
          modalType: "after-deletion",
          deleteModalMessage: response.message
        });
      } else {
        this.setState({
          modalType: "after-deletion",
          deleteModalMessage: 'sorry an error occurred while delete the event'
        })
      }

      setTimeout(()=>{
        router.push(pages.EVENTS_DASHBORAD);
      }, 1000)
    }, id, axios);
  }

  handleGoToDashboard() {
    const {router, eventStore} = this.props;

    eventStore.clearData();
    router.replace(pages.EVENTS_DASHBORAD)
  }

  render() {
    const {
      agenda,
      expireAt,
      createdAt,
      eventName,
      calendlyLink,
      thirdPartyName,
      selectedAvailableDatesAndTimes,
    } = this.props.eventStore;
    const {router} = this.props;
    const {isLoading, pageNotAllowed, modalType, deleteModalMessage} = this.state;
    return (
      pageNotAllowed?
      <ScreenContentNotFound onClick={() => router.back()} message="Error while fetching this event please try again later"/> :
      <PendingEventDetailsLayout
        agenda={agenda}
        eventName={eventName}
        modalType={modalType}
        calendlyLink={calendlyLink}
        isScreenLoading={isLoading}
        thirdPartyName={thirdPartyName}
        deleteModalMessage={deleteModalMessage}
        onClickDeleteEvent={this.handleDeleteEvent}
        onClickBackToHome={this.handleGoToDashboard}
        onCancelDeleteModal={this.handleCancelDeleteEventModal}
        selectedAvailableTimes={selectedAvailableDatesAndTimes}
        onConfirmDeleteModal={this.handleConfrimDeleteEventModal}
        expiredAtDate={moment(expireAt).format("dddd, DD MMMM YYYY")}
        createdAtDate={moment(createdAt, "DD-MM-YYYY kk:mm:ss").format("dddd, DD MMMM YYYY")} // 27 JANUARY 2023
      />
    )
  }
}

export default observer(PendingEventDetailsView);