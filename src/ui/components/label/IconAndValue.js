import Image from "next/image";
import React from "react";

export default ({
  text,
  iconSrc,
  className,
  textClassName="",
  marginTopValue = 2
}) => {
  return (
    <div className={`flex flex-row items-start mt-${marginTopValue} ${className}`}>
      <Image
        alt=""
        width={24}
        height={24}
        src={iconSrc}
      />
      <label className={`ml-2 font-semibold text-md text-slate-500 ${textClassName}`}>{text}</label>
    </div>
  )
}