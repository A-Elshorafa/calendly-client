import React, { Component } from "react";
import { AppointmentSelectionLayout } from "@/ui/Layouts";

export default class AppointmentSelection extends Component
{
  render() {
    return (
      <AppointmentSelectionLayout
        duration="30"
        hostName="Abdelrahman Elshorafa"
        meetingName="One Off meeting"
        filteredDates={[
          {date: '12-12-2022', times: ['15:00:00', '15:15:00', '15:30:00', '15:45:00']},
          {date: '13-12-2022', times: ['15:00:00', '15:15:00', '15:30:00', '15:45:00']},
          {date: '14-12-2022', times: ['15:00:00', '15:15:00', '15:30:00', '15:45:00']}
        ]}
        allowContinue={true}
        onClickContinue={()=>{console.log('click continue')}}
        onSelectFilteredDates={()=>{console.log('substitue dates')}}
      />
    )
  }
}