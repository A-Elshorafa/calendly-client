import React, { Component } from "react";
import { SuccessfulCreationLayout } from "@/ui/Layouts";

export default class SuccessfulCreation extends Component
{
  render() {
    return (
      <SuccessfulCreationLayout
        eventName="EVENT NAME"
        calendlyLink="http://localhost:3000"
        eventDateTime="Monday 17 Jan 2023, 15:15:00"
      />
    )
  }
}