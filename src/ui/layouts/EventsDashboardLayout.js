import Link from "next/link";
import Image from "next/image";
import React, {Component} from "react";
import { CustomModal } from "../components/modals";
import { RoundedFilledButton } from "../components/buttons";
import { StackedNavigation } from "../components/navigation";
import { EventCard, RoundedCard } from "../components/cards";
import { CardTitle, TitleAndValue } from "../components/label";
import { ContentNotFound, ImageLoader } from "../components/actionComponents";

export default class EventDashbordLayout extends Component
{
  render() {
    const {
      userName,
      modalType,
      pendingEvents,
      eventStatuses,
      onClickLogout,
      upComingEvents,
      isEventsLoading,
      isScreenLoading,
      onClickCreateNew,
      areEventsNotFound,
      onClickDeleteEvent,
      deleteModalMessage,
      onSelectEventStatus,
      onCancelDeleteModal,
      onConfirmDeleteModal,
      onClickPendingEventCard,
      onClickUpcomingEventCard
    } = this.props;
    return (
      <div className="w-full h-full-screen overflow-hidden relative">
        {modalType && deleteModalMessage !=='' &&
          <CustomModal
            cancelText="Cancel"
            title="Delete Event"
            confirmText="Delete"
            description={deleteModalMessage}
            withButtons={modalType==='warning'}
            onClickCancel={onCancelDeleteModal}
            onClickConfirm={onConfirmDeleteModal}
            confirmationStyle="bg-red-500 hover:bg-red-600"
          />
        }
        {isScreenLoading && 
          <ImageLoader/>
        }
        <div className="border border-spacing-1 w-full drop-shadow-xl bg-gray-100">
          <div className="p-4 flex flex-row items-center justify-between">
            <CardTitle
              textPosition="start"
              title="Events Dashbord"
            />
            <Link 
              href={""}
              onClick={onClickLogout}
              className="font-bold text-md text-slate-900 cursor-pointer pr-12">
              logout
            </Link>
          </div>
          <div className="px-4 py-2 flex flex-row items-baseline justify-between">
            <TitleAndValue
              value={userName}
              title="Hello mr/mrs:"
              classNameValue="ml-2"
              classNameTitle="overflow-visible"
              className="w-fit flex flex-row items-center justify-between"
            />
            <RoundedFilledButton
              onClick={onClickCreateNew}
              className="p-4 bg-teal-500 rounded-full text-white font-bold text-xl"
            >
              Create New
            </RoundedFilledButton>
          </div>
          <StackedNavigation
            tabs={eventStatuses}
            stackName="events-navigation"
            onSelect={onSelectEventStatus}
          />
        </div>
        <RoundedCard
          paddingValue={8}
          className="bg-slate-100 overflow-auto h-calc-vh-294 overflow-y-auto overflow-x-hidden"
        >
          <RoundedCard 
            paddingValue={8} 
            className={` bg-white rounded-lg overflow-y-auto ${
              isEventsLoading || areEventsNotFound? 'h-full flex flex-row items-center justify-center' : 'grid grid-cols-2 gap-8'
            }`}
          >
            {isEventsLoading?
              <Image
                width={50}
                height={43}
                alt="loading..."
                src="/128X43/loadingCircles.gif"
              />
              : areEventsNotFound?
                <ContentNotFound
                  message="Events not found"
                />
              :
              (
                upComingEvents && upComingEvents.length > 0 ?
                upComingEvents.map((event, index) => (
                  <EventCard
                    key={index}
                    eventId={event.id}
                    eventName={event.name}
                    eventCreatedAt={event.created_at}
                    eventExpiryDate={event.expire_at}
                    onClick={onClickUpcomingEventCard}
                    attendeeEmail={event.attendee?.email}
                    eventLocation={event.third_party_name}
                  />
                ))
                :
                pendingEvents && pendingEvents.length > 0 && 
                  pendingEvents.map((event, index) => (
                  <EventCard
                    key={index}
                    eventId={event.id}
                    eventName={event.name}
                    onClick={onClickPendingEventCard}
                    eventCreatedAt={event.created_at}
                    eventExpiryDate={event.expire_at}
                    calendlyLink={event.calendly_link}
                    onClickDelete={onClickDeleteEvent}
                    eventLocation={event.third_party_name}
                  />
                ))
              )
            }
          </RoundedCard>
        </RoundedCard>
      </div>
    )
  }
}