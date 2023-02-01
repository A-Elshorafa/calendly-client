import moment from "moment";
import React, { Component} from "react";
import MultipleSelectCore from "./partials/MultipleSelectCore";
import SelectHeaderComponent from "./partials/SelectHeaderComponent";

export default class MultipleValueSelect extends Component {
  constructor(props) {
    super(props);
    this.state = {
      isSelectedState: false,
      selectedValuesString: "",
    }

    this.getSelectedString = this.getSelectedString.bind(this);
    this.handleSelectValue = this.handleSelectValue.bind(this);
    this.handleOnClickHeader = this.handleOnClickHeader.bind(this);
  }

  componentDidMount() {
    // get the values string if the initial values not empty
    if (this.props.selectedValues !== []) {
      this.getSelectedString();
    }
  }

  componentDidUpdate(prevProp) {
    const {name, openedSelectTitle, selectedValues} = this.props;
    // sync with another selects on the same page
    if (openedSelectTitle !== prevProp.openedSelectTitle && openedSelectTitle !== name) {
      this.setState({isSelectedState: false});
    }
    // updated selected data string state when props changed
    if (selectedValues.length !== prevProp.selectedValues.length && selectedValues.length !== 0) {
      this.getSelectedString()
    }
  };
  
  handleSelectValue(value) {
    const ACTIONS = {PUSH: 0, SUBTRACT: 1};
    const {selectedValues, onSelectValue} = this.props;
    
    const elementIndex = selectedValues.indexOf(value);
    const ACTION = elementIndex === -1?  ACTIONS.PUSH :  ACTIONS.SUBTRACT;
    
    if (ACTION === ACTIONS.PUSH) {
      const pushIndex = selectedValues.findIndex(ele => moment(value).isBefore(moment(ele)));
      
      onSelectValue({value, elementIndex: pushIndex, ACTION: ACTIONS.PUSH})
    } else {
      onSelectValue({value, elementIndex, ACTION: ACTIONS.SUBTRACT})
    }
    this.getSelectedString()
  }

  handleOnClickHeader() {
    this.setState({isSelectedState: !this.state.isSelectedState});
    this.props.onChangeAppereance(this.props.name);
  }

  getSelectedString() {
    let valueString = "";
    const {selectedValues} = this.props;

    valueString = selectedValues.slice(0, 5).reduce((accumulator, current, index) =>
      accumulator.concat(index !==0 ?", " : "", current),"")

    if (selectedValues.length > 5) {
      valueString = valueString + ' ...'
    }
    
    this.setState({selectedValuesString: valueString});
  }

  render() {
    const {isSelectedState} = this.state;
    const {values, title, className, selectedValues} = this.props;
    return (
      <div className={className}>
        <label id="listbox-label" className="block text-lg text-gray-700 font-bold">{title}</label>
          <div className="relative mt-1">
          <SelectHeaderComponent
            onClick={this.handleOnClickHeader}
            textString={this.state.selectedValuesString}
            isSelectedState={isSelectedState}
          />
          {isSelectedState &&
            <MultipleSelectCore
              values={values}
              selectedValues={selectedValues}
              onSelect={this.handleSelectValue}
            />
          }
        </div>
      </div>
    );
  }
}