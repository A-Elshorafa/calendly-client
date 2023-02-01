import React from "react";
import TextAreaInput from "./TextAreaInput";

export default ({
  label,
  value,
  disabled,
  className,
  subTitle="",
  placeholder,
  onChangeText,
  leftComponent,
  initialHeight=14,
  isRequired=false,
  titleTextSize="lg"
}) => {
  return (
    <div className={className}>
      <h1
        className={`text-${titleTextSize} font-semibold whitespace-nowrap text-ellipsis text-slate-800`}
      >
        {label}{
          isRequired && <span className="text-red-700 ml-1">*</span>
        }
      </h1>
      {subTitle !== "" &&
        <span className="text-sm text-gray-400 whitespace-nowrap text-ellipsis">
          {subTitle}
        </span>
      }
      <div
        className={`${
          disabled? 'bg-grey-400' : 'bg-grey-400'
        } w-full flex flex-row items-center mt-2 rounded-lg border-2 border-stale-500 border-solid`}
      >
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