import React, { useEffect, useState } from "react";
import SingleSelectCore from './partials/SingleSelectCore';
import SelectHeaderComponent from "./partials/SelectHeaderComponent";

export default ({
  name,
  label,
  values,
  className,
  onSelectValue,
  openedSelectTitle,
  onChangeAppereance,
  initialSelectedValues
}) => {
  const [isSelectedState, setIsSelectState] = useState(false);
  const [selectedValue, setSelectedValue] = useState(initialSelectedValues);
  useEffect(() => {
    setIsSelectState(openedSelectTitle === name)
  }, [openedSelectTitle])
  const handleSelectValue = (value) => {
    setSelectedValue(value);
    setTimeout(() => {
      setIsSelectState(false);
      onSelectValue(value, name);
    }, 100)
  }

  const handleChangeAppearance = () => {
    setIsSelectState(!isSelectedState)
    onChangeAppereance(name);
  }

  return (
    <div className={className}>
      <label className="block text-lg text-gray-700 font-bold">{label}</label>
      <div className="relative mt-1">
        <SelectHeaderComponent
          textString={selectedValue && selectedValue.value>0? `${selectedValue.value} ${selectedValue.string}` : ''}
          onClick={handleChangeAppearance}
          isSelectedState={isSelectedState}
        />
        {isSelectedState &&
          <SingleSelectCore
            values={values}
            onSelect={handleSelectValue}
            selectedValue={selectedValue}
          />
        }
      </div>
    </div>
  )
}