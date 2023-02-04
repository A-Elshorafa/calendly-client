import moment from "moment";
import pages from "@/constants/pages";
import { observer } from "mobx-react";
import React, { Component } from "react";
import { SuccessfulSubscriptionLayout } from "@/ui/Layouts";

class SuccessfulSubscriptionView extends Component
{
  constructor(props) {
    super(props);
    this.handleReturnHome = this.handleReturnHome.bind(this);
  }
  
  componentDidMount() {
    const {router, eventStore} = this.props;
    if (eventStore.eventName === "") {
      router.push(pages.EVENTS_DASHBORAD);
    }
  }

  componentDidUpdate() {
    const {router, eventStore} = this.props;
    router.beforePopState(({url}) => {
      if (url !== pages.SUCCESSFUL_SUBSCRIPTION) {
        eventStore.clearData();
        router.replace(pages.EVENTS_DASHBORAD);
      }
      return true;
    })
  }

  handleReturnHome() {
    const {router, eventStore} = this.props;
    eventStore.clearData();
    router.replace(pages.EVENTS_DASHBORAD)
  }

  getSubscriptionFullDate() {
    const {eventStore} = this.props;
    const date = moment(eventStore.expireAt).format("- kk:mm:ss, dddd, DD MMMM, YYYY");
    const subscribedOn = moment(eventStore.subscribedOn).format("kk:mm:ss")
    return subscribedOn.concat(" ", date);
  }

  getEmailAccounts() {
    const {eventStore, attendeeStore} = this.props;
    return `${attendeeStore.email} & ${eventStore.host?.email}`;
  }

  render() {
    const {eventStore} = this.props;
    return (
      <SuccessfulSubscriptionLayout
        hostName={eventStore.host?.name}
        eventName={eventStore.eventName}
        returnToHome={this.handleReturnHome}
        emailAccounts={this.getEmailAccounts()}
        subscriptionFullDateAndTime={this.getSubscriptionFullDate()}
        goToDashoard={()=>this.handleRouting(pages.EVENTS_DASHBORAD)}
        onClickCalendly={()=>this.handleRouting(eventStore.calendlyLink)}
      />
    )
  }
}

export default observer(SuccessfulSubscriptionView);