import { observer } from "mobx-react";
import AppointmentSelectionView from "@/views/eventSubscription/AppointmentSelectionView";

export default observer(props => {
  const {query} = props.router;
  const {eventStore, attendeeStore} = props.rootStore;
  return (
    <AppointmentSelectionView
      query={query}
      eventStore={eventStore}
      attendeeStore={attendeeStore}
      {...props}
    />
  )
})