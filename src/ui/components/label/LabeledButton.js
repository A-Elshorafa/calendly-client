import React from "react";

export default ({
  title,
  onClick,
  className,
  buttonText,
  titleClassName,
  buttonClassName,
}) => {
  return (
    <div className={`flex flex-col items-center mt-8 ${className}`}>
      <label
        className={`text-lg text-gray-700 font-semibold mr-2 whitespace-nowrap ${titleClassName}`}
      >
        {title}
      </label>
      <button
        onClick={onClick}
        className={`text-lg text-gray-500 whitespace-nowrap ${buttonClassName}`}
      >
        {buttonText}
      </button>
    </div>
  )
}