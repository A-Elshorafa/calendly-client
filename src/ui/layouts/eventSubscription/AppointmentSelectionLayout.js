import React, {Component} from "react";
import { RoundedCard } from "@/ui/components/cards";
import { RoundedButton } from "@/ui/components/buttons";
import { ColumnSelectValues } from "../../components/selects";
import { IconAndValue, TitleAndValue } from "@/ui/components/label";

export default class AppointmentSelectionLayout extends Component
{
  render() {
    const {
      duration,
      hostName,
      meetingName,
      filteredDates,
      allowContinue,
      onClickContinue,
      onSelectFilteredDates
    } = this.props;
    return (
      <div className="flex justify-center py-8 bg-gray-400 h-full">
        <RoundedCard paddingValue={14} className="w-5/12 h-full flex flex-col p-8 rounded-xl bg-white">
          <label className="text-3xl text-center">Event Subscription</label>
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
            </div>
            <div className="flex flex-1 flex-col pl-2">
              <label className="text-lg font-semibold text-slate-600">
                Host's available times
              </label>
              <ColumnSelectValues
                valueKey="date"
                subValueskey="times"
                values={filteredDates}
                className="flex-1 mt-4"
                onSelectValue={onSelectFilteredDates}
              />
            </div>
          </div>
          <RoundedButton
            paddingValue={8}
            onClick={allowContinue? onClickContinue : null}
            className={`${allowContinue? 'bg-indigo-500 hover:text-white hover:bg-indigo-700': 'bg-gray-500 cursor-default' } mt-4 font-bold w-fit p-4 self-end`}
          >Continue</RoundedButton>
        </RoundedCard>
      </div>
    )
  }
}