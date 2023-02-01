import React from "react";

export default ({value, onClick, allowClick, isSelected}) => {
  return (
    <button
      className={
        `rounded-full mt-2 p-2 text-lg border-2 border-solid font-semibold overflow-hidden ${
          allowClick? 'cursor-pointer hover:text-slate-400' : 'cursor-default'
        } ${
          isSelected?  'bg-blue-600 text-white border-blue-600' : 'border-slate-600 text-slate-600'
        }`
      }
      onClick={() => allowClick? onClick(value) : null}
    >
      {value}
    </button>
  )
}