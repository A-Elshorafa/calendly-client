import React, { useState } from "react";

export default ({
  name, // for selects propose
  className,
  leftTitle,
  rightTitle,
  onFocusLeft,
  onFocusRight,
  maxLeftValue=0,
  maxRightValue=0,
  leftPlaceholder,
  rightPlaceholder,
  onChangeLeftInput,
  onChangeRightInput,
  initialLeftDuration,
  initialRightDuration
}) => {
  const [leftInputValue, setLeftInputValue] = useState(initialLeftDuration);
  const [rightInputValue, setRightInputValue] = useState(initialRightDuration);
  const checkEnteredLeftValue = (event) => {
    const value = event.target.value;
    if ((maxLeftValue && parseInt(value) > maxLeftValue) || parseInt(rightInputValue) <= parseInt(value) || !/^\d{0,}$/.test(value))
      return;

    setLeftInputValue(value);
    onChangeLeftInput(value, name);
  }

  const checkEnteredRightValue = (event) => {
    const value = event.target.value;
    if (maxRightValue && value > maxRightValue || !/^\d{0,}$/.test(value)) 
      return;

    setRightInputValue(value);
    onChangeRightInput(value, name);
  }

  return (
    <div className={`flex flex-row justify-center ${className}`}>
      <div className="flex flex-col items-center">
        <label className="text-slate-700 font-semibold text-md">{leftTitle}</label>
        <input
          onFocus={onFocusLeft}
          placeholder={leftPlaceholder}
          disabled={rightInputValue===-1}
          onChange={checkEnteredLeftValue}
          value={leftInputValue === -1? '' : leftInputValue}
          className={`w-20 p-2 align-center rounded-l-full border-2 border-gray-500 border-solid focus:border-blue-600 ${
            rightInputValue === -1? 'bg-gray-200' : ''}
          `}
        />
      </div>
      <div className="flex flex-col items-center">
        <label className="text-slate-700 font-semibold text-md">{rightTitle}</label>
        <input 
          onFocus={onFocusRight}
          placeholder={rightPlaceholder} 
          onChange={checkEnteredRightValue}
          value={rightInputValue === -1? '' : rightInputValue}
          className="w-20 p-2 align-center rounded-r-full border-2 border-gray-500 border-solid focus:border-blue-600"
        />
      </div>
    </div>
  )
}