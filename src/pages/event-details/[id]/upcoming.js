import { observer } from "mobx-react";
import UpcomingEventDetailsView from "@/views/eventDetails/UpcomingEventDetailsView";

export default observer(props => {
  const {eventStore, attendeeStore} = props.rootStore;
  return (
    <UpcomingEventDetailsView
      eventStore={eventStore} 
      attendeeStore={attendeeStore} 
      {...props}
    />
  );
});