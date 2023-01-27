import React, { useEffect, useState } from "react";
import { LabeledRadioButton } from "../buttons";
import SelectHeaderComponent from "./SelectHeaderComponent";

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
  const initialValue = initialSelectedValues.value !== 0?
    `${initialSelectedValues.value} ${initialSelectedValues.string}` : "";
  const [selectedValue, setSelectedValue] = useState(initialValue);
  const [isSelectedState, setIsSelectState] = useState(false);
  useEffect(() => {
    setIsSelectState(openedSelectTitle === name)
  }, [openedSelectTitle])
  const handleSelectValue = (value) => {
    setSelectedValue(`${value.value} ${value.string}`);
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
          textString={selectedValue}
          onClick={handleChangeAppearance}
          isSelectedState={isSelectedState}
        />
      {isSelectedState &&
        <ul className="absolute z-10 mt-1 max-h-28 w-full overflow-auto rounded-md bg-white py-1 shadow-lg ring-1 ring-black ring-opacity-5">
          {values && values.length > 0 && values.map((value, index) => (
            <li key={index} className="flex flex-row items-center text-gray-900 relative py-2 pl-3 pr-9" onClick={()=>handleSelectValue(value)}>
              <LabeledRadioButton
                isSelected={selectedValue === value}
                value={`${value.value} ${value.string}`}
              />
            </li>
          ))}
        </ul>
        }
      </div>
    </div>
  )
}