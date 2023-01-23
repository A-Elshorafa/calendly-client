import React, { Component } from "react";
import { SuccessfulSubscriptionLayout } from "@/ui/Layouts";

export default class SuccessfulCreation extends Component
{
  render() {
    return (
      <SuccessfulSubscriptionLayout
        eventName="EVENT NAME"
        calendlyLink="http://localhost:3000"
        eventDateTime="Monday 17 Jan 2023, 15:15:00"
        hostName="Abdelrahman"
        thirdPartyName="Zoom"
        thirdPartyLink="http://zoom.com"
        authorizationLink="http://localhost:3000"
      />
    )
  }
}