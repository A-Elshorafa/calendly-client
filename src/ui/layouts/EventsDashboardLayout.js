import React, {Component} from "react";
import {RoundedButton} from "../components/buttons";
import {StackedNavigation} from "../components/navigation";
import {EventCard, RoundedCard} from "../components/cards";

export default class EventDashbord extends Component
{
  constructor(props) {
    super(props);
  }

  render() {
    const {
      user,
      pendingEvents,
      eventStatuses,
      onClickLogout,
      upComingEvents,
      onClickCreateNew,
      onClickDeleteEvent,
      onSelectEventStatus,
    } = this.props;
    return (
      <div className="w-full h-full-screen overflow-hidden">
        <div className="border border-spacing-1 w-full drop-shadow-xl bg-gray-100">
          <div className="p-4 flex flex-row items-center justify-between">
            <label className="font-bold text-4xl text-slate-900">Events Dashbord</label>
            <a href={onClickLogout} className="font-bold text-md text-slate-900 cursor-pointer pr-12">logout</a>
          </div>
          <div className="px-4 py-2 flex flex-col items-start justify-between">
            <div className="flex flex-row items-baseline justify-start">
              <label className="font-bold text-2xl text-slate-900 pr-2">Hello mr/mrs: </label>
              <label className="font-bold text-xl text-gray-700">{user?.name}</label>
            </div>
            <RoundedButton
              onClick={onClickCreateNew}
              additionalStyles="p-4 bg-teal-500 self-end rounded-full text-white font-bold text-xl"
            >
              Create New
            </RoundedButton>
          </div>
          <StackedNavigation
            tabs={eventStatuses}
            stackName="events-navigation"
            onSelect={onSelectEventStatus}
          />
        </div>
        <RoundedCard paddingValue={8} className="bg-slate-100 overflow-auto h-calc-vf-294">
          <RoundedCard paddingValue={8} className="grid grid-cols-3 gap-8 bg-white rounded-lg overflow-y-auto">
            {upComingEvents && upComingEvents.length > 0 && 
              upComingEvents.map(event => (
                <EventCard
                  eventName={event.name}
                  calendlyLink={event.calendly_link}
                  eventCreatedAt={event.created_at}
                  eventExpiryDate={event.expiry_date}
                  eventLocation={event.third_parity_name}
                />
              ))
            }
            {/* When peding events selected upcoming events cleared and vice-versa, to keep them updated*/}
            {pendingEvents && pendingEvents.length > 0 && 
              pendingEvents.map(event => (
                <EventCard
                  eventName={event.name}
                  calendlyLink={event.calendly_link}
                  eventCreatedAt={event.created_at}
                  onClickDelete={onClickDeleteEvent}
                  eventExpiryDate={event.expiry_date}
                  eventLocation={event.third_parity_name}
                />
              ))
            }
          </RoundedCard>
        </RoundedCard>
      </div>
    )
  }
}