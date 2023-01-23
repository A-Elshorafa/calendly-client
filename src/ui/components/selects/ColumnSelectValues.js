import React, { Component } from "react";
import { SelectsButton } from "../buttons";

export default class ColumnSelectValues extends Component
{
  constructor(props) {
    super(props);

    this.state = {
      selectedSingleValue: {}
    }
  }

  handleSelectValue(value, subValue) {
    if (this.state.selectedSingleValue.date === value &&
       this.state.selectedSingleValue.time === subValue) {
        // remove found values
        this.setState({selectedSingleValue: {
          date: "",
          time: ""
        }});
    } else {
      this.setState({selectedSingleValue: {
        date: value,
        time: subValue
      }});
    }
    this.props.onSelectValue(this.state.selectedSingleValue);
  }

  render() {
    const {values, valueKey, className, subValueskey} = this.props;
    return (
      <div className={`h-full overflow-y-auto overflow-x-hidden ${className}`}>
        {values && values.length > 0 && values.map((value, valueIndex) => {
          return ( 
            <div key={valueIndex} className={`flex flex-col items-start ${valueIndex !== 0? 'mt-2' : ''}`}>
              <label className="w-full text-slate-600 text-lg font-semibold border-b-2 border-slate-600 border-solid">{value[valueKey]}</label>
              <div className="flex flex-row flex-wrap items-center justify-start mt-2">
                {value[subValueskey] && value[subValueskey].length > 0 && value[subValueskey].map((subValue, subValueIndex) =>
                    <SelectsButton
                      value={subValue}
                      key={`${value[valueKey]}-${subValue}`}
                      onClick={() => this.handleSelectValue(value, subValue)}
                      isLastElement={subValueIndex === value[subValueskey].length-1}
                      isSelected={this.state.selectedSingleValue.date === value &&
                        this.state.selectedSingleValue.time === subValue}
                    />
                  )
                }
              </div>
            </div>
          )})
        }
      </div>
    )
  }
}