import React from "react";
import { LabeledRadioButton } from "../../buttons";

export default ({
  values,
  onSelect,
  selectedValues
}) => {
  return (
    <ul 
      aria-labelledby="listbox-label"
      aria-activedescendant="listbox-option-3"
      className="absolute z-10 mt-1 max-h-56 w-full overflow-auto rounded-md bg-white py-1 shadow-lg border-solid border border-gray-300 focus:outline-none sm:text-sm"
    >
      {values?.length > 0 && values.map((value, index) => (
        <li 
          key={index}
          onClick={()=>onSelect(value, index)}
          className="flex flex-row items-center relative cursor-pointer py-2 pl-2 hover:bg-gray-200"
        >
          <LabeledRadioButton
            value={value}
            isSelected={selectedValues.includes(value)}
          />
        </li>
      ))}
    </ul>
  )
}