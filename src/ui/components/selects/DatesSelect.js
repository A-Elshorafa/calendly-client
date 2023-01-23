import Image from "next/image";
import React, { Component } from "react";
import { SelectsButton } from "../buttons";

export default class DatesSelect extends Component {
  constructor(props) {
    super(props);
    this.state = {
      selectedValues: [],
      isSelectedState: false,
      selectedValuesString: [],
    }
  }

  componentDidUpdate(prevProps, prevState) {
    // to ensure selected dates updated
    if (prevState.selectedValues !== this.state.selectedValues) {
      this.props.onSelectDate(this.state.selectedValues);
      this.setState({selectedValuesString: this.getSelectedString()})
    }
  }

  handleSelectDateTime(date, time) {
    const value = {date, time};
    const elementIndex = 
      this.state.selectedValues.findIndex(ele => ele.date===date && ele.time === time);
    if (elementIndex === -1) {
      const currentValue = this.state.selectedValues.filter(_ => true);
      currentValue.push(value);
      this.setState({selectedValues: currentValue});
    } else {
      const oldValue = this.state.selectedValues.filter(_ => true);
      oldValue.splice(elementIndex, 1);
      this.setState({selectedValues: oldValue});
    }

    this.getSelectedString();
  }

  getSelectedString() {
    let value = "";
    value = this.state.selectedValues.slice(0, 3).reduce((accumulator, current, index) => {
      const dateTimeString = current.date.concat(' ', current.time);
      console.log('datetime: ', dateTimeString);
      return accumulator.concat(index !==0 ?", " : "", dateTimeString);
    }, "")
    if (this.state.selectedValues.length > 3) {
      value = value + ' ...'
    }

    return value;
  }

  render() {
    const {dates, label, className} = this.props;
    return (
      <div className={className}>
        <label id="listbox-label" className="block text-lg text-gray-700 font-bold">{label}</label>
        <div className="relative mt-1">
          <button onClick={()=>{this.setState({isSelectedState: !this.state.isSelectedState})}} type="button" className="relative w-full cursor-default rounded-md border border-gray-300 bg-white px-4 py-6 text-left shadow-sm focus:border-indigo-500 focus:outline-none focus:ring-1 focus:ring-indigo-500" aria-haspopup="listbox" aria-expanded="true" aria-labelledby="listbox-label">
            <div className="flex flex-row items-center justify-between w-full absolute inset-y-0 left-0 px-2 overflow-hidden text-ellipsis">
              <label className="text-lg aria-checked:font-bold aria-checked:text-blue-600 whitespace-nowrap text-ellipsis" aria-checked={this.state.selectedValuesString !== ""}>{this.state.selectedValuesString}</label>
              {this.state.isSelectedState?
                <Image
                  alt=""
                  width={16}
                  height={16}
                  src="/16X16/grayArrowUp16.svg"
                /> :
                <Image
                  alt=""
                  width={16}
                  height={16}
                  src="/16X16/grayArrowDown16.svg"
                />
              }
            </div>
          </button>
        {this.state.isSelectedState &&
          <ul className="absolute z-10 mt-1 max-h-48 w-full overflow-auto rounded-md bg-white py-1 shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none sm:text-sm" aria-labelledby="listbox-label" aria-activedescendant="listbox-option-3">
            {dates && dates.length > 0 && dates.map(date => (
              <li key={date.value} className="text-gray-900 relative cursor-default select-none py-2 pl-3 pr-9">
                <div className="border-b-2 text-lg border-gray-400">{date?.value}</div>
                <br/>
                  {date.times && date.times.length > 0 && date.times.map((time, index) => (
                   <SelectsButton
                      key={index}
                      value={time}
                      isLastElement={index === date.times.length-1}
                      onClick={() => this.handleSelectDateTime(date?.value, time)}
                      isSelected={this.state.selectedValues.find(ele => ele.date===date?.value && ele.time === time) !== undefined}
                    />
                  ))}
              </li>
            ))}
          </ul>
          }
        </div>
      </div>
    )
  }
}