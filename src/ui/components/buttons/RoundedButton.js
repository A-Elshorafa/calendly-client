import React from "react";

export default ({onClick, className, children}) => {
  return (
    <button 
      className={"border border-spacing-0 rounded-full " + className}
      onClick={onClick}
    >
      {children}
    </button>
  )
}