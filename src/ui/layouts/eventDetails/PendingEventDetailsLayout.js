import React, {Component} from "react";
import { RoundedCard } from "@/ui/components/cards";
import { CustomModal } from "@/ui/components/modals";
import { ColumnSelectValues } from "@/ui/components/selects";
import { ImageLoader } from "@/ui/components/actionComponents";
import { CardTitle, IconAndValue, TitleAndValue } from "@/ui/components/label";
import { LinkAndDeleteComponent, RoundedFilledButton } from "@/ui/components/buttons";

export default class PendingEventDetailsLayout extends Component
{
  render() {
    const {
      agenda,
      modalType,
      eventName,
      calendlyLink,
      createdAtDate, // 27 JANUARY 2023
      expiredAtDate,
      thirdPartyName,
      isScreenLoading,
      onClickBackToHome,
      onClickDeleteEvent,
      deleteModalMessage,
      onCancelDeleteModal,
      onConfirmDeleteModal,
      selectedAvailableTimes
    } = this.props;
    return (
      <div className="flex justify-center py-8 bg-gray-400 h-full">
        {deleteModalMessage !=='' &&
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
        <RoundedCard
          paddingValue={14}
          className="w-8/12 h-full flex flex-col p-8 rounded-xl bg-white"
        >
          <CardTitle title="Event Details" />
          <div className="flex flex-row h-full mt-4 overflow-hidden">
            <div className="flex flex-1 flex-col flex-no-wrap overflow-hidden h-full">
              <IconAndValue
                marginTopValue={0}
                title="Created At"
                text={`${createdAtDate}`}
                iconSrc="/19X19/grayCalender19.svg"
                componentBesideHeader={
                  <LinkAndDeleteComponent
                    link={calendlyLink}
                    iconWidth={22}
                    iconHeight={22}
                    className={`ml-4`}
                    onClickDelete={onClickDeleteEvent}
                  />
                }
              />
              <IconAndValue 
                marginTopValue={6}
                title="Expires At"
                text={`${expiredAtDate}`}
                iconSrc="/19X19/grayCalender19.svg"
              />
              <TitleAndValue 
                value={eventName}
                marginTopValue={6}
                title="Event Name:"
                classNameTitle="whitespace-nowrap"
                classNameValue="whitespace-nowrap text-elipses"
              />
              <TitleAndValue 
                title="Location:"
                marginTopValue={6}
                value={thirdPartyName}
                classNameTitle="flex flex-col"
              />
              <TitleAndValue 
                title="Agenda:"
                value={agenda}
                marginTopValue={6}
                className="h-full overflow-hidden"
                classNameValue="h-full text-elipses overflow-auto max-h-full"
              />
            </div>
            <div className="w-4"></div>
            <div className="flex flex-1 flex-col">
              <label className="text-lg font-semibold text-slate-700">
                Event Available Times
              </label>
              <ColumnSelectValues
                valueKey="date"
                subValueKey="time"
                allowClick={false}
                subValueskey="times"
                values={selectedAvailableTimes}
              />
            </div>
          </div>
          <RoundedFilledButton
            paddingValue={8}
            allowContinue={true}
            onClick={onClickBackToHome}
            className={`mt-4 font-bold w-fit p-4 self-end`}
          >Back To Home</RoundedFilledButton>
        </RoundedCard>
      </div>
    )
  }
}