import React, { Component } from "react";
import {SelectAvaiableDatesLayout}  from "../../ui/layouts";

export default class SelectAvaiableDates extends Component {
  constructor(props) {
    super(props);
    this.state = {
      selectedDates: [],
      allowContinue: false,
      selectedDuration: -1,
      selectedFilteredDates: [],
    }
  }
  componentDidUpdate(prevProp, prevState) {
    // any of selectedDates or selectedFilteredDates updated
    if (prevState.selectedDates !== this.state.selectedDates || prevState.selectedFilteredDates !== this.state.selectedFilteredDates) {
      const allowContinue = this.state.selectedDuration !== -1 &&
        this.state.selectedDates.length > 0 &&
        this.state.selectedFilteredDates.length > 0;
      this.setState({allowContinue: allowContinue})
    }
  }
  render() {
    return (
      <SelectAvaiableDatesLayout
        dates={["22-12-2022", "22-12-2023", "22-12-2019", "22-12-2012", "22-12-202", "22-12-2025", "22-12-2015", "22-12-2017", "22-12-2019", "22-12-2027", "22-12-2028", "22-12-2029"]}
        durations={['15 Minutes', '30 Minutes', '45 Minutes', '60 Minutes']}
        onSelectDate={dates=>{this.setState({selectedDates: dates})}}
        filteredDates={this.state.selectedDuration === -1 || this.state.selectedDates.length === 0? [] : [
          {value: "22-12-2022", times: ["16:00:00", "16:15:00", "16:30:00", "16:45:00"]},
          {value: "22-12-2023", times: ["16:00:00", "16:15:00", "16:30:00", "16:45:00"]},
          {value: "22-12-2024", times: ["16:00:00", "16:15:00", "16:30:00", "16:45:00"]}
        ]}
        onSelectDuration={duration=>{this.setState({selectedDuration: duration}); console.log("selectedDuration: ", duration)}}
        onSelectFilteredDates={dates => {this.setState({selectedFilteredDates: dates}); console.log('incomingDates: ', dates)}}
        onClickContinue={()=>{console.log("click continue")}}
        allowContinue={this.state.allowContinue}
      />
    )
  }
} 