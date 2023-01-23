import React, {Component} from "react";
import { RoundedCard } from "@/ui/components/cards";
import { RoundedButton } from "@/ui/components/buttons";
import { IconAndValue, TitleAndValue } from "@/ui/components/label";
import { LabeledInput, LabeledTextArea } from "@/ui/components/inputs";

export default class GuestDetailsLayout extends Component
{
  render() {
    const {
      duration,
      hostName,
      meetingName,
      onChangeNotes,
      allowContinue,
      onClickContinue,
      onChangeGuestName,
      onChangeGuestEmail,
      selectedAppointment,
    } = this.props;
    return (
      <div className="flex justify-center py-8 bg-gray-400 h-full">
        <RoundedCard paddingValue={14} className="w-5/12 h-full flex flex-col p-8 rounded-xl bg-white">
          <label className="text-3xl text-center">Guest Details</label>
          <div className="flex flex-row h-full mt-4 overflow-hidden">
            <div className="flex flex-1 flex-col flex-wrap">
              <TitleAndValue
                value={hostName}
                title="Host Name:"
                marginTopValue={0}
              />
              <TitleAndValue 
                marginTopValue={8}
                value={meetingName}
                title="Meeting Name:"
              />
              <IconAndValue
                text={`${duration} minutes`}
                marginTopValue={8}
                iconSrc="/16X16/scheduleClock16.svg"
              />
              <IconAndValue 
                marginTopValue={8}
                iconSrc="/16X16/videoCam16.svg"
                text="Web Conferencing Provided Upon Confirmation"
              />
              <IconAndValue 
                marginTopValue={8}
                text={selectedAppointment}
                iconSrc="/19X19/grayCalender19.svg"
              />
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
                onChangeText={onChangeGuestName}
              />
              <LabeledInput
                label="E-mail"
                className="mt-4"
                isRequired={true}
                placeholder="example@mail.com"
                onChangeText={onChangeGuestEmail}
              />
              <LabeledTextArea 
                label="Notes"
                className="mt-4"
                placeholder="Notes"
                onChangeText={onChangeNotes}
              />
            </div>
            <RoundedButton
              paddingValue={8}
              onClick={allowContinue? onClickContinue : null}
              className={`${allowContinue? 'bg-indigo-500 hover:text-white hover:bg-indigo-700': 'bg-gray-500 cursor-default' } mt-4 font-bold w-fit p-4 self-end`}
            >Continue</RoundedButton>
          </div>
        </RoundedCard>
      </div>
    )
  }
}