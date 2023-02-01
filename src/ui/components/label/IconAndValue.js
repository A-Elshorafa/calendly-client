import Image from "next/image";
import React from "react";

export default ({
  text,
  iconSrc,
  onClick,
  title="",
  className,
  imgWidth=24,
  imgHeight=24,
  allowClick=false,
  textClassName="",
  marginTopValue = 2,
  inOneValueLine=true,
  componentBesideTitle
}) => {
  const handleClick = event => {
    event.stopPropagation();
    onClick();
  }
  /**
   * redered fully as
   * Title {Icon}
   * {Icon} textttttt
   * ex
   * Created at  {share-icon} {delete-icon}
   * {date-icon} 22-05-2022
  */
  return (
    <div className={`flex flex-col mt-${marginTopValue}`}>
      {title || componentBesideTitle ?
        <label className="flex flex-row items-center font-semibold text-md text-slate-500">
          {title} 
          <span>{componentBesideTitle}</span>
        </label>
      : null}
      <button onClick={allowClick? handleClick : null} className={`flex flex-row items-start ${title!=="" && "mt-2"} ${allowClick? "cursor-pointer": "cursor-default"} ${className}`}>
        <Image
          alt=""
          src={iconSrc}
          width={imgWidth}
          height={imgHeight}
        />
        <p className={`ml-2 font-semibold text-md text-slate-500 ${textClassName} ${allowClick? "cursor-pointer": "cursor-default"} ${inOneValueLine? 'whitespace-nowrap overflow-hidden text-ellipsis': ''}`}>{text}</p>
      </button>
    </div>
  )
}