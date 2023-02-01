import { observer } from "mobx-react";
import SuccessfulCreationView from "@/views/eventCreation/SuccessfulCreationView";

export default observer(props => {
  const {userStore, eventStore} = props.rootStore;
  return (
    <SuccessfulCreationView
      userStore={userStore}
      eventStore={eventStore}
      {...props}
    />
  )
})