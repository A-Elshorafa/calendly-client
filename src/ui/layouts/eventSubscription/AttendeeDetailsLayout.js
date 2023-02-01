import React, {Component} from "react";
import messages from "@/constants/messages";
import { RoundedCard } from "@/ui/components/cards";
import { CustomModal } from "@/ui/components/modals";
import { RoundedFilledButton } from "@/ui/components/buttons";
import { ImageLoader } from "@/ui/components/actionComponents";
import { IconAndValue, TitleAndValue } from "@/ui/components/label";
import { LabeledInput, LabeledTextArea } from "@/ui/components/inputs";

export default class AttendeeDetailsLayout extends Component
{
  render() {
    const {
      duration,
      hostName,
      eventName,
      modalType,
      eventAgenda,
      attendeeName,
      attendeeEmail,
      onCancelModal,
      onChangeNotes,
      allowContinue,
      onConfirmModal,
      durationString,
      onClickContinue,
      isScreenLoading,
      validationErrors,
      onChangeGuestName,
      onChangeGuestEmail,
      selectedAppointmentDate,
      selectedAppointmentTime
    } = this.props;
    return (
      <div className="flex justify-center py-8 bg-gray-400 h-full">
         {modalType !== '' &&
          <CustomModal
            cancelText="Cancel"
            confirmText="Try Again"
            onClickCancel={onCancelModal}
            onClickConfirm={onConfirmModal}
            title="Event Subscription"
            withButtons={modalType === 'error'}
            description={
              modalType === 'error'?
                messages.ERROR_OCCURRED_WHILE_SUBSCRIBE : messages.YOU_WILL_REDIRECT_IN_SECS
              }
          />
        }
        {isScreenLoading && 
          <ImageLoader/>
        }
        <RoundedCard
          paddingValue={14}
          className="w-8/12 h-full flex flex-col p-8 rounded-xl bg-white"
        >
          <label className="text-3xl text-center">Guest Details</label>
          <div className="flex flex-row h-full mt-4 overflow-hidden">
            <div className="flex flex-1 flex-col overflow-hidden">
              <TitleAndValue
                value={hostName}
                title="Host Name:"
                marginTopValue={0}
              />
              <TitleAndValue 
                marginTopValue={8}
                value={eventName}
                title="Meeting Name:"
              />
              <IconAndValue
                marginTopValue={8}
                iconSrc="/16X16/scheduleClock16.svg"
                text={`${duration} ${durationString}`}
              />
              <IconAndValue 
                marginTopValue={8}
                iconSrc="/16X16/videoCam16.svg"
                text="Web Conferencing Provided Upon Confirmation"
              />
              <IconAndValue 
                marginTopValue={8}
                iconSrc="/19X19/grayCalender19.svg"
                text={`${selectedAppointmentDate} ${selectedAppointmentTime}`}
              />
              <p
                className="w-full mt-4 text-lg text-slate-700 font-semibold overflow-y-auto overflow-x-hidden text-ellipsis"
              >
                {eventAgenda}
              </p>
            </div>
            <div className="flex flex-1 flex-col pl-2">
              <label className="text-lg font-semibold text-slate-600">
                Host's available times
              </label>
              <LabeledInput 
                label="Name"
                className="mt-4"
                isRequired={true}
                placeholder="Name"
                value={attendeeName}
                onChangeText={onChangeGuestName}
                invalidText={validationErrors.name? validationErrors.name : ""}
              />
              <LabeledInput
                label="E-mail"
                className="mt-4"
                isRequired={true}
                value={attendeeEmail}
                placeholder="example@mail.com"
                onChangeText={onChangeGuestEmail}
                invalidText={validationErrors.email? validationErrors.email : ""}
              />
              <LabeledTextArea 
                label="Notes"
                className="mt-4"
                placeholder="Notes"
                onChangeText={onChangeNotes}
              />
            </div>
            <RoundedFilledButton
              paddingValue={8}
              onClick={onClickContinue}
              allowContinue={allowContinue}
              className={`mt-4 font-bold w-fit p-4 self-end`}
            >Continue</RoundedFilledButton>
          </div>
        </RoundedCard>
      </div>
    )
  }
}