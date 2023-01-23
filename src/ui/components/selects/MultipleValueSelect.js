import Image from "next/image";
import React, { Component} from "react";
import { LabeledRadioButton } from "../buttons";

export default class MultipleValueSelect extends Component {
  constructor(props) {
    super(props);
    this.state = {
      selectedValues: [],
      isSelectedState: false,
      selectedValuesString: ""
    }
  }

  componentDidUpdate(prevProp, prevState) {
    // to insure that the selectedValues (array) updated
    if(prevState.selectedValues != this.state.selectedValues) {
      this.getSelectedString()
      this.props.onSelectValue(this.state.selectedValues);
    }
  };
  
  handleSelectValue(value) {
    if (!this.state.selectedValues.includes(value)) {
      const newValues = this.state.selectedValues.filter(_ => true);
      newValues.push(value);
      this.setState({selectedValues: newValues});
    } else {
      const temporaryArray = this.state.selectedValues.filter(_ => true);
      const valueIndex = this.state.selectedValues.indexOf(value);
      temporaryArray.splice(valueIndex, 1);
      this.setState({selectedValues: temporaryArray});
    }
    this.getSelectedString()
  }

  getSelectedString() {
    let valueString = "";
    valueString = this.state.selectedValues.slice(0, 5).reduce((accumulator, current, index) =>
      accumulator.concat(index !==0 ?", " : "", current),"")

    if (this.state.selectedValues.length > 5) {
      valueString = valueString + ' ...'
    }
    this.setState({selectedValuesString: valueString});
  }

  render() {
    const {values, label, className} = this.props;
    return (
      <div className={className}>
        <label id="listbox-label" className="block text-lg text-gray-700 font-bold">{label}</label>
          <div className="relative mt-1">
          <button 
            type="button"
            aria-expanded="true"
            aria-haspopup="listbox"
            aria-labelledby="listbox-label"
            onClick={()=>{this.setState({isSelectedState: !this.state.isSelectedState})}}
            className="relative w-full cursor-default rounded-md border border-gray-300 bg-white px-4 py-6 text-left shadow-sm focus:border-indigo-500 focus:outline-none focus:ring-1 focus:ring-indigo-500"
          >
            <div className="flex flex-row items-center justify-between w-full absolute inset-y-0 left-0 px-2 overflow-hidden">
              <label className="text-lg aria-checked:font-bold aria-checked:text-blue-600 whitespace-nowrap text-ellipsis" aria-checked={this.state.selectedValues.length > 0}>{this.state.selectedValuesString}</label>
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
          <ul 
            className="absolute z-10 mt-1 max-h-56 w-full overflow-auto rounded-md bg-white py-1 shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none sm:text-sm"
            aria-labelledby="listbox-label"
            aria-activedescendant="listbox-option-3"
          >
            {values && values.length > 0 && values.map((value, index) => (
              <li key={index} className="flex flex-row items-center relative cursor-pointer py-2 pl-2 hover:bg-gray-200" onClick={()=>this.handleSelectValue(value, index)}>
                <LabeledRadioButton
                  value={value}
                  isSelected={this.state.selectedValues.includes(value)}
                />
              </li>
            ))}
          </ul>
          }
        </div>
      </div>
    );
  }
}