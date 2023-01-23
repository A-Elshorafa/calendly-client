import Image from "next/image";
import React, { useState } from "react";
import { LabeledRadioButton } from "../buttons";

export default ({values, label, className, onSelectValue}) => {
  const [selectedValue, setSelectedValue] = useState([]);
  const [isSelectedState, setIsSelectState] = useState(false);
  const handleSelectValue = (value) => {
    setSelectedValue(value);
    setTimeout(() => {
      onSelectValue(value);
      setIsSelectState(false);
    }, 100)
  }

  return (
    <div className={className}>
      <label className="block text-lg text-gray-700 font-bold">{label}</label>
      <div className="relative mt-1">
        <button 
          type="button"
          aria-expanded="true"
          aria-haspopup="listbox"
          aria-labelledby="listbox-label"
          onClick={()=>{setIsSelectState(!isSelectedState)}}
          className="relative w-full cursor-default rounded-md border border-gray-300 bg-white px-4 py-6 text-left shadow-sm focus:border-indigo-500 focus:outline-none focus:ring-1 focus:ring-indigo-500"
        >
          <div className="flex flex-row items-center justify-between w-full absolute inset-y-0 left-0 px-2">
            <label className="text-lg aria-checked:font-bold aria-checked:text-blue-600" aria-checked={selectedValue !== ""}>{selectedValue}</label>
            {isSelectedState?
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
      {isSelectedState &&
        <ul className="absolute z-10 mt-1 max-h-56 w-full overflow-auto rounded-md bg-white py-1 shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none sm:text-sm" aria-labelledby="listbox-label" aria-activedescendant="listbox-option-3">
          {values && values.length > 0 && values.map((value, index) => (
            <li key={index} className="flex flex-row items-center text-gray-900 relative py-2 pl-3 pr-9" onClick={()=>handleSelectValue(value)}>
              <LabeledRadioButton
                value={value}
                isSelected={selectedValue === value}
              />
            </li>
          ))}
        </ul>
        }
      </div>
    </div>
  )
}