import React, { Component } from "react";
import { MeetingSummaryLayout } from "@/ui/Layouts";

export default class MeetingSummary extends Component
{
  render() {
    return (
      <MeetingSummaryLayout
        duration={30}
        userName="Abdelrahman"
        numberOfDays={3}
        numberOfTimes={15}
        allowContinue={false}
        onClickContinue={() => {}}
        onChangeCustomUrl={() => {}}
        onChangeMeetingName={() => {}}
        onChangeMeetingAgenda={() => {}}
      />
    )
  }
}