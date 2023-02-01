import moment from "moment";
import React, { Component } from "react";
import { SelectsButton } from "../buttons";

export default class ColumnSelectValues extends Component
{
  constructor(props) {
    super(props);

    this.state = {
      selectedSingleValue: null
    }

    this.handleSelectValue = this.handleSelectValue.bind(this);
    this.handleSelectDateTime = this.handleSelectDateTime.bind(this);
    this.handleSelectSingleValue = this.handleSelectSingleValue.bind(this);
  }

  componentDidMount() {
    const {initialSelectedValue} = this.props;
    if (initialSelectedValue && initialSelectedValue !== this.state.selectedSingleValue) {
      this.setState({selectedSingleValue: initialSelectedValue})
    }
  }

  componentDidUpdate(prevProps, prevStates) {
    const {onSelectValue} = this.props;
    const {selectedSingleValue} = this.state;
    if(prevStates.selectedSingleValue?.date !== selectedSingleValue?.date ||
      prevStates.selectedSingleValue?.time !== selectedSingleValue?.time
    ) {
      if (typeof onSelectValue === 'function') {
        this.props.onSelectValue(selectedSingleValue);
      }
    }
  }

  handleSelectValue(value, subValue) {
    const {allowClick, allowMultipleSelects} = this.props;
    if (allowClick) {
      if (allowMultipleSelects) {
        this.handleSelectDateTime(value, subValue)
      } else {
        this.handleSelectSingleValue(value, subValue)
      }
    }
  }

  handleSelectSingleValue(value, subValue) {
    const {selectedSingleValue} = this.state;
    if (selectedSingleValue?.date === value &&
        selectedSingleValue?.time === subValue
      ) {
      this.setState({selectedSingleValue: null});
    } else {
      this.setState({selectedSingleValue: {
        date: value,
        time: subValue
      }});
    }
  }

  /**
   * will check 3 cases:
   * 1- first time to add date and time
   * 2- this date already exist with a time and will add another time
   * 3- remove a time from the date
   * 
   * @param string date
   * @param string time
  */
  handleSelectDateTime(date, time) {
    const ACTIONS = {PUSH: 0, DEL: 1};
    const {selectedValues, onSelectMultipleValues} = this.props;
    const dateIndex = selectedValues.findIndex(ele => ele && ele.date === date);
    const objectFounded = dateIndex !== -1;

    if (objectFounded) {
      const timeIndex = selectedValues[dateIndex]['times'].findIndex(ele => time === ele);
      if (timeIndex !== -1) {
        onSelectMultipleValues({value: null, objectFounded, dateIndex, timeIndex, ACTION: ACTIONS.DEL})
      } else {
        const filteredTimeIndex = selectedValues[dateIndex]['times'].findIndex(ele => moment(time, "kk:mm:ss").isBefore(moment(ele, "kk:mm:ss")));
        onSelectMultipleValues({value: time, objectFounded, dateIndex, timeIndex: filteredTimeIndex, ACTION: ACTIONS.PUSH})
      }
    } else {
      const timeIndex = -1;
      const value = {date, times: [time]};
      const dateIndex = selectedValues.findIndex(ele => ele && moment(date).isBefore(ele.date));
      onSelectMultipleValues({value, objectFounded, dateIndex, timeIndex, ACTION: ACTIONS.PUSH})
    }
  }

  render() {
    const {
      values,
      valueKey,
      className,
      allowClick,
      subValueKey,
      subValueskey,
      selectedValues,
      allowMultipleSelects
    } = this.props;
    const {selectedSingleValue} = this.state;
    return (
      <div className={`h-full overflow-y-auto overflow-x-hidden ${className}`}>
        {values && values.length > 0 && values.map((value, valueIndex) => {
          return ( 
            <div key={valueIndex} className={`flex flex-col items-start ${valueIndex !== 0? 'mt-2' : ''}`}>
              <label
                className="w-full text-gray-400 text-lg font-semibold border-b-2 border-gray-400 border-solid"
              >
                {value[valueKey]}
              </label>
              <div
                className="w-full grid sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-2 items-center justify-start mt-2"
              >
                {value[subValueskey] && value[subValueskey].length > 0 && value[subValueskey].map((subValue) =>
                  <SelectsButton
                    allowClick={allowClick}
                    value={subValue[subValueKey]}
                    key={`${value[valueKey]}-${subValue[subValueKey]}`}
                    onClick={() => this.handleSelectValue(value[valueKey], subValue[subValueKey])}
                    isSelected={selectedValues && allowMultipleSelects?
                      selectedValues.findIndex(ele => ele && ele.date === value[valueKey] && ele.times.includes(subValue[subValueKey])) !== -1
                    :
                      selectedSingleValue?.date === value[valueKey] && selectedSingleValue?.time === subValue[subValueKey]
                    }
                  />
                )}
              </div>
            </div>
          )})
        }
      </div>
    )
  }
}