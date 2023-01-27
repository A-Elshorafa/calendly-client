import { toJS } from "mobx";
import moment from "moment/moment";
import { observer } from "mobx-react";
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
    const {router, userStore} = this.props;
    if (userStore.id === "") {
      router.replace('/events-dashboard');
    }

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
      setSelectedAvailableDatesAndTimes
    } = this.props.eventStore;

    if (selectedAvailableDatesAndTimes.length !== 0) {
      setSelectedAvailableDatesAndTimes([]);
    }
    setSelectedDuration(duration);
    this.getFilteredDates()
  }

  handleOnClickContinue() {
    const {router} = this.props;
    router.push("/create-event/meeting-summary")
  }

  handleSelectDate(object) {
    const {
      setSelectedDates,
      selectedAvailableDatesAndTimes,
      setSelectedAvailableDatesAndTimes
    } = this.props.eventStore;

    if (selectedAvailableDatesAndTimes.length !== 0) {
      setSelectedAvailableDatesAndTimes([]);
    }
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
      setSelectedAvailableDatesAndTimes
    } = this.props.eventStore;

    if (selectedAvailableDatesAndTimes.length !== 0) {
      setSelectedAvailableDatesAndTimes([]);
    }
    setHoursRangeTo(value);
    this.getFilteredDates();
  }

  handleChangeFromDuration(value) {
    const {
      setHoursRangeFrom,
      selectedAvailableDatesAndTimes,
      setSelectedAvailableDatesAndTimes
    } = this.props.eventStore;

    if (selectedAvailableDatesAndTimes.length !== 0) {
      setSelectedAvailableDatesAndTimes([]);
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
      // from: 9am to:5pm as default with iso will +2
      let from = hoursRangeFrom !==-1 ? parseInt(hoursRangeFrom) : 9;
      let to = hoursRangeTo !== -1? parseInt(hoursRangeTo) : 17;
      to = to < 10? "0".concat(to) : to;
      from = from < 10? "0".concat(from) : from;
      const durationInMinutes = (to - from) * 60;
      const numberOfDurations = (durationInMinutes / selectedDuration.value) + 1; // to add the end(to) time
      let generatedTimes = [];
      const filteredDatesAndTimes = [];
      const currentMinuteInDuration = (Math.ceil(moment().minute() / 15) % 4);
      let startMinutes = currentMinuteInDuration * selectedDuration.value;
      startMinutes = startMinutes > 12 ? startMinutes : "0".concat(startMinutes)
      selectedDates.forEach(date => {
        if (moment(date.concat(`T${from}:${startMinutes}:00Z`)).isSameOrBefore(moment())) {
          // handle iso date form
          startDate = moment(`${date} ${from}:${startMinutes}:00`, "YYYY-MM-DD kk:mm:ss", true);
        } else {
          startDate = moment(`${date} ${from}:00:00`, "YYYY-MM-DD kk:mm:ss", true)
        }
        generatedTimes = [];
        for(let t=0; t < numberOfDurations; t++) {
          const duration = t === 0? 0 : selectedDuration.value;
          compositeTime = startDate.add(duration, 'minutes').format('HH:mm:ss')
          const isoFormat = date.concat('T', compositeTime, '+02:00');
          // only in the future dates
          if (moment().isSameOrBefore(moment(isoFormat)))
            generatedTimes.push(compositeTime);
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