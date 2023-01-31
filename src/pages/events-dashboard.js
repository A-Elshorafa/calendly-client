import { observer } from "mobx-react";
import EventsDashboardView from "@/views/EventsDashboardView";

export default observer(props =>{
  return (
    <EventsDashboardView
      userStore={props.rootStore.userStore}
      {...props}
    />
  )
})