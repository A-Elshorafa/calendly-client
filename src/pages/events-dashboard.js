import React, { useState } from "react";
import { EventsDashboardLayout } from "@/ui/Layouts";

export default () => {
  const EVENT_STATUSES = ["Up Coming", "Pending"];
  const [selectedEventStatus, setSelectedEventStatus] = useState(0);
  return (
    <EventsDashboardLayout
      user={{name: "My Name"}}
      pendingEvents={selectedEventStatus === 1 ? [{
        name: "Pending Touch 1",
        calendly_link: "http://localhost:3000",
        created_at: "22-22-2022",
        expiry_date:"33-33-2033",
        third_parity_name: "Zoom",
      },
      {
        name: "Pending Touch 2",
        calendly_link: "http://localhost:3000",
        created_at: "22-22-2022",
        expiry_date:"33-33-2033",
        third_parity_name: "Zoom",
      },
      {
        name: "Pending Touch 3",
        calendly_link: "http://localhost:3000",
        created_at: "22-22-2022",
        expiry_date:"33-33-2033",
        third_parity_name: "Zoom",
      }] : []}
      eventStatuses={EVENT_STATUSES}
      onClickLogout={()=>{console.log('logout')}}
      upComingEvents={selectedEventStatus === 0 && [
        {
          name: "One Touch 4",
          calendly_link: "http://localhost:3000",
          created_at: "22-22-2022",
          expiry_date:"33-33-2033",
          third_parity_name: "Zoom",
        },
        {
          name: "One Touch 5",
          calendly_link: "http://localhost:3000",
          created_at: "22-22-2022",
          expiry_date:"33-33-2033",
          third_parity_name: "Zoom",
        },
        {
          name: "One Touch 1",
          calendly_link: "http://localhost:3000",
          created_at: "22-22-2022",
          expiry_date:"33-33-2033",
          third_parity_name: "Zoom",
        },
        {
          name: "One Touch 2",
          calendly_link: "http://localhost:3000",
          created_at: "22-22-2022",
          expiry_date:"33-33-2033",
          third_parity_name: "Zoom",
        },
        {
          name: "One Touch 3",
          calendly_link: "http://localhost:3000",
          created_at: "22-22-2022",
          expiry_date:"33-33-2033",
          third_parity_name: "Zoom",
        },
        {
          name: "One Touch 4",
          calendly_link: "http://localhost:3000",
          created_at: "22-22-2022",
          expiry_date:"33-33-2033",
          third_parity_name: "Zoom",
        },
        {
          name: "One Touch 5",
          calendly_link: "http://localhost:3000",
          created_at: "22-22-2022",
          expiry_date:"33-33-2033",
          third_parity_name: "Zoom",
        }
      ]}
      onClickCreateNew={_ => {console.log('onClickCreateNew')}}
      onClickDeleteEvent={(index) => {console.log('delete event: ' + index)}}
      onSelectEventStatus={(index) => {console.log('EventStatus: ' + index); setSelectedEventStatus(index)}}
    />
  )
}