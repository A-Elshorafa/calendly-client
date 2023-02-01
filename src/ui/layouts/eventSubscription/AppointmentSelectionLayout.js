import React, {Component} from "react";
import { RoundedCard } from "@/ui/components/cards";
import { ColumnSelectValues } from "../../components/selects";
import { RoundedFilledButton } from "@/ui/components/buttons";
import { CardTitle, IconAndValue, TitleAndValue } from "@/ui/components/label";

export default class AppointmentSelectionLayout extends Component
{
  render() {
    const {
      duration,
      hostName,
      eventAgenda,
      meetingName,
      filteredDates,
      allowContinue,
      onClickContinue,
      onSelectFilteredDates,
      initialAppiontmentValue
    } = this.props;
    return (
      <div className="flex justify-center py-8 bg-gray-400 h-full">
        <RoundedCard
          paddingValue={14}
          className="w-8/12 h-full flex flex-col px-10 py-5 rounded-xl bg-white"
        >
          <CardTitle title="Event Subscription"/>
          <div className="flex flex-row h-full mt-4 overflow-hidden">
            <div className="flex flex-1 flex-col flex-wrap overflow-hidden">
              <TitleAndValue
                value={hostName}
                title="Host Name:"
                marginTopValue={0}
                classNameTitle={`flex flex-col`}
              />
              <TitleAndValue 
                marginTopValue={8}
                value={meetingName}
                title="Meeting Name:"
                classNameTitle={`flex flex-col`}
              />
              <IconAndValue
                text={`${duration} minutes`}
                marginTopValue={8}
                iconSrc="/16X16/scheduleClock16.svg"
              />
              <IconAndValue
                marginTopValue={8}
                inOneValueLine={false}
                iconSrc="/16X16/videoCam16.svg"
                text="Web Conferencing Provided Upon Confirmation"
              />
              <p
                className="w-full mt-4 text-lg text-slate-700 font-semibold overflow-y-auto overflow-x-hidden text-ellipsis"
              >
                {eventAgenda}
              </p>
            </div>
            <div className="w-4"></div>
            <div className="flex flex-1 flex-col pl-2">
              <label className="text-lg font-semibold text-slate-600">
                Host's available times
              </label>
              <ColumnSelectValues
                valueKey="date"
                allowClick={true}
                subValueKey="time"
                subValueskey="times"
                values={filteredDates}
                className="flex-1 mt-4"
                onSelectValue={onSelectFilteredDates}
                initialSelectedValue={initialAppiontmentValue}
              />
              <RoundedFilledButton
                paddingValue={8}
                onClick={onClickContinue}
                allowContinue={allowContinue}
                className={`mt-4 font-bold w-fit p-4 self-end`}
              >Continue</RoundedFilledButton>
            </div>
          </div>
        </RoundedCard>
      </div>
    )
  }
}