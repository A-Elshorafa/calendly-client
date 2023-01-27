import pages from "@/constants/pages";
import { observer } from "mobx-react";
import React, { Component } from "react";
import { SuccessfulCreationLayout } from "@/ui/Layouts";

class SuccessfulCreationView extends Component
{
  componentDidMount() {
    const {router, userStore} = this.props;
    if (userStore.id === "") {
      router.replace('/events-dashboard');
    }
    this.handleRouting = this.handleRouting.bind(this);
  }

  handleRouting(url) {
    const {router, eventStore} = this.props;
    eventStore.clearData();
    router.replace(url);
  }

  render() {
    const {eventStore} = this.props;
    return (
      <SuccessfulCreationLayout
        eventName={eventStore.eventName}
        dashboardLink={pages.dashboardLink}
        calendlyLink={eventStore.calendlyUrl}
        goToDashoard={()=>this.handleRouting(pages.dashboardLink)}
        onClickCalendly={()=>this.handleRouting(eventStore.calendlyUrl)}
      />
    )
  }
}

export default observer(SuccessfulCreationView)