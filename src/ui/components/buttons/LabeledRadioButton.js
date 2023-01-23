import React from "react";

export default ({isSelected, value}) => {
  return (
    <>
      <div 
        className={`rounded p-2 mr-4 border-solid border-2 border-slate-500 bg-white ${isSelected? 'bg-blue-700' : ''}`}
      ></div>
      <label className="text-lg text-slate-500 border-gray-400 border-solid">{value}</label>
    </>
  )
}