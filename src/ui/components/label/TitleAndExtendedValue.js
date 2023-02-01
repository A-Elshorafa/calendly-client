import React from "react";

export default ({
  title,
  value,
  classNameTitle,
  classNameValue,
  marginTopValue = 2,
  titleTextSize="lg",
  valueTextSize="lg"
}) => {
  return (
    <>
      <h1 className={`text-${titleTextSize} mt-${marginTopValue} ${
        classNameTitle
        } text-slate-700 whitespace-nowrap text-ellipsis overflow-hidden font-semibold`}
      >
        {title}
      </h1>
      <p className={`${
        classNameValue
        } text-${
          valueTextSize
        } font-semibold text-slate-500 w-full overflow-y-auto overflow-x-hidden text-ellipsis`}
      >
        {value}
      </p>
    </>
  )
}