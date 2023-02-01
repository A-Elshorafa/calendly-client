import { observer } from "mobx-react";
import AppointmentSelectionView from "@/views/eventSubscription/AppointmentSelectionView";

export default observer(props => {
  const {query} = props.router;
  const {eventStore} = props.rootStore;
  return (
    <AppointmentSelectionView
      query={query}
      eventStore={eventStore}
      {...props}
    />
  )
})