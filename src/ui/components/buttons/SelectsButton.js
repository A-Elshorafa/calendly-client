import React from "react";

export default ({value, onClick, isSelected, isLastElement}) => {
  return (
    <button
      className={
        `rounded-full mt-2 p-2 text-lg border-2 border-solid hover:text-slate-400 font-semibold overflow-hidden ${
          !isLastElement? 'mr-2' : ''
        } ${
          isSelected?  'bg-blue-600 text-white border-blue-600' : 'border-slate-600 text-slate-600'
        }`
      }
      onClick={() => onClick(value)}
    >
      {value}
    </button>
  )
}