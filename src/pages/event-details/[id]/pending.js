import { observer } from "mobx-react";
import PendingEventDetailsView from "@/views/eventDetails/PendingEventDetailsView";

export default observer(props => {
  const {eventStore, attendeeStore} = props.rootStore;
  return (
    <PendingEventDetailsView
      eventStore={eventStore} 
      attendeeStore={attendeeStore} 
      {...props}
    />
  );
});