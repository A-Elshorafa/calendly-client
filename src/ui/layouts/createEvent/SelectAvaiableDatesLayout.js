import React, {Component} from "react";
import { RoundedCard } from "@/ui/components/cards";
import { RoundedButton } from "@/ui/components/buttons";
import { DurationSelection } from "@/ui/components/actionComponents";
import { DatesSelect, MultipleValueSelect, SingleValueSelect } from "../../components/selects";

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
          className="px-24 py-5 w-5/12 h-full flex flex-col rounded-xl bg-white">
          <label className="text-3xl text-center font-bold">Create Event (Select Available Dates)</label>
          <div className="space-y-28 flex-1">
            <SingleValueSelect
              name="duration"
              className="mt-4"
              values={durations}
              label="Choose Event Duration"
              onSelectValue={onSelectDuration}
              initialSelectedValues={selectedDuration}
              openedSelectTitle={this.state.openedSelectTitle}
              onChangeAppereance={this.handleChangeSelectedComponent}
            />
            <MultipleValueSelect 
              name="dates"
              values={dates}
              onSelectValue={onSelectDate}
              title="Select All Available Days"
              selectedValues={selectedDates}
              openedSelectTitle={this.state.openedSelectTitle}
              onChangeAppereance={this.handleChangeSelectedComponent}
            />
            <div className="w-full flex  flex-col items-center">
              <DurationSelection
                name="timeRange"
                maxLeftValue={24}
                maxRightValue={24}
                rightTitle="to (24)"
                className="self-end"
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
              <DatesSelect
                className="w-full"
                name="filteredDates"
                dates={filteredDates}
                allowMultipleSelect={true}
                onSelectDate={onSelectFilteredDates}
                label="Select All Available times in days"
                selectedValues={selectedFilteredDatesAndTimes}
                openedSelectTitle={this.state.openedSelectTitle}
                onChangeAppereance={this.handleChangeSelectedComponent}
                titleNote=" (09:00 - 17:00) default, only the future times appears"
              />
            </div>
          </div>
          <RoundedButton
            paddingValue={8}
            onClick={onClickContinue}
            allowContinue={allowContinue}
            className={`font-bold w-fit p-4 self-end`}
          >Continue</RoundedButton>
        </RoundedCard>
      </div>
    )
  }
}