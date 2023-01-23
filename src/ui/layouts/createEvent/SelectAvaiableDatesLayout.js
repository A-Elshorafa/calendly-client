import React, {Component} from "react";
import { RoundedCard } from "@/ui/components/cards";
import { RoundedButton } from "@/ui/components/buttons";
import {DatesSelect, MultipleValueSelect, SingleValueSelect} from "../../components/selects";

export default class SelectAvaiableDatesLayout extends Component
{
  render() {
    const {
      dates,
      durations,
      onSelectDate,
      filteredDates,
      allowContinue,
      onClickContinue,
      onSelectDuration,
      onSelectFilteredDates
    } = this.props;
    return (
      <div className="flex justify-center py-8 bg-gray-400 h-full">
        <RoundedCard paddingValue={14} className="w-5/12  h-full flex flex-col p-8 rounded-xl bg-white">
          <label className="text-3xl text-center">Create Event (Select Available Dates)</label>
          <SingleValueSelect
            className="flex-1 mt-4"
            values={durations}
            label="Choose Event Duration"
            onSelectValue={onSelectDuration}
          />
          <MultipleValueSelect 
            values={dates}
            className="flex-1"
            onSelectValue={onSelectDate}
            label="Select All Available Days"
          />
          <DatesSelect
            className="flex-1"
            dates={filteredDates}
            allowMultipleSelect={true}
            onSelectDate={onSelectFilteredDates}
            label="Select All Available times in days"
          />
          <RoundedButton
            paddingValue={8}
            onClick={allowContinue? onClickContinue : null}
            className={`${allowContinue? 'bg-indigo-500 hover:text-white hover:bg-indigo-700': 'bg-gray-500 cursor-default' } font-bold w-fit p-4 self-end`}
          >Continue</RoundedButton>
        </RoundedCard>
      </div>
    )
  }
}