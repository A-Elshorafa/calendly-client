import React, { Component } from "react";
import { SelectsButton } from "../buttons";

export default class ColumnSelectValues extends Component
{
  constructor(props) {
    super(props);

    this.state = {
      selectedSingleValue: null
    }
  }

  componentDidMount() {
    const {initialSelectedValue} = this.props;
    if (initialSelectedValue && initialSelectedValue !== this.state.selectedSingleValue) {
      this.setState({selectedSingleValue: initialSelectedValue})
    }
  }

  componentDidUpdate(prevProps, prevStates) {
    const {selectedSingleValue} = this.state;
    if(prevStates.selectedSingleValue?.date !== selectedSingleValue?.date ||
      prevStates.selectedSingleValue?.time !== selectedSingleValue?.time
    ) {
      this.props.onSelectValue(selectedSingleValue);
    }
  }

  handleSelectValue(value, subValue) {
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

  render() {
    const {values, valueKey, className, subValueskey, subValueKey} = this.props;
    return (
      <div className={`h-full overflow-y-auto overflow-x-hidden ${className}`}>
        {values && values.length > 0 && values.map((value, valueIndex) => {
          return ( 
            <div key={valueIndex} className={`flex flex-col items-start ${valueIndex !== 0? 'mt-2' : ''}`}>
              <label className="w-full text-slate-600 text-lg font-semibold border-b-2 border-slate-600 border-solid">{value[valueKey]}</label>
              <div className="flex flex-row flex-wrap items-center justify-start mt-2">
                {value[subValueskey] && value[subValueskey].length > 0 && value[subValueskey].map((subValue, subValueIndex) =>
                  <SelectsButton
                    value={subValue[subValueKey]}
                    key={`${value[valueKey]}-${subValue[subValueKey]}`}
                    onClick={() => this.handleSelectValue(value[valueKey], subValue[subValueKey])}
                    isLastElement={subValueIndex === value[subValueskey].length-1}
                    isSelected={this.state.selectedSingleValue?.date === value[valueKey] &&
                      this.state.selectedSingleValue?.time === subValue[subValueKey]}
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