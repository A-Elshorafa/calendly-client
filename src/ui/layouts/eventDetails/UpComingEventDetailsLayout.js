import React, {Component} from "react";
import { RoundedCard } from "@/ui/components/cards";
import { CustomModal } from "@/ui/components/modals";
import { LabeledTextArea } from "@/ui/components/inputs";
import { RoundedFilledButton } from "@/ui/components/buttons";
import { ImageLoader } from "@/ui/components/actionComponents";
import { IconAndValue, TitleAndExtendedValue, TitleAndValue } from "@/ui/components/label";

export default class UpComingEventDetailsLayout extends Component
{
  render() {
    const {
      eventName,
      eventNotes,
      allowUpdate,
      attendeeName,
      modalMessage,
      attendeeNotes,
      attendeeEmail,
      onChangeNotes,
      createdAtDate, // 27 JANUARY 2023
      onClickUpdate,
      isScreenLoading,
      appointmentTime,
      thirdParityName,
      selectedAppointmentDate,
      appointmentTimePlusDuration
    } = this.props;
    return (
      <div className="flex justify-center py-8 bg-gray-400 h-full">
        {isScreenLoading && 
          <ImageLoader/>
        }
        {modalMessage !=='' &&
          <CustomModal
            withButtons={false}
            title="Update event Notes"
            description={modalMessage}
          />
        }
        <RoundedCard
          paddingValue={14}
          className="w-8/12 h-full flex flex-col p-8 rounded-xl bg-white"
        >
          <label
            className="text-3xl text-center whitespace-nowrap text-ellipsis overflow-hidden"
          >
            Event Details
          </label>
          <div className="flex flex-row h-full mt-4 overflow-hidden">
            <div className="w-5/12 flex flex-1 flex-col overflow-hidden">
              <IconAndValue
                marginTopValue={0}
                inOneValueLine={true}
                iconSrc="/19X19/grayCalender19.svg"
                text={`${selectedAppointmentDate}`}
              />
              <IconAndValue 
                marginTopValue={6}
                inOneValueLine={true}
                iconSrc="/16X16/scheduleClock16.svg"
                text={`${appointmentTime} - ${appointmentTimePlusDuration}`}
              />
              <TitleAndValue 
                value={eventName}
                titleTextSize="md"
                valueTextSize="md"
                marginTopValue={6}
                title="Event Name:"
              />
              <TitleAndValue 
                title="Location:"
                titleTextSize="md"
                valueTextSize="md"
                marginTopValue={6}
                value={thirdParityName}
              />
              <div
                className="mt-4 text-md text-gray-500 font-italic text-ellipsis whitespace-nowrap overflow-hidden"
              >
                Created {createdAtDate}
              </div>
              <LabeledTextArea 
                label="Notes"
                className="mt-6"
                titleTextSize="md"
                value={eventNotes}
                placeholder="Notes"
                onChangeText={onChangeNotes}
                subTitle="only shown by the host"
              />
            </div>
            {attendeeName && <div className="w-2/12"></div>}
            {attendeeName &&
              <div className="w-5/12 h-full flex flex-1 flex-col">
                <div className="flex-1 overflow-hidden">
                  <h1
                    className="w-full text-xl font-semibold text-slate-600 whitespace-nowrap text-ellipsis overflow-hidden"
                  >
                    Attendee Details
                  </h1>
                  <TitleAndValue
                    marginTopValue={6}
                    titleTextSize="md"
                    valueTextSize="md"
                    value={attendeeName}
                    title="Attendee Name:"
                    classNameTitle="whitespace-nowrap text-elipses w-full"
                  />
                  <TitleAndValue
                    marginTopValue={6}
                    titleTextSize="md"
                    valueTextSize="md"
                    value={attendeeEmail}
                    title="Attendee email:"
                  />
                  {attendeeNotes && <TitleAndExtendedValue 
                    marginTopValue={6}
                    titleTextSize="md"
                    valueTextSize="md"
                    value={attendeeNotes}
                    title="Attendee Notes:"    
                    className="h-full overflow-hidden"
                    classNameValue="h-full text-elipses overflow-auto max-h-full"
                  />}
                </div>
                <RoundedFilledButton
                  paddingValue={8}
                  onClick={onClickUpdate}
                  allowContinue={allowUpdate}
                  className={`mt-4 font-bold w-fit p-4 self-end`}
                >Update</RoundedFilledButton>
              </div>
            }
          </div>
        </RoundedCard>
      </div>
    )
  }
}