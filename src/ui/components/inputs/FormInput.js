import {Input} from ".";
import React from "react";

export default ({
  title,
  inputId,
  htmlFor,
  errorText,
  inputName,
  inputType,
  inputValue,
  onChangeInput,
  inputPlaceholder,
  inputAutoComplete,
  showErrorText = true
}) => {
  return (
    <>
      <label
        htmlFor={htmlFor}
        className="text-black-100 font-m font-bold mb-2"
      >
        {title}
      </label>
      <Input
        id={inputId}
        name={inputName}
        type={inputType} 
        value={inputValue}
        onChangeText={onChangeInput}
        placeholder={inputPlaceholder}
        autoComplete={inputAutoComplete}
        className="block w-full rounded-md border border-gray-300 px-3 py-2 text-gray-900 placeholder-gray-500 focus:border-indigo-500 focus:outline-none focus:ring-indigo-500 sm:text-sm"
      />
      {errorText && showErrorText &&
        <div className="flex m-2 p-2">
            <label className="text-red-400 text-sm">{errorText}</label>
        </div>
      }
    </>
  )
}