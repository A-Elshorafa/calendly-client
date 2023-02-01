import React from "react";

export default ({title, className, textPosition="center"}) => {
  return (
    <label className={`w-full text-3xl font-bold whitespace-nowrap text-ellipsis text-${textPosition} ${className}`}>{title}</label>
  )
}