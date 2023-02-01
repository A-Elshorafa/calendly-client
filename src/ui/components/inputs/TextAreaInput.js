import React from "react";

export default ({
  value,
  disabled,
  placeholder,
  onChangeText,
  initialHeight
}) => {

  const handleChangeInput = event => {
    if (event.target && typeof onChangeText === "function") {
      onChangeText(event.target.value);
    }
  }

  return (
    <textarea 
      value={value}
      disabled={disabled}
      placeholder={placeholder}
      onChange={handleChangeInput}
      className={`${disabled? 'bg-grey-400 text-gray-700' : 'text-blue-700'} rounded-lg p-2 w-full text-xl h-${initialHeight}`}
    />
  )
}