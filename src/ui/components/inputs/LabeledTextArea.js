import React from "react";
import Input from "./Input";

export default ({
  label,
  value,
  disabled,
  className,
  placeholder,
  onChangeText,
  leftComponent,
  isRequired=false
}) => {
  return (
    <div className={className}>
      <label className="text-lg font-semibold text-slate-800">{label}{isRequired && <span className="text-red-700 ml-1">*</span>}</label>
      <div className={`${disabled? 'bg-grey-400' : 'bg-grey-400'} w-full flex flex-row items-center mt-2 rounded-lg border-2 border-stale-500 border-solid`}>
        {leftComponent && leftComponent()}
        <textarea 
          value={value}
          disabled={disabled}
          placeholder={placeholder}
          onChangeText={onChangeText}
          className={`${disabled? 'bg-grey-400 text-gray-700' : 'text-blue-700'} ${leftComponent? 'ml-2 rounded-l-none' :''} rounded-lg p-2 w-full text-xl`}
        />
      </div>
    </div>
  )
}