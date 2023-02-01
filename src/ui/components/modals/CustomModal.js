import React from "react";
import { RoundedCard } from "../cards";
import { RoundedButton, RoundedFilledButton } from "../buttons";

export default ({
  title,
  cancelText,
  confirmText,
  description,
  withButtons,
  cancelStyle,
  onClickCancel,
  onClickConfirm,
  confirmationStyle
}) => {
  return (
    <RoundedCard className="w-full h-full absolute flex items-center justify-center z-10 bg-gray-500 bg-opacity-30">
      <RoundedCard
        roundedSize="lg"
        paddingValue={8}
        className="w-4/12 flex flex-col items-center bg-white border-2 border-gray-300 border-solid">
        <span 
          className="w-full text-center text-2xl font-semibold text-slate-600 overflow-hidden text-ellipsis whitespace-nowrap"
        >
          {title}
        </span>
        <p className="text-md font-semibold text-gray-500 text-center mt-2">{description}</p>
        {withButtons &&
          <div className="w-full flex flex-row justify-between px-2 mt-8">
            <RoundedFilledButton
              onClick={onClickConfirm}
              className={`flex-1 font-bold p-4 ${confirmationStyle}`}>
              {confirmText}
            </RoundedFilledButton>
            <div className="w-12"></div>
            <RoundedButton
              onClick={onClickCancel}
              className={`flex-1 font-bold p-4  ${cancelStyle}`}>
              {cancelText}
            </RoundedButton>
          </div>
        }
      </RoundedCard>
    </RoundedCard>
  )
}