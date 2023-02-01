import pages from "@/constants/pages";
import { observer } from "mobx-react";
import React, { Component } from "react";
import { SuccessfulCreationLayout } from "@/ui/Layouts";

class SuccessfulCreationView extends Component
{
  constructor(props) {
    super(props);
    
    this.handleRouting = this.handleRouting.bind(this);
  }

  componentDidMount() {
    const {router, eventStore} = this.props;
    if (eventStore.eventName === "") {
      eventStore.clearData()
    }

    router.beforePopState(({url}) => {
      if (url !== pages.SUCCESSFUL_CREATION) {
        window.location.href = pages.EVENTS_DASHBORAD;
      }
      return true;
    })
  }

  // on refresh the page
  componentDidUpdate() {
    const {eventStore} = this.props;
    if (eventStore.eventName === "") {
      this.handleRouting(pages.EVENTS_DASHBORAD);
    }
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
        calendlyLink={eventStore.calendlyLink}
        goToDashoard={()=>this.handleRouting(pages.EVENTS_DASHBORAD)}
        onClickCalendly={()=>this.handleRouting(eventStore.calendlyLink)}
      />
    )
  }
}

export default observer(SuccessfulCreationView)