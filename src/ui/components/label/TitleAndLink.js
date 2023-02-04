import Link from "next/link";
import React from "react";

export default ({
  title,
  value,
  className,
  classNameTitle,
  classNameValue,
  marginTopValue = 2,
  titleTextSize="lg",
  valueTextSize="lg"
}) => {
  return (
    <div className={`mt-${marginTopValue} ${className}`}>
      <h1 className={`text-${titleTextSize} ${
        classNameTitle
        } text-slate-700 w-full overflow-hidden whitespace-nowrap text-ellipsis font-semibold`}
      >
        {title}
      </h1>
      <Link className={`${
        classNameValue
        } text-${
          valueTextSize
        } font-semibold text-slate-500`}
        href={value}
      >
        {value}
      </Link>
    </div>
  )
}