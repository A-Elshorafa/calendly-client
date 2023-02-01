import Image from "next/image";
import React, { useState } from "react";

export default ({
  text,
  link,
  onClick,
  className,
  iconWidth=24,
  iconHeight=24,
  afterCopyText,
  allowClick=false,
  marginTopValue = 2
}) => {
  const [isClicked, setIsClicked] = useState(false);
  const handleClick = event => {
    event.stopPropagation();
    setIsClicked(true);
    if (link) {
      navigator.clipboard.writeText(link)
    } else if (typeof onClick === 'function') {
      onClick();
    }
  }
  return (
    <button
      onBlur={_ => setIsClicked(false)}
      onClick={allowClick? handleClick : null}
      className={`mt-${marginTopValue} ${className
        } ${ isClicked? 'text-green-600 cursor-default': 'text-blue-600'
        } flex flex-row items-start font-semibold text-md whitespace-nowrap`}
      >
      <Image
        alt=""
        className="mr-2"
        width={iconWidth}
        height={iconHeight}
        src={isClicked? "/48X48/circleCheckGreen48.svg" : "/48X48/linkBlue48.svg"}
      />
      {isClicked? afterCopyText : text}
    </button>
  )
}