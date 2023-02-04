import pages from "@/constants/pages";
import { observer } from "mobx-react";
import React, { Component } from "react";
import { EventsDashboardLayout } from "@/ui/Layouts";
import { GetPendingUserEvents, GetUpComingUserEvents, GetAuthUserInfo, Logout, DeleteEvent } from "@/apis";
import moment from "moment";

const EVENT_STATUSES = {
  UP_COMING: 0,
  PENDING: 1
};

class EventsDashboardView extends Component {
  constructor(props) {
    super(props);
    this.state = {
      modalType: "",
      pendingEvents: null,
      upComingEvents: null,
      isEventsLoading: true,
      eventIdToDelete: null,
      isScreenLoading: false,
      deleteModalMessage: '',
      areEventsNotFound: false,
      selectedEventStatus: null
    }

    this.handleLogout = this.handleLogout.bind(this);
    this.handleDeleteEvent = this.handleDeleteEvent.bind(this);
    this.handleCreateNewEvent = this.handleCreateNewEvent.bind(this);
    this.handleEventStateSelection = this.handleEventStateSelection.bind(this);
    this.handleCancelDeleteEventModal = this.handleCancelDeleteEventModal.bind(this);
    this.handleConfrimDeleteEventModal = this.handleConfrimDeleteEventModal.bind(this);
  }

  componentDidMount() {
    const {axios, userStore} = this.props;
    const {isScreenLoading} = this.state;
    if (userStore.id === -1 && !isScreenLoading) {
      this.setState({isScreenLoading: true});
      GetAuthUserInfo(userInfo => {
        userStore.updateUserInfo(userInfo)
        this.getUpComingEvents(userInfo.id);
        this.setState({isScreenLoading: false});
      }, axios)
    } else if (userStore.id !== -1) {
      this.handleEventStateSelection(EVENT_STATUSES.UP_COMING)
    }
  }

  componentDidUpdate() {
    const {isScreenLoading} = this.state;
    const {axios, userStore} = this.props;
    if (userStore.id === -1 && !isScreenLoading) {
      this.setState({isScreenLoading: true});
      GetAuthUserInfo(userInfo => {
        userStore.updateUserInfo(userInfo)
        this.setState({
          isScreenLoading: false,
          areEventsNotFound: false
        });
        this.getUpComingEvents(userInfo.id);
    }, axios)
    } else if (userStore.id !== -1 && this.state.selectedEventStatus === null) {
      this.handleEventStateSelection(EVENT_STATUSES.UP_COMING)
    }
  }

  getUpComingEvents(userId) {
    const {axios} = this.props;
    
    GetUpComingUserEvents(userId, (events) => {
      if (events?.length > 0) {
        const foramtedEvents = events.map(event => {
          event.expire_at = moment(event.expire_at).format('YYYY-MM-DD HH:mm:ss');
          return event;
        })
        this.setState({
          pendingEvents: null,
          isEventsLoading: false,
          areEventsNotFound: false,
          upComingEvents: foramtedEvents
        })
      } else {
        this.setState({isEventsLoading: false, areEventsNotFound: true});
      }
    }, axios)
  }

  getPendingEvents(userId) {
    const {axios} = this.props;

    GetPendingUserEvents(userId, (events) => {
      if (events?.length > 0) {
        const foramtedEvents = events.map(event => {
          event.expire_at = moment(event.expire_at).format('YYYY-MM-DD HH:mm:ss');
          return event;
        })
        this.setState({
          upComingEvents: null,
          isEventsLoading: false,
          areEventsNotFound: false,
          pendingEvents: foramtedEvents
        })
      } else {
        this.setState({isEventsLoading: false, areEventsNotFound: true});
      }
    }, axios)
  }

  handleLogout() {
    const {axios, router, userStore, eventStore} = this.props;
    this.setState({isScreenLoading: true});
    Logout(() => {
      router.push(pages.LOGIN)
      this.setState({isScreenLoading: false});
      userStore.clearData();
      eventStore.clearData();
    }, axios);
  }

  handleEventStateSelection(index) {
    const {userStore} = this.props;
    const {selectedEventStatus} = this.state;
    if (index !== selectedEventStatus) {
      this.setState({
        isEventsLoading: true,
        areEventsNotFound: false,
        selectedEventStatus: index
      });
  
      if (index === EVENT_STATUSES.UP_COMING) {
        this.getUpComingEvents(userStore.id);
      } else {
        this.getPendingEvents(userStore.id);
      }
    }
  }

  handleCreateNewEvent() {
    this.props.router.push(pages.SELECT_AVAILABLE_DATES);
  }

  handleDeleteEvent(eventId, eventName) {
    this.setState({
      modalType: "warning",
      eventIdToDelete: eventId,
      deleteModalMessage: `Are you sure you want to delete this event ${eventName}?`
    })
  }

  handleCancelDeleteEventModal() {
    this.setState({
      modalType: "",
      eventIdToDelete: -1,
      deleteModalMessage: ""
     })
  }

  handleConfrimDeleteEventModal() {
    const {axios, userStore} = this.props;
    const {eventIdToDelete} = this.state;
    this.setState({isScreenLoading: true, modalType: ''});
    DeleteEvent(response => {
    this.setState({
        isScreenLoading: false,
        modalType: "after-deletion",
        deleteModalMessage: response? response.message : 'sorry an error occurred while delete the event'
      });
      setTimeout(() => {
        this.setState({
          modalType: '',
          deleteModalMessage: ''
        })
        this.setState({isEventsLoading: true});
        this.getPendingEvents(userStore.id)
      }, 1000)
    }, eventIdToDelete, axios);
  }

  render() {
    const {router, userStore} = this.props;
    const {
      modalType,
      pendingEvents,
      upComingEvents,
      isScreenLoading,
      isEventsLoading,
      areEventsNotFound,
      deleteModalMessage
    } = this.state;
    return (
      <EventsDashboardLayout
        modalType={modalType}
        userName={userStore.name}
        pendingEvents={pendingEvents}
        upComingEvents={upComingEvents}
        isScreenLoading={isScreenLoading}
        onClickLogout={this.handleLogout}
        isEventsLoading={isEventsLoading}
        areEventsNotFound={areEventsNotFound}
        deleteModalMessage={deleteModalMessage}
        eventStatuses={["Up Coming", "Pending"]}
        onClickDeleteEvent={this.handleDeleteEvent}
        onClickCreateNew={this.handleCreateNewEvent}
        onSelectEventStatus={this.handleEventStateSelection}
        onCancelDeleteModal={this.handleCancelDeleteEventModal}
        onConfirmDeleteModal={this.handleConfrimDeleteEventModal}
        onClickPendingEventCard={eventId=>{ router.push(pages.EVENT_DETAILS_PENDING(eventId)) }}
        onClickUpcomingEventCard={eventId=>{ router.push(pages.EVENT_DETAILS_UPCOMING(eventId)) }}
      />)
  }
}

export default observer(EventsDashboardView)