import { toJS } from "mobx";
import moment from "moment/moment";
import { observer } from "mobx-react";
import pages from "@/constants/pages";
import React, { Component } from "react";
import {SelectAvaiableDatesLayout}  from '@/ui/layouts';

class SelectAvaiableDatesView extends Component {
  constructor(props) {
    super(props);
    this.state = {
      monthDays: [],
      allowContinue: false
    }

    this.handleSelectDate = this.handleSelectDate.bind(this);
    this.getFilteredDates = this.getFilteredDates.bind(this);
    this.handleSelectDuration = this.handleSelectDuration.bind(this);
    this.handleOnClickContinue = this.handleOnClickContinue.bind(this);
    this.handleChangeToDuration = this.handleChangeToDuration.bind(this);
    this.handleChangeFromDuration = this.handleChangeFromDuration.bind(this);
    this.handleOnSelectFilteredDates = this.handleOnSelectFilteredDates.bind(this);
  }

  componentDidMount() {
    const {router, userStore, eventStore} = this.props;
    if (userStore.id === -1) {
      router.replace('/events-dashboard');
    }
    router.beforePopState(({url}) => {
      if (url !== pages.SELECT_AVAILABLE_DATES && url !== pages.MEETING_DETAILS) {
        eventStore.clearData();
      }

      return true;
    })
    this.getCurrentMonthDays();
  }

  componentWillUnMount() {
    const {eventStore} = this.props;
    eventStore.clearData();
  }

  handleSelectDuration(duration) {
    const {
      setSelectedDuration,
      selectedAvailableDatesAndTimes,
      clearSelectedAvailableDatesAndTimes
    } = this.props.eventStore;

    if (selectedAvailableDatesAndTimes.length !== 0) {
      clearSelectedAvailableDatesAndTimes();
    }
    setSelectedDuration(duration);
    this.getFilteredDates()
  }

  handleOnClickContinue() {
    const {router} = this.props;
    router.push("/create-event/meeting-summary")
  }

  handleSelectDate(object) {
    const {setSelectedDates} = this.props.eventStore;

    setSelectedDates(object);
    this.getFilteredDates()
  }

  handleOnSelectFilteredDates(actionsObject) {
    const {eventStore} = this.props;
    eventStore.setSelectedAvailableDatesAndTimes(actionsObject);
  }

  handleChangeToDuration(value) {
    const {
      setHoursRangeTo,
      selectedAvailableDatesAndTimes,
      clearSelectedAvailableDatesAndTimes
    } = this.props.eventStore;

    if (selectedAvailableDatesAndTimes.length !== 0) {
      clearSelectedAvailableDatesAndTimes();
    }
    setHoursRangeTo(value);
    this.getFilteredDates();
  }

  handleChangeFromDuration(value) {
    const {
      setHoursRangeFrom,
      selectedAvailableDatesAndTimes,
      clearSelectedAvailableDatesAndTimes
    } = this.props.eventStore;

    if (selectedAvailableDatesAndTimes.length !== 0) {
      clearSelectedAvailableDatesAndTimes();
    }
    setHoursRangeFrom(value);
    this.getFilteredDates();
  }

  getCurrentMonthDays() {
    // from current day add a month and get days
    const montheDays = moment().add(1, "month").diff(moment(), "days");
    const dates = [];
    for(let i =0; i< montheDays; i++) {
      dates.push(moment().add(1 * i, 'day').format('YYYY-MM-DD'));
    }
    this.setState({monthDays: dates});
  }

  getHourMinutes() {
    const array = [];
    for (let i = 1; i <= 4; i++) {
      array.push({value: i * 15, string: "Minutes"})
    }
    return array;
  }

  getFilteredDates() {
    const {
      hoursRangeTo,
      selectedDates,
      hoursRangeFrom,
      selectedDuration,
      setAvailableDatesAndTimes
    } = this.props.eventStore;

    if (selectedDates && selectedDuration.value && hoursRangeFrom && hoursRangeTo) {
      let startDate = "";
      let compositeTime = "";
      // from: 9am to:5pm as default
      const to = hoursRangeTo < 10? "0".concat(hoursRangeTo) : hoursRangeTo;
      const from = hoursRangeFrom < 10? "0".concat(hoursRangeFrom) : hoursRangeFrom;

      // how many durations between from and to times
      // add 1 duration to get the exact "to" time, excpet it to 24 don't add it
      const durationInMinutes = (to - from) * 60;
      const numberOfDurations = (durationInMinutes / selectedDuration.value) + (to === "24" ? 0 : 1); 

      // intialize final value array
      const filteredDatesAndTimes = [];
      selectedDates.forEach(date => {
        // get start from date & time
        startDate = moment(`${date} ${from}`, "YYYY-MM-DD kk", true)
        
        // get next times from the start date and add duraions
        // only future times returned
        const generatedTimes = [];
        for(let t=0; t < numberOfDurations; t++) {
          // don't add duration first time to get the exact from
          const duration = t===0? 0 : selectedDuration.value;
          compositeTime = startDate.add(duration, 'minutes').format('HH:mm:ss')
          const isoFormat = date.concat('T', compositeTime, '+02:00');
          // only in the future dates
          if (moment().isSameOrBefore(moment(isoFormat)))
            generatedTimes.push({time: compositeTime});
          }
        filteredDatesAndTimes.push({date: date, times: generatedTimes})
      })
      setAvailableDatesAndTimes(filteredDatesAndTimes);
    }
  }

  render() {
    const {
      hoursRangeTo,
      selectedDates,
      hoursRangeFrom,
      selectedDuration,
      availableDatesAndTimes,
      selectedAvailableDatesAndTimes
    } = this.props.eventStore;

    return (
      <SelectAvaiableDatesLayout
        dates={this.state.monthDays}
        selectedDates={selectedDates}
        initialToDuration={hoursRangeTo}
        durations={this.getHourMinutes()}
        selectedDuration={selectedDuration}
        onSelectDate={this.handleSelectDate}
        initialFromDuration={hoursRangeFrom}
        onSelectDuration={this.handleSelectDuration}
        onClickContinue={this.handleOnClickContinue}
        onChangeToDuration={this.handleChangeToDuration}
        onChangeFromDuration={this.handleChangeFromDuration}
        selectedFilteredDatesAndTimes={toJS(selectedAvailableDatesAndTimes)}
        onSelectFilteredDates={dates => this.handleOnSelectFilteredDates(dates)}
        allowContinue={
          selectedDuration.value !== -1 &&
          selectedDates.length > 0 &&
          selectedAvailableDatesAndTimes.length > 0
        }
        filteredDates={
          selectedDuration.value !== -1 ||
          selectedDates.length !== 0 ?
          availableDatesAndTimes : []
        }
      />
    )
  }
}

export default observer(SelectAvaiableDatesView);