import React from "react";
import Image from "next/image";

export default ({
  onClick,
  textString,
  isSelectedState
}) => {
  return (
    <button 
      onClick={onClick} 
      className="relative w-full cursor-default rounded-md border border-gray-300 bg-white px-4 py-6 text-left shadow-sm focus:border-indigo-500 focus:outline-none focus:ring-1 focus:ring-indigo-500">
      <div className="flex flex-row items-center justify-between w-full absolute inset-y-0 left-0 px-2 overflow-hidden text-ellipsis">
        <label className="text-lg aria-checked:font-bold aria-checked:text-blue-600 whitespace-nowrap text-ellipsis" aria-checked={textString !== ""}>{textString}</label>
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
  )
}