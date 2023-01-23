import React from "react";

export default ({
  title,
  value,
  className,
  marginTopValue = 2
}) => {
  return (
    <>
      <label className={`text-lg text-slate-700 font-semibold mt-${marginTopValue} ${className}`}>
        {title}
      </label>
      <label className="font-semibold text-lg text-slate-500 ">
        {value}
      </label>
    </>
  )
}