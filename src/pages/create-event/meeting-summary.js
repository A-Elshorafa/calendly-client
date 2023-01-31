import { observer } from "mobx-react";
import React, {Component} from "react";
import MeetingSummaryView from "@/views/eventCreation/MeetingSummaryView";

class MeetingSummary extends Component
{
  render() {
    return (
      <MeetingSummaryView 
        userStore={this.props.rootStore.userStore}
        eventStore={this.props.rootStore.eventStore}
        {...this.props}
      />
    )
  }
}

export default observer(MeetingSummary);