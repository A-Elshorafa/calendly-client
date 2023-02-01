import { observer } from "mobx-react";
import SuccessfulSubscriptionView from "@/views/eventSubscription/SuccessfulSubscriptionView";

export default observer (props => {
  const {eventStore, attendeeStore} = props.rootStore;
  return (
    <SuccessfulSubscriptionView
      eventStore={eventStore}
      attendeeStore={attendeeStore}
      {...props}
    />
  )
});