import { observer } from "mobx-react";
import AttendeeDetailsView from "@/views/eventSubscription/AttendeeDetailsView";

export default observer(props => {
  const {eventStore, attendeeStore} = props.rootStore;
  return (
    <AttendeeDetailsView
      eventStore={eventStore} 
      attendeeStore={attendeeStore}
      {...props}
    />
  );
});