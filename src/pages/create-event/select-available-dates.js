import React, {Component} from "react";
import { observer } from "mobx-react";
import SelectAvailableDatesView from "@/views/eventCreation/SelectAvailableDatesView";

export default observer(props => {
  const {userStore, eventStore} = props.rootStore;
  return (
    <SelectAvailableDatesView 
      userStore={userStore}
      eventStore={eventStore}
      {...props}
    />
  )
})