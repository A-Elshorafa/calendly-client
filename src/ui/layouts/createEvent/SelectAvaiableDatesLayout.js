import React, {Component} from "react";
import { CardTitle } from "@/ui/components/label";
import { RoundedCard } from "@/ui/components/cards";
import { RoundedFilledButton } from "@/ui/components/buttons";
import { DurationSelection } from "@/ui/components/actionComponents";
import { DatesSelect, SingleValueSelect, ColumnSelectValues } from "../../components/selects";

export default class SelectAvaiableDatesLayout extends Component
{
  constructor(props) {
    super(props);

    this.state = {
      openedSelectTitle: ""
    }
    this.handleChangeSelectedComponent = this.handleChangeSelectedComponent.bind(this)
  }

  handleChangeSelectedComponent(name) {
    this.setState({openedSelectTitle: name})
  }

  render() {
    const {
      // data
      dates,
      durations,
      filteredDates,
      allowContinue,
      // call backs
      onSelectDate,
      onSelectDuration,
      onClickContinue,
      onChangeToDuration,
      onChangeFromDuration,
      onSelectFilteredDates,
      // initial values
      selectedDates,
      selectedDuration,
      initialToDuration,
      initialFromDuration,
      selectedFilteredDatesAndTimes,
    } = this.props;
    return (
      <div className="flex justify-center py-8 bg-gray-400 h-full">
        <RoundedCard
          className="px-10 py-5 w-8/12 h-full flex flex-col rounded-xl bg-white">
          <CardTitle title="Create Event (Select Available Dates)" />
          <div className="w-full h-full flex flex-row flex-1 justify-between overflow-hidden">
            <div className="h-full flex-1 flex flex-col items-start">
              <DurationSelection
                name="timeRange"
                maxLeftValue={24}
                maxRightValue={24}
                rightTitle="to (24)"
                leftPlaceholder="HH"
                leftTitle="from (24)"
                rightPlaceholder="HH"
                onChangeRightInput={onChangeToDuration}
                initialRightDuration={initialToDuration}
                onChangeLeftInput={onChangeFromDuration}
                initialLeftDuration={initialFromDuration}
                onFocusLeft={()=>this.handleChangeSelectedComponent("")}
                onFocusRight={()=>this.handleChangeSelectedComponent("")}
              />
              <SingleValueSelect
                name="duration"
                values={durations}
                className="mt-2 w-full flex-1"
                label="Choose Event Duration"
                onSelectValue={onSelectDuration}
                initialSelectedValues={selectedDuration}
                openedSelectTitle={this.state.openedSelectTitle}
                onChangeAppereance={this.handleChangeSelectedComponent}
              />
              <DatesSelect 
                name="dates"
                values={dates}
                className="w-full flex-1"
                onSelectValue={onSelectDate}
                selectedValues={selectedDates}
                title="Select All Available Days"
                subTitle="choose from next month days"
                openedSelectTitle={this.state.openedSelectTitle}
                onChangeAppereance={this.handleChangeSelectedComponent}
              />
            </div>
            <div className="w-4"></div>
            <div className="flex-1 flex flex-col items-start">
              <label className="flex flex-col text-lg font-semibold text-slate-600">
                Host's available times
                <span className="text-sm text-gray-500">(09:00 - 17:00) default, only the future times appears</span>
              </label>
              <ColumnSelectValues
                valueKey="date"
                allowClick={true}
                subValueKey="time"
                subValueskey="times"
                values={filteredDates}
                allowMultipleSelects={true}
                onSelectMultipleValues={onSelectFilteredDates}
                selectedValues={selectedFilteredDatesAndTimes}
                className="flex-1 mt-4 overflow-y-auto overflow-x-auto w-full"
              />
            </div>
          </div>
          <RoundedFilledButton
            paddingValue={8}
            onClick={onClickContinue}
            allowContinue={allowContinue}
            className={`font-bold w-fit p-4 self-end mt-4`}
          >Continue</RoundedFilledButton>
        </RoundedCard>
      </div>
    )
  }
}