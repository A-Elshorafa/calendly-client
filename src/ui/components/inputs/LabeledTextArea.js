import React from "react";
import TextAreaInput from "./TextAreaInput";

export default ({
  label,
  value,
  disabled,
  className,
  placeholder,
  onChangeText,
  leftComponent,
  initialHeight=14,
  isRequired=false
}) => {
  return (
    <div className={className}>
      <label className="text-lg font-semibold text-slate-800">{label}{isRequired && <span className="text-red-700 ml-1">*</span>}</label>
      <div className={`${disabled? 'bg-grey-400' : 'bg-grey-400'} w-full flex flex-row items-center mt-2 rounded-lg border-2 border-stale-500 border-solid`}>
        {leftComponent && leftComponent()}
        <TextAreaInput
          value={value}
          disabled={disabled}
          placeholder={placeholder}
          onChangeText={onChangeText}
          initialHeight={initialHeight}
        />
      </div>
    </div>
  )
}