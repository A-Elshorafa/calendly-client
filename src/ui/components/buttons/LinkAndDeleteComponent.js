import Image from "next/image";
import React, { useState } from "react";

export default ({
  link,
  className,
  onClickLink,
  iconWidth=24,
  iconHeight=24,
  onClickDelete,
}) => {
  const [isClicked, setIsClicked] = useState(false);
  const handleClick = event => {
    event.stopPropagation();
    if (link) {
      setIsClicked(true);
      navigator.clipboard.writeText(link)
      // return again not selected after 1.5sec
      setTimeout(() => { setIsClicked(false) }, 1500)
    } else if (typeof onClick === 'function') {
      onClickLink();
    }
  }
  return (
    <div className={`flex flex-row items-start whitespace-nowrap ${className}`}>
      <Image
        alt=""
        width={iconWidth}
        height={iconHeight}
        onClick={handleClick}
        className="cursor-pointer"
        src={isClicked? "/48X48/circleCheckGreen48.svg" : "/48X48/linkBlue48.svg"}
      />
      <Image
        alt="delete"
        width={iconWidth}
        height={iconHeight}
        onClick={onClickDelete}
        src="/48X48/trashRed48.svg"
        className="ml-4 cursor-pointer"
      />
    </div>
  )
}